import { Router } from "express";
import isAuthenticatedGuard from "../auth/isAuthenticated.guard";
import reservation from "./reservation";
import cancel from "./cancel";

const reservationRoutes = Router({ mergeParams: true });

// Get drops
reservationRoutes.get("/me", isAuthenticatedGuard, reservation);

// Cancel reservation
reservationRoutes.delete("/me", isAuthenticatedGuard, cancel);

export default reservationRoutes;
