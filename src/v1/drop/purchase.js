import asyncHandler from "express-async-handler";
import models from "../../models";
import { StatusCodes } from "http-status-codes";
import publisher from "../../redis/publisher";
import * as event from "../../socket/event";
import moment from "moment";

export default asyncHandler(async (req, res) => {
	const { dropId } = req.params;
	const userId = req.user.id;

	const t = await models.sequelize.transaction();

	try {
		let drop = await models.drop.findByPk(dropId, {
			transaction: t,
			lock: t.LOCK.UPDATE
		});

		if (!drop) {
			await t.rollback();
			res.status(StatusCodes.NOT_FOUND).json({ message: "Drop not found" });
			return;
		}

		const reservation = await models.reservation.findOne({
			where: {
				dropId,
				userId
			},
			transaction: t,
			lock: t.LOCK.UPDATE
		});

		if (!reservation) {
			await t.rollback();
			res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: "No reservation found" });
			return;
		}

		if (drop.currentStock < 1) {
			await t.rollback();
			res.status(StatusCodes.CONFLICT).json({ message: "Out of stock" });
			return;
		}

		if (reservation.expiresAt < moment()) {
			await t.rollback();
			res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: "Reservation has expired" });
			return;
		}

		const purchase = await models.purchase.create(
			{
				dropId: drop.id,
				userId
			},
			{ transaction: t }
		);

		await drop.update(
			{
				currentStock: drop.currentStock - 1,
				reservedStock: drop.reservedStock - 1
			},
			{ transaction: t }
		);
		await reservation.destroy({ transaction: t });

		await t.commit();

		drop = await drop.reload();

		await publisher.notifyGlobal(event.STOCK_UPDATED, {
			dropId: drop.id,
			availableStock: drop.availableStock,
			reservedStock: drop.reservedStock
		});

		res.status(StatusCodes.CREATED).json(purchase);
	} catch (error) {
		await t.rollback();

		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error: "Something went wrong" });
	}
});
