const Converter = require('./Converter')
const Property = require('./Property')

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

const properties = [
	new Property('group_covid', results => results.group.covid ? 1 : 0),
	new Property('group_brand', results => results.group.brand),
	new Property('fam_T', results => results['familiar'].selected)
]

// PSI
for (let id = 1; id <= 6; id++) {
	properties.push(fromAnswers('EPSI', 'psi', id.toString()))
}

// PSR
properties.push(
	new Property('PSR_control', results =>
		results['psr']
			.inputs
			.find(input => input.id === '0')
			.answer
	)
)
for (let id = 1; id <= 20; id++) {
	properties.push(fromAnswers('PSR', 'psr', id.toString()))
}

// Image view duration
properties.push(
	new Property('post_view', results => (
		results['insta_brand_none'] ||
		results['insta_brand_cong'] ||
		results['insta_brand_incong'] ||
		results['insta_covid_brand_none'] ||
		results['insta_covid_brand_cong'] ||
		results['insta_covid_brand_incong']
	).elapsedTime / 1000)
)

// Actions
for (let id = 1; id <= 5; id++) {
	properties.push(fromAnswers('eng', 'actions', id.toString()))
}

// Trustworthy
for (let id = 1; id <= 3; id++) {
	properties.push(fromAnswers('ad_cred', 'trustworthy', id.toString()))
}

// Attractive
for (let id = 1; id <= 5; id++) {
	properties.push(fromAnswers('ad_att', 'attractive', id.toString()))
}

// Ethics
for (let id = 1; id <= 2; id++) {
	properties.push(fromAnswers('ad_ethical', 'ethics', id.toString()))
}

// Brand recognition
properties.push(
	new Property('product_rec', results =>
		results['brand']
			.inputs
			.find(input => input.id === 'product')
			.value
	)
)
properties.push(
	new Property('brand_rec', results =>
		results['brand']
			.inputs
			.find(input => input.id === 'brand')
			.value
	)
)

// Congruency
for (let id = 1; id <= 4; id++) {
	properties.push(new Property('con_' + id, results => {
		const congruency = results['congruency_cong'] || results['congruency_incong']
		return congruency
			.inputs
			.find(input => input.id === id.toString())
			.answer
	}))
}

// Covid content
for (let id = 1; id <= 5; id++) {
	properties.push(fromValues('covid_cont', 'covid_content', id.toString()))
}

// Covid attractive
for (let id = 1; id <= 5; id++) {
	properties.push(fromAnswers('covid_att', 'covid_attractive', id.toString()))
}

// Third person
properties.push(new Property('third_pers', results => results['third_person'].selected))

// Covid congruency
for (let id = 1; id <= 4; id++) {
	properties.push(fromAnswers('covid_con', 'covid_congruency', id.toString()))
}

// Credibility
properties.push(new Property('cred_control', results =>
	results['creadibility']
		.inputs
		.find(input => input.id === '0')
		.answer
))
for (let id = 1; id <= 5; id++) {
	properties.push(new Property('att_' + id.toString(), results =>
		results['creadibility']
			.inputs
			.find(input => input.id === id.toString())
			.answer
	))
}
for (let id = 1; id <= 5; id++) {
	properties.push(new Property('trust_' + id.toString(), results =>
		results['creadibility']
			.inputs
			.find(input => input.id === (id + 5).toString())
			.answer
	))
}
for (let id = 1; id <= 5; id++) {
	properties.push(new Property('exp_' + id.toString(), results =>
		results['creadibility']
			.inputs
			.find(input => input.id === (id + 10).toString())
			.answer
	))
}
for (let id = 1; id <= 6; id++) {
	properties.push(new Property('good_' + id.toString(), results => {
		const answer = results['creadibility']
			.inputs
			.find(input => input.id === (id + 15).toString())
			.answer

		return [1, 2, 4].includes(id) ? 6 - answer : answer
	}))
}
properties.push(new Property('credibility_sum', results =>
	results['creadibility']
		.inputs
		.reduce((sum, input) => {
			if (input.id === '0') {
				return sum
			} else if (['16', '17', '19'].includes(input.id)) {
				return sum + 6 - input.answer
			} else {
				return sum + input.answer
			}
		}, 0)
))
properties.push(new Property('cred_att', results =>
	results['creadibility']
		.inputs
		.reduce((sum, input) => {
			if (['1', '2', '3', '4', '5'].includes(input.id)) {
				return sum + input.answer
			} else {
				return sum
			}
		}, 0)
))
properties.push(new Property('cred_trust', results =>
	results['creadibility']
		.inputs
		.reduce((sum, input) => {
			if (['6', '7', '8', '9', '10'].includes(input.id)) {
				return sum + input.answer
			} else {
				return sum
			}
		}, 0)
))
properties.push(new Property('cred_exp', results =>
	results['creadibility']
		.inputs
		.reduce((sum, input) => {
			if (['11', '12', '13', '14', '15'].includes(input.id)) {
				return sum + input.answer
			} else {
				return sum
			}
		}, 0)
))
properties.push(new Property('cred_good', results =>
	results['creadibility']
		.inputs
		.reduce((sum, input) => {
			if (['18', '20', '21'].includes(input.id)) {
				return sum + input.answer
			} else if (['16', '17', '19'].includes(input.id)) {
				return sum + 6 - input.answer
			} else {
				return sum
			}
		}, 0)
))

// Advertisement
properties.push(new Property('ad_perc', results => results['advertisement'].selected))

// Post familiar
properties.push(new Property('fam_post', results => results['post_familiar'].selected))

// Brand familiar
properties.push(new Property('fam_brand', results => results['brand_familiar'].selected))

// Sales knowledge
for (let id = 1; id <= 2; id++) {
	properties.push(fromAnswers('sales_exp', 'sales_knowledge', id.toString()))
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
properties.push(new Property('edu', results => results['education'].selected))

// Marketing knowledge
properties.push(new Property('mkt_exp', results => results['marketing_knowledge'].selected))

// Source
properties.push(new Property('source', results =>
	results['source']
		.inputs
		.find(input => input.id === 'source')
		.value
))

module.exports = new Converter(properties)
