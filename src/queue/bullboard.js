import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";

import { getQueue } from "./queues";
import { QUEUES } from "./jobs.const";

export function buildBullBoard() {
	const serverAdapter = new ExpressAdapter();
	serverAdapter.setBasePath("/admin/queues");

	const queues = [new BullMQAdapter(getQueue(QUEUES.BACKGROUND_JOBS))];

	createBullBoard({
		queues,
		serverAdapter
	});

	return serverAdapter;
}
