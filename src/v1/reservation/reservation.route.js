import { Router } from "express";
import isAuthenticatedGuard from "../auth/isAuthenticated.guard";
import reservation from "./reservation";

const userRoutes = Router({ mergeParams: true });

// Get drops
userRoutes.get("/me", isAuthenticatedGuard, reservation);

export default userRoutes;
