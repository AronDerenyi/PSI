module.exports = function (req, res, next) {
	const session = req.session

	if (!session.stateId || !session.results) {
		session.stateId = ""
		session.results = {}
	}

	next()
};
