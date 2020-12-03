module.exports = () => (req, res, next) => {
	const session = req.session
	session.results[session.stateId] = req.body.result
	next()
};
