import { StatusCodes } from "http-status-codes";

export default (req, res) => {
	res
		.status(StatusCodes.NOT_FOUND)
		.json({ message: "API endpoint does not exist" });
};
