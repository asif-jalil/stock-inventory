import { Queue } from "bullmq";
import { connection } from "./connection.js";

const queueCache = new Map();

export function getQueue(name) {
	if (!queueCache.has(name)) {
		queueCache.set(name, new Queue(name, { connection }));
	}
	return queueCache.get(name);
}
