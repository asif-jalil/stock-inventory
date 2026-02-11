import dropRoutes from "./v1/drop/drop.route";
import reservationRoutes from "./v1/reservation/reservation.route";

export default app => {
	app.use("/v1/drops", dropRoutes);
	app.use("/v1/reservations", reservationRoutes);
};
