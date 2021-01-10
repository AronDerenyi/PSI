module.exports = (converter) => (req, res) => {
	res.setHeader('Content-Type', 'text/html')
	res.send(converter.toHTML(res.locals.results)).end()
};
