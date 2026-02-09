import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import mapRoutes from "./routes";
import cors from "./v1/cors/cors.guard";
import exception from "./v1/error/exception";
import notFound from "./v1/error/notFound";

const app = express();

app.set("trust proxy", true);
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(
	helmet.contentSecurityPolicy({
		useDefaults: false,
		directives: {
			"default-src": ["'none'"],
			"frame-ancestors": ["'none'"]
		}
	})
);
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
app.use(helmet.xssFilter());
app.use((req, res, next) => {
	res.setHeader("Permissions-Policy", "interest-cohort=()");
	next();
});
app.use(cors);
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));

mapRoutes(app);

app.use(notFound);
app.use(exception);

export default app;
