module.exports = function Property(
	name,
	converter
) {

	this.name = name
	this.convert = (results) => {
		return converter(results)
	}
}
