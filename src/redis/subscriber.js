import IORedis from "ioredis";
import { GLOBAL } from "./channel";

// @ts-ignore
const subscriber = new IORedis(process.env.REDIS_URL, {
	maxRetriesPerRequest: null
});

subscriber.subscribe(GLOBAL, err => {
	if (err) {
		console.error("redis subscriber could not connect", err.message);
	}
});

export default subscriber;
