import { BaseConsumer } from "./BaseConsumer.js";
import { QUEUES, RESERVATION_JOBS } from "../jobs.const.js";
import { handleRevertReserveStock } from "../workers/revertReserveStock.js";

export class ReservationConsumer extends BaseConsumer {
	constructor() {
		super({
			queueName: QUEUES.BACKGROUND_JOBS,
			concurrency: 1,
			handlers: {
				[RESERVATION_JOBS.REVERT_RESERVATION]: handleRevertReserveStock
			}
		});
	}
}
