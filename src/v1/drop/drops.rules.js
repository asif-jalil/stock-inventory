import { query } from "express-validator";

export default [
	query("after")
		.optional({ values: "falsy" })
		.isInt({ min: 0 })
		.withMessage("after must be an integer >= 0")
		.toInt(),

	query("limit")
		.optional({ values: "falsy" })
		.isInt({ min: 1, max: 100 })
		.withMessage("limit must be between 1 and 100")
		.toInt()
];
