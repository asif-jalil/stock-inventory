import { StatusCodes } from "http-status-codes";
import { PRODUCTION } from "../../../config/nodeEnvironments";
import AppError from "./App.error";

export default (err, req, res, next) => {
	let { status, code, message } = err;

	res.status(status || StatusCodes.INTERNAL_SERVER_ERROR);

	// development/test
	if (process.env.NODE_ENV !== PRODUCTION) {
		return res.json({ code, message });
	}

	// Production
	if (err instanceof AppError) {
		return res.json({ code, message });
	}

	return res.json({ message: "Something went wrong" });
};
