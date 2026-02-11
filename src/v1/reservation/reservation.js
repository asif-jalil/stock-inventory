import asyncHandler from "express-async-handler";
import models from "../../models";
import { StatusCodes } from "http-status-codes";

export default asyncHandler(async (req, res) => {
	const userId = req.user.id;

	const reservation = models.reservation.findOne({
		attributes: ["id", "dropId", "userId", "expiresAt"],
		where: { userId },
		include: [
			{
				model: models.drop,
				as: "drop",
				attributes: ["id", "name"]
			}
		]
	});

	res.status(StatusCodes.OK).json({ reservation });
});
