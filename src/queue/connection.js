import IORedis from "ioredis";

// @ts-ignore
export const connection = new IORedis(process.env.REDIS_URL, {
	maxRetriesPerRequest: null
});
