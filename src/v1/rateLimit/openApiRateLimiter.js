import { RateLimiterMemory, RateLimiterUnion } from "rate-limiter-flexible";
import * as rateLimiters from "./rateLimiter.util";

const perSecond = new RateLimiterMemory({
	keyPrefix: "perSecond",
	points: 3,
	duration: 1,
	blockDuration: 3600
});

const perMinute = new RateLimiterMemory({
	keyPrefix: "perMinute",
	points: 10,
	duration: 60,
	blockDuration: 3600
});

const rateLimiterUnion = new RateLimiterUnion(perSecond, perMinute);

const byIpAddress = rateLimiters.byIpAddress(rateLimiterUnion);

export { byIpAddress };
