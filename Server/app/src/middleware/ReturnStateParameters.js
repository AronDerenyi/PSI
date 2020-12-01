module.exports = (test) => (req, res) => {
	const stateId = req.session.stateId
	const state = test.states[stateId]

	res.json({
		id: stateId,
		type: state.type,
		parameters: state.parameters
	}).end();
};
