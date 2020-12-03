module.exports = (test) => (req, res, next) => {
	const session = req.session
	const state = test.states[session.stateId]

	if (state.ending) {
		console.log(session.results)
		// TODO: Save results
		session.stateId = null
		session.results = null
	} else {
		session.stateId = state.next(session.results)
	}

	next()
};
