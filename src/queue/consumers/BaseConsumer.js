import { Worker } from "bullmq";
import { connection } from "../connection.js";

export class BaseConsumer {
	/**
	 * @param {object} params
	 * @param {string} params.queueName
	 * @param {object} params.handlers - { [jobName]: async (job) => any }
	 * @param {number} [params.concurrency=5]
	 */
	constructor({ queueName, handlers, concurrency = 5 }) {
		this.queueName = queueName;
		this.handlers = handlers;
		this.concurrency = concurrency;
		this.worker = null;
	}

	start() {
		if (this.worker) return this.worker;

		this.worker = new Worker(
			this.queueName,
			async job => {
				const handler = this.handlers[job.name];
				if (!handler)
					throw new Error(
						`No handler for job "${job.name}" in "${this.queueName}"`
					);
				return handler(job);
			},
			{ connection, concurrency: this.concurrency }
		);

		this.worker.on("completed", job =>
			console.log(`✅ ${this.queueName}:${job.name} ${job.id}`)
		);
		this.worker.on("failed", (job, err) =>
			console.log(
				`❌ ${this.queueName}:${job?.name} ${job?.id} - ${err.message}`
			)
		);

		return this.worker;
	}

	async stop() {
		if (!this.worker) return;
		await this.worker.close();
		this.worker = null;
	}
}
