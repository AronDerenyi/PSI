const axios = require('axios')

module.exports = () => (req, res, next) => {
	axios
		.get('http://aderenyi.web.elte.hu/db/psi.php')
		.then(response => {
			res.locals.results = response.data
			next()
		})
		.catch(err => next(err.response.data || err.response.status))
};
