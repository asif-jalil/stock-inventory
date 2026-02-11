import models from "../../models";
import UnauthenticatedError from "../error/Unauthenticated.error";
import getReqAuthToken from "./token/getReqAuthToken.util";
import verifyAuthToken from "./token/verifyAuthToken.util";

/**
 * This is a demo authentication. No real auth happened here
 */
export default async (req, res, next) => {
	const authToken = getReqAuthToken(req);
	let userId = 1;

	if (authToken) {
		const tokenPayload = verifyAuthToken(authToken);

		if (tokenPayload) {
			// @ts-ignore
			userId = tokenPayload.id;
		}
	}

	const user = await models.user.findOne({
		attributes: ["id", "username"],
		where: {
			id: userId
		}
	});

	if (!user) {
		return next(new UnauthenticatedError("You are not authenticated"));
	}

	req.user = user;
	next();
};
