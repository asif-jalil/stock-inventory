import asyncHandler from "express-async-handler";
import models from "../../models";
import { StatusCodes } from "http-status-codes";

export default asyncHandler(async (req, res) => {
	const { name, unitPrice, totalStock, dropStartAt } = req.body;

	const drop = await models.drop.create({
		name,
		unitPrice,
		totalStock,
		availableStock: totalStock,
		dropStartAt: dropStartAt || new Date()
	});

	res
		.status(StatusCodes.CREATED)
		.json({ message: "Drop created successfully", drop });
});
