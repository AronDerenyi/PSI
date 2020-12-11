module.exports = (test) => (req, res, next) => {
	const session = req.session
	const state = test.states[session.stateId]

	// TODO: Save results
	console.log(session.id)
	console.log(session.results)

	if (state.ending) {
		req.session.regenerate(function(err) {
			next(err)
		})
	} else {
		session.stateId = state.next(session.results)
		next()
	}
};
