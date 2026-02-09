import * as actions from "./backgroundJob.const";
import { getConsumerChannel, queue } from "./backgroundJob.queue";
import reserve from "./reserve";

const consume = channel => async rawPayload => {
	try {
		const { action, payload } = JSON.parse(rawPayload.content.toString());
		switch (action) {
			case actions.RESERVE:
				return await reserve(payload);
			default:
				console.log("Invalid background job", { action, payload });
		}
	} catch (e) {
		console.log("Error in background job:", e);
	} finally {
		channel.ack(rawPayload);
	}
};

export default async () => {
	const channel = await getConsumerChannel();
	await channel.assertQueue(queue, { durable: true });
	await channel.prefetch(1);
	await channel.consume(queue, consume(channel), { noAck: false });
};
