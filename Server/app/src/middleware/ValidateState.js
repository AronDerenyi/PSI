module.exports = function (req, res, next) {
	const clientStateId = req.body.stateId
	const serverStateId = req.session.stateId

	if (clientStateId !== serverStateId) {
		next("The client is not in sync with the server.")
	} else {
		next()
	}
};
