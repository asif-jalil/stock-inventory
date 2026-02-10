import jwt from "jsonwebtoken";

export default token => {
	try {
		// @ts-ignore
		return jwt.verify(token, process.env.JWT_SECRET);
	} catch (err) {
		return null;
	}
};
