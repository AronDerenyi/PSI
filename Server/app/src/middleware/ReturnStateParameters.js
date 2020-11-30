module.exports = function (req, res) {
	const stateId = req.session.stateId

	res.json({
		id: stateId,
		type: "",
		parameters: {}
	}).end();
};
