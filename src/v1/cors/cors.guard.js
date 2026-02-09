import { PRODUCTION } from "../../../config/nodeEnvironments";
import cors from "cors";
import { StatusCodes } from "http-status-codes";

const allowedOrigins = ["http://localhost:3000"];

const getOrigin = req => {
	const url = req.originalUrl;

	if (url && url.startsWith("/v1/forms")) {
		return true;
	}

	if (process.env.NODE_ENV === PRODUCTION) {
		return ["*"];
	}

	return allowedOrigins;
};

export default cors(function (req, callback) {
	const options = {
		origin: getOrigin(req),
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
		allowedHeaders: [
			"Accept",
			"Authorization",
			"Content-Type",
			"Origin",
			"X-Requested-With",
			"X-FP",
			"X-Csrf-Token"
		],
		optionsSuccessStatus: StatusCodes.OK,
		credentials: true
	};

	return callback(null, options);
});
