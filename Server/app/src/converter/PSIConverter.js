const Converter = require('./Converter')
const Property = require('./Property')

const properties = [
	new Property('group_covid', results => results.group.covid ? 1 : 0),
	new Property('group_brand', results => results.group.brand),
	new Property('familiar', results => results['familiar'].selected)
]

const fromAnswers = (name, state, id) => new Property(name + '_' + id, results =>
	results[state]
		.inputs
		.find(input => input.id === id.toString())
		.answer
)

const fromValues = (name, state, id) => new Property(name + '_' + id, results =>
	results[state]
		.inputs
		.find(input => input.id === id.toString())
		.value
)

// PSI
for (let id = 1; id <= 6; id++) {
	properties.push(fromAnswers('psi', 'psi', id.toString()))
}

// PSR
properties.push(
	new Property('psr_control', results =>
		results['psr']
			.inputs
			.find(input => input.id === '0')
			.answer
	)
)
for (let id = 1; id <= 20; id++) {
	properties.push(fromAnswers('psr', 'psr', id.toString()))
}

// Actions
for (let id = 1; id <= 5; id++) {
	properties.push(fromAnswers('actions', 'actions', id.toString()))
}

// Trustworthy
for (let id = 1; id <= 3; id++) {
	properties.push(fromAnswers('trustworthy', 'trustworthy', id.toString()))
}

// Attractive
for (let id = 1; id <= 5; id++) {
	properties.push(fromAnswers('attractive', 'attractive', id.toString()))
}

// Ethics
for (let id = 1; id <= 2; id++) {
	properties.push(fromAnswers('ethics', 'ethics', id.toString()))
}

// Brand
properties.push(fromValues('brand', 'brand', 'product'))
properties.push(fromValues('brand', 'brand', 'brand'))

// Congruency
for (let id = 1; id <= 4; id++) {
	properties.push(new Property('congruency_' + id, results => {
		const congruency = results['congruency_cong'] || results['congruency_incong']
		return congruency
			.inputs
			.find(input => input.id === id.toString())
			.answer
	}))
}

// Covid content
for (let id = 1; id <= 5; id++) {
	properties.push(fromValues('covid_content', 'covid_content', id.toString()))
}

// Covid attractive
for (let id = 1; id <= 5; id++) {
	properties.push(fromAnswers('covid_attractive', 'covid_attractive', id.toString()))
}

// Third person
properties.push(new Property('third_person', results => results['third_person'].selected))

// Covid congruency
for (let id = 1; id <= 4; id++) {
	properties.push(fromAnswers('covid_congruency', 'covid_congruency', id.toString()))
}

// Credibility
properties.push(new Property('credibility_control', results =>
	results['creadibility']
		.inputs
		.find(input => input.id === '0')
		.answer
))
for (let id = 1; id <= 21; id++) {
	properties.push(fromAnswers('credibility', 'creadibility', id.toString()))
}

// Advertisement
properties.push(new Property('advertisement', results => results['advertisement'].selected))

// Post familiar
properties.push(new Property('post_familiar', results => results['post_familiar'].selected))

// Brand familiar
properties.push(new Property('brand_familiar', results => results['brand_familiar'].selected))

// Sales knowledge
for (let id = 1; id <= 2; id++) {
	properties.push(fromAnswers('sales_knowledge', 'sales_knowledge', id.toString()))
}

// Age
properties.push(new Property('age', results =>
	results['age']
		.inputs
		.find(input => input.id === 'age')
		.value
))

// Gender
properties.push(new Property('gender', results => results['gender'].selected))

// Education
properties.push(new Property('education', results => results['education'].selected))

// Marketing knowledge
properties.push(new Property('marketing_knowledge', results => results['marketing_knowledge'].selected))

// Source
properties.push(new Property('source', results =>
	results['source']
		.inputs
		.find(input => input.id === 'source')
		.value
))

module.exports = new Converter(properties)
