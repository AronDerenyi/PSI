module.exports = () => (req, res, next) => {
	req.session.regenerate(function(err) {
		next(err)
	})
};
