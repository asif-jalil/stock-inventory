import asyncHandler from "express-async-handler";
import models from "../../models";
import { StatusCodes } from "http-status-codes";
import publisher from "../../redis/publisher";
import * as event from "../../socket/event";

export default asyncHandler(async (req, res) => {
	const { name, unitPrice, offeringStock } = req.body;

	const drop = await models.drop.create({
		name,
		unitPrice,
		offeringStock,
		currentStock: offeringStock
	});

	publisher.notifyGlobal(event.NEW_DROP, `New drop added: ${name}`);

	res
		.status(StatusCodes.CREATED)
		.json({ message: "Drop created successfully", drop });
});
