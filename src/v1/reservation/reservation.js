import asyncHandler from "express-async-handler";
import models from "../../models";
import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";

export default asyncHandler(async (req, res) => {
	const userId = req.user.id;

	const reservation = await models.reservation.findOne({
		attributes: ["id", "dropId", "userId", "expiresAt"],
		where: { userId, expiresAt: { [Op.gt]: new Date() } },
		include: [
			{
				model: models.drop,
				as: "drop",
				attributes: ["id", "name", "unitPrice"]
			}
		]
	});

	res.status(StatusCodes.OK).json({ reservation });
});
