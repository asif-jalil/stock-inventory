import { Router } from "express";
import drops from "./drops";

const dropRoutes = Router({ mergeParams: true });

// Get available plans
dropRoutes.get("/", drops);

export default dropRoutes;
