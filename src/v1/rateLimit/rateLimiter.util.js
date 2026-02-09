import moment from "moment";
import { isIP } from "validator";
import InvalidRequestError from "../error/InvalidRequest.error";
import RateLimitThrottleError from "../error/RateLimitThrottle.error";
import getReqIpAddress from "../req/getReqIpAddress.util";

const byIpAddress = rateLimiter => async (req, res, next) => {
	const ipAddress = getReqIpAddress(req);

	if (!ipAddress) {
		console.error("Rate limiter: IP address not found");
		return next(new InvalidRequestError("Invalid request"));
	}

	if (!isIP(ipAddress)) {
		console.error("Rate limiter: IP address is invalid", ipAddress);
		return next(new InvalidRequestError("Invalid request"));
	}

	try {
		await rateLimiter.consume(ipAddress);
		next();
	} catch (response) {
		const { msBeforeNext } = response.perMinute || response.perSecond;
		const unlockIn = moment.duration(msBeforeNext, "milliseconds").humanize();

		next(
			new RateLimitThrottleError(
				`Too many request, please try after ${unlockIn}`
			)
		);
	}
};

export { byIpAddress };
