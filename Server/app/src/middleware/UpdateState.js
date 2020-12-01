module.exports = (test) => (req, res, next) => {
	const session = req.session
	const stateId = session.stateId
	const results = session.results

	session.stateId = test.states[stateId].next(results)

	next()
};
