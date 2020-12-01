module.exports = (test) => (req, res, next) => {
	const session = req.session

	if (!session.stateId || !session.results) {
		session.stateId = test.start
		session.results = {}
	}

	next()
};
