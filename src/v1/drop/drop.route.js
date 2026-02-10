import { Router } from "express";
import drops from "./drops";
import merchDrop from "./merchDrop";
import { isValidated } from "../req/validator.util";
import merchDropRules from "./merchDrop.rules";
import dropsRules from "./drops.rules";
import reserve from "./reserve";
import isAuthenticatedGuard from "../auth/isAuthenticated.guard";
import purchase from "./purchase";
import * as rateLimiters from "../rateLimit/openApiRateLimiter";

const dropRoutes = Router({ mergeParams: true });

// Get drops
dropRoutes.get("/", isValidated(dropsRules), drops);

// Create new merch drop
dropRoutes.post(
	"/",
	rateLimiters.byIpAddress,
	isValidated(merchDropRules),
	merchDrop
);

// Reserve merch drop
dropRoutes.post("/:dropId/reserve", isAuthenticatedGuard, reserve);

// Purchase
dropRoutes.post("/:dropId/purchase", isAuthenticatedGuard, purchase);

export default dropRoutes;
