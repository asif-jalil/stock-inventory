import { getPublisherChannel, queue } from "./backgroundJob.queue";

export default async (action, payload) => {
	const channel = await getPublisherChannel();
	await channel.assertQueue(queue, { durable: true });
	return channel.sendToQueue(
		queue,
		Buffer.from(JSON.stringify({ action, payload })),
		{ persistent: true }
	);
};
