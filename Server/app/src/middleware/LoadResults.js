const axios = require('axios')
const qs = require('querystring')

module.exports = () => (req, res, next) => {
	const session = req.session

	console.log(session.id)
	console.log(session.results)

	axios
		.post('http://aderenyi.web.elte.hu/db/psi.php', qs.stringify({
			id: session.id,
			results: JSON.stringify(session.results)
		}))
		.then(() => next())
		.catch(err => next(err.response.data || err.response.status))
};
