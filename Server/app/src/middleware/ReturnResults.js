module.exports = (converter) => (req, res) => {
	res
		.send(converter.toHTML(res.locals.results))
		.end()
};
