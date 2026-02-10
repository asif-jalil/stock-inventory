const { StatusCodes } = require("http-status-codes");
const AppError = require("./App.error");

class UnauthenticatedError extends AppError {
	status = StatusCodes.UNAUTHORIZED;
	code = "Unauthenticated";
}

module.exports = UnauthenticatedError;
