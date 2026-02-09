const { StatusCodes } = require("http-status-codes");
const AppError = require("./App.error");

class InvalidRequestError extends AppError {
	status = StatusCodes.BAD_REQUEST;
	code = "InvalidRequest";
}

module.exports = InvalidRequestError;
