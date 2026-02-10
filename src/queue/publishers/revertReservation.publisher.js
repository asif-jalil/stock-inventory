import { RESERVATION_JOBS, QUEUES } from "../jobs.const.js";
import { getQueue } from "../queues.js";

const backgroundQueue = getQueue(QUEUES.BACKGROUND_JOBS);

export function publishRevertReservation(data, opts = {}) {
	return backgroundQueue.add(RESERVATION_JOBS.REVERT_RESERVATION, data, {
		attempts: 5,
		backoff: { type: "exponential", delay: 1000 },
		removeOnComplete: true,
		removeOnFail: 1000,
		delay: 60_000,
		...opts
	});
}
