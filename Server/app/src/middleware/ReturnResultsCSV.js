module.exports = (converter) => (req, res) => {
	res.setHeader('Content-Type', 'text/csv; charset=utf-8')
	res.setHeader('Content-Disposition', 'attachment; filename="results.csv"')
	res.send(converter.toCSV(res.locals.results)).end()
};
