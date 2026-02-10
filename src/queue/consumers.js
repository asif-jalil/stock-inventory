import { ReservationConsumer } from "./consumers/Reservation.consumer";

const consumers = [new ReservationConsumer()];

consumers.forEach(c => c.start());

const shutdown = async () => {
	await Promise.all(consumers.map(c => c.stop()));
	process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

console.log("Workers running...");
