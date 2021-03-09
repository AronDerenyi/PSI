module.exports = (test) => (req, res, next) => {
	const session = req.session
	const state = test.states[session.stateId]

	if (state.isEnding()) {
		req.session.regenerate(function (err) {
			next(err)
		})
	} else {
		session.stateId = state.next(session.results)
		next()
	}
};
