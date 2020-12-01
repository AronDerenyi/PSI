module.exports = () => (req, res, next) => {
	const session = req.session

	if (!session.stateId || !session.results) {
		next("The session hasn't been initialized.")
	} else {
		next()
	}
};
