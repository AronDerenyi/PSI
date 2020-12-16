module.exports = function Property(
	name,
	converter
) {

	this.name = name
	this.convert = (results) => {
		try {
			const converted = converter(results)
			if (typeof converted !== 'undefined' && converted !== null) {
				return converted.toString()
			} else {
				return null
			}
		} catch {
			return null
		}
	}
}
