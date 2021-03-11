module.exports = (test) => (req, res) => {
	const stateId = req.session.stateId
	const results = req.session.results
	const state = test.states[stateId]

	res.json({
		stateId: stateId,
		screenType: state.getScreenType(),
		screenParameters: state.getScreenParameters(results)
	}).end();
};
