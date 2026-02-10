export default req => {
	return (
		req.headers?.authorization ||
		req.body?.authorization ||
		req.query?.authorization
	);
};
