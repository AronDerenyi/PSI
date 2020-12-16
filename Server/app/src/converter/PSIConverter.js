const Converter = require('./Converter')
const Property = require('./Property')

module.exports = new Converter([
	new Property('test', results => results.test),
	new Property('group', results => results.group)
])
