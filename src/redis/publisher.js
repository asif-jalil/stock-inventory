import IORedis from "ioredis";
import { GLOBAL, USER } from "./channel";

// @ts-ignore
const publisher = new IORedis(process.env.REDIS_URL, {
	maxRetriesPerRequest: null
});

const notifyGlobal = (event, message) => {
	return publisher.publish(GLOBAL, JSON.stringify({ event, message }));
};

const notifyUser = (event, message) => {
	return publisher.publish(USER, JSON.stringify({ event, message }));
};

export default {
	notifyGlobal,
	notifyUser
};
