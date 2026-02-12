import asyncHandler from "express-async-handler";
import models from "../../models";
import { Op } from "sequelize";

export default asyncHandler(async (req, res) => {
	const after = req.query.after ?? 0;
	const limit = req.query.limit ?? 10;

	const drops = await models.drop.paginate({
		attributes: [
			"id",
			"name",
			"unitPrice",
			"currentStock",
			"availableStock",
			"reservedStock"
		],
		where: { id: { [Op.gt]: after } },
		limit,
		include: [
			{
				model: models.purchase,
				as: "purchases",
				attributes: ["id", "userId", "createdAt"],
				limit: 3,
				order: [["createdAt", "DESC"]],
				include: [
					{
						model: models.user,
						as: "user",
						attributes: ["id", "name", "username"]
					}
				]
			}
		]
	});

	res.json(drops);
});
