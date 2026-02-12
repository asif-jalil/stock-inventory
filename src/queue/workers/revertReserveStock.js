import moment from "moment";
import models from "../../models";
import publisher from "../../redis/publisher";
import * as event from "../../socket/event";

export async function handleRevertReserveStock(job) {
	const { reservationId, dropId } = job.data;

	const t = await models.sequelize.transaction();

	try {
		const reservation = await models.reservation.findByPk(reservationId, {
			transaction: t
		});

		if (!reservation) {
			return false;
		}

		if (reservation.expiresAt > moment()) {
			console.warn(`Reservation with ID ${reservationId} has not expired yet`);
			return false;
		}

		let drop = await models.drop.findByPk(dropId, {
			transaction: t,
			lock: t.LOCK.UPDATE
		});

		if (!drop) {
			console.warn(`Drop not found`);
			return false;
		}

		await reservation.destroy({ transaction: t });
		await drop.decrement("reservedStock", { by: 1, transaction: t });

		await t.commit();

		drop = await drop.reload();

		await publisher.notifyGlobal(event.STOCK_UPDATED, {
			dropId: drop.id,
			availableStock: drop.availableStock,
			reservedStock: drop.reservedStock
		});

		return true;
	} catch (error) {
		await t.rollback();
		console.error(
			`Error fetching reservation with ID ${reservationId}:`,
			error
		);
		return false;
	}
}
