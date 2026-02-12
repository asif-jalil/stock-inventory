import cookieParser from "cookie-parser";
import express from "express";
import expressBasicAuth from "express-basic-auth";
import helmet from "helmet";

import mapRoutes from "./routes";
import cors from "./v1/cors/cors.guard";
import exception from "./v1/error/exception";
import notFound from "./v1/error/notFound";
import { buildBullBoard } from "./queue/bullboard";

const app = express();

/* -------------------------------------------------------------------------- */
/* Core                                                                      */
/* -------------------------------------------------------------------------- */
app.set("trust proxy", true);
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

/* -------------------------------------------------------------------------- */
/* Bull Board                                                      */
/* -------------------------------------------------------------------------- */
app.use(
	"/admin/queues",
	expressBasicAuth({
		users: { admin: process.env.BULLBOARD_PASSWORD || "admin" },
		challenge: true
	})
);

const bullBoard = buildBullBoard();
app.use("/admin/queues", bullBoard.getRouter());

/* -------------------------------------------------------------------------- */
/* Security headers (Helmet)                                                 */
/* -------------------------------------------------------------------------- */
const cspStrict = helmet.contentSecurityPolicy({
	useDefaults: false,
	directives: {
		"default-src": ["'none'"],
		"frame-ancestors": ["'none'"]
	}
});

// Apply CSP everywhere except Bull Board (dev-only)
app.use((req, res, next) => {
	if (req.path.startsWith("/admin/queues")) return next();
	return cspStrict(req, res, next);
});

app.use(
	helmet.hsts({
		maxAge: 63072000,
		includeSubDomains: true,
		preload: true
	})
);

app.use(helmet.frameguard({ action: "deny" }));
app.use(helmet.hidePoweredBy());
app.use(helmet.noSniff());
app.use(helmet.referrerPolicy({ policy: "strict-origin-when-cross-origin" }));
app.use(helmet.permittedCrossDomainPolicies());
// helmet.xssFilter() is legacy, but keeping it since you already had it
app.use(helmet.xssFilter());

app.use((req, res, next) => {
	res.setHeader("Permissions-Policy", "interest-cohort=()");
	next();
});

/* -------------------------------------------------------------------------- */
/* App middleware                                                            */
/* -------------------------------------------------------------------------- */
app.use(cors);
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));

/* -------------------------------------------------------------------------- */
/* Routes + errors                                                           */
/* -------------------------------------------------------------------------- */
mapRoutes(app);

app.use(notFound);
app.use(exception);

export default app;
