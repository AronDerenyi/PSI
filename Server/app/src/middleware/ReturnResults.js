module.exports = (test) => (req, res) => {
	const stateId = req.session.stateId
	const state = test.states[stateId]

	res.json({
		stateId: stateId,
		screenType: state.screenType,
		screenParameters: state.screenParameters
	}).end();
};
