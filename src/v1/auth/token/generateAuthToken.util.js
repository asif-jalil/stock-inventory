import jwt from "jsonwebtoken";
import moment from "moment";

export default user => {
	const payload = {
		id: user.id,
		email: user.email,
		passwordUpdatedAt: user.passwordUpdatedAt
			? moment(user.passwordUpdatedAt).unix() * 1000
			: null
	};

	// @ts-ignore
	const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: "7d"
	});

	return jwtToken;
};
