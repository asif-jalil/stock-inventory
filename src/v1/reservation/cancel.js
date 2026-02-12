import asyncHandler from "express-async-handler";
import models from "../../models";
import { StatusCodes } from "http-status-codes";
import publisher from "../../redis/publisher";
import * as event from "../../socket/event";

export default asyncHandler(async (req, res) => {
	const userId = req.user.id;

	const t = await models.sequelize.transaction();

	try {
		const reservation = await models.reservation.findOne({
			where: { userId },
			transaction: t,
			lock: t.LOCK.UPDATE
		});

		if (!reservation) {
			await t.rollback();
			res
				.status(StatusCodes.NOT_FOUND)
				.json({ message: "No active reservation found" });
			return;
		}

		const drop = await models.drop.findByPk(reservation.dropId, {
			transaction: t,
			lock: t.LOCK.UPDATE
		});

		if (!drop) {
			await t.rollback();
			res.status(StatusCodes.NOT_FOUND).json({ message: "Drop not found" });
			return;
		}

		if (drop.reservedStock > 0) {
			await drop.decrement("reservedStock", { by: 1, transaction: t });
		}

		await reservation.destroy({ transaction: t });

		await t.commit();
		await drop.reload();

		await publisher.notifyGlobal(event.STOCK_UPDATED, {
			dropId: drop.id,
			availableStock: drop.availableStock,
			reservedStock: drop.reservedStock
		});

		res.status(StatusCodes.OK).json({ message: "Reservation cancelled" });
	} catch (error) {
		await t.rollback();
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: "Some error occurred while cancelling the reservation"
		});
	}
});
