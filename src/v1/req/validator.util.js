import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

const toNull = value => {
	return value ? value : null;
};

const isValidated = rules => {
	return [
		rules,
		async (req, res, next) => {
			const errors = validationResult(req).formatWith(error => error.msg);

			if (!errors.isEmpty()) {
				return res
					.status(StatusCodes.UNPROCESSABLE_ENTITY)
					.json(errors.mapped());
			}
			next();
		}
	];
};

export { toNull, isValidated };
