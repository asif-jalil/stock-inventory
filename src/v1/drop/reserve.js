import asyncHandler from "express-async-handler";
import models from "../../models";
import { StatusCodes } from "http-status-codes";
import publisher from "../../redis/publisher";
import * as event from "../../socket/event";
import moment from "moment";
import { publishRevertReservation } from "../../queue/publishers/revertReservation.publisher";

export default asyncHandler(async (req, res) => {
	const { dropId } = req.params;
	const userId = req.user.id;

	const existingReservation = await models.reservation.findOne({
		where: { userId }
	});

	if (existingReservation) {
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "User already has a reservation" });
		return;
	}

	const t = await models.sequelize.transaction();

	try {
		const drop = await models.drop.findByPk(dropId, {
			transaction: t,
			lock: t.LOCK.UPDATE
		});

		if (!drop) {
			await t.rollback();
			res.status(StatusCodes.NOT_FOUND).json({ message: "Drop not found" });
			return;
		}

		const available = drop.currentStock - drop.reservedStock;
		if (available < 1) {
			await t.rollback();
			res.status(StatusCodes.BAD_REQUEST).json({ message: "Out of stock" });
			return;
		}

		const reservation = await models.reservation.create(
			{ dropId: drop.id, userId, expiresAt: moment().add(60, "seconds") },
			{ transaction: t }
		);

		await drop.increment("reservedStock", { by: 1, transaction: t });

		await t.commit();

		await publisher.notifyGlobal(event.STOCK_UPDATED, {
			dropId: drop.id,
			availableStock: drop.availableStock,
			reservedStock: drop.reservedStock
		});

		await publishRevertReservation({
			reservationId: reservation.id,
			dropId: drop.id
		});

		res.status(StatusCodes.ACCEPTED).json({
			reservation,
			drop: {
				id: drop.id,
				name: drop.name,
				unitPrice: drop.unitPrice
			}
		});
		return;
	} catch (error) {
		await t.rollback();
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: "Some error occurred while reserving the drop" });
		return;
	}
});
