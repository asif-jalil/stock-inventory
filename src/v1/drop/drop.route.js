import { Router } from "express";
import drops from "./drops";
import merchDrop from "./merchDrop";
import { isValidated } from "../req/validator.util";
import merchDropRules from "./merchDrop.rules";
import dropsRules from "./drops.rules";

const dropRoutes = Router({ mergeParams: true });

// Get drops
dropRoutes.get("/", isValidated(dropsRules), drops);

// Create new merch drop
dropRoutes.post("/", isValidated(merchDropRules), merchDrop);

export default dropRoutes;
