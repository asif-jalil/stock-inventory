import asyncHandler from "express-async-handler";
import models from "../../models";
import { Op } from "sequelize";

export default asyncHandler(async (req, res) => {
	const after = req.query.after ?? 0;
	const limit = req.query.limit ?? 10;

	const drops = await models.drop.paginate({
		attributes: ["id", "name", "unitPrice", "availableStock", "reservedStock"],
		where: { id: { [Op.gt]: after } },
		limit
	});

	res.json({ drops });
});
