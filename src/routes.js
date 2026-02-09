import dropRoutes from "./v1/drop/drop.route";

export default app => {
	app.use("/v1/drops", dropRoutes);
};
