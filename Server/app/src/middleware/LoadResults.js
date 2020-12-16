const axios = require('axios')

module.exports = (filter) => (req, res, next) => {
	axios
		.get('http://aderenyi.web.elte.hu/db/psi.php')
		.then(response => {
			res.locals.results = filter ?
				response.data.filter(results => {
					try {
						return filter(results)
					} catch {
						return false
					}
				}) :
				response.data

			next()
		})
		.catch(err => next(err.response.data || err.response.status))
};
