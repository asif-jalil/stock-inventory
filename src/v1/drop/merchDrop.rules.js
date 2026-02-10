import { body } from "express-validator";

export default [
	body("name").trim().not().isEmpty().withMessage("Name is required"),
	body("unitPrice")
		.not()
		.isEmpty()
		.withMessage("Unit price is required")
		.bail()
		.isNumeric()
		.withMessage("Unit price must be a number"),
	body("totalStock")
		.not()
		.isEmpty()
		.withMessage("Total stock is required")
		.bail()
		.isNumeric()
		.withMessage("Total stock must be a number")
		.isInt({ min: 1 })
		.withMessage("Total stock must be equal or greater than 1"),
	body("dropStartAt")
		.optional({ values: "falsy" })
		.isISO8601()
		.withMessage("Drop start time must be a valid date")
		.toDate()
];
