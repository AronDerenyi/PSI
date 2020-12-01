module.exports = () => (req, res, next) => {
	const session = req.session
	session.stateId = null
	session.results = null

	next()
};
