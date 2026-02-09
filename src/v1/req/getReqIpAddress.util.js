export default req => {
	return (
		req.headers["cf-connecting-ip"] ||
		req.headers["x-forwarded-for"] ||
		req.connection.remoteAddress ||
		""
	)
		.split(",")[0]
		.trim();
};
