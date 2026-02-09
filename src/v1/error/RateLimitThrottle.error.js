const { StatusCodes } = require("http-status-codes");
const AppError = require("./App.error");

class RateLimitThrottleError extends AppError {
	status = StatusCodes.TOO_MANY_REQUESTS;
	code = "RateLimitThrottled";
}

module.exports = RateLimitThrottleError;
