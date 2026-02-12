const { StatusCodes } = require("http-status-codes");
const AppError = require("./App.error");

class UnauthorizedError extends AppError {
	status = StatusCodes.FORBIDDEN;
	code = "Unauthorized";
}

module.exports = UnauthorizedError;
