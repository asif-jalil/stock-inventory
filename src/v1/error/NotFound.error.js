const { StatusCodes } = require("http-status-codes");
const AppError = require("./App.error");

class NotFoundError extends AppError {
	status = StatusCodes.NOT_FOUND;
	code = "NotFound";
}

module.exports = NotFoundError;
