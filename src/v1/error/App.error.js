const { StatusCodes } = require("http-status-codes");

class AppError extends Error {
	constructor(message) {
		super(message);
		this.name = this.constructor.name;
		this.status = StatusCodes.INTERNAL_SERVER_ERROR;
		this.code = "InternalServerError";
	}
}

module.exports = AppError;
