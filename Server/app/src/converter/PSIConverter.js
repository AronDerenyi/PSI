const Converter = require('./Converter')
const Property = require('./Property')

const fromAnswer = (state, id, name) => new Property(name, results =>
	results[state]
		.inputs
		.find(input => input.id == id)
		.answer
)

const fromValue = (state, id, name) => new Property(name, results =>
	results[state]
		.inputs
		.find(input => input.id == id)
		.value
)

const properties = [
	new Property('group_covid', results => results.group.covid),
	new Property('group_brand', results => results.group.brand),
	new Property('code', results => results.code),
	new Property('fam', results => results['fam'].selected),
	new Property('fam_scale', results => results['fam_scale'].selected),
	new Property('following', results => results['following'].selected)
]

// EPSI
for (let id = 1; id <= 6; id++) {
	properties.push(fromAnswer('EPSI', id, `EPSI_${id}`))
}

// PSR
properties.push(fromAnswer('PSR', 'control', 'PSR_control'))
for (let id = 1; id <= 20; id++) {
	properties.push(fromAnswer('PSR', id, `PSR_${id}`))
}

// View durations
properties.push(
	new Property('video_view', results => results['video'].elapsedTime / 1000)
)
properties.push(
	new Property('post_view', results => results['post'].elapsedTime / 1000)
)

// Engagement
for (let id = 1; id <= 5; id++) {
	properties.push(fromAnswer('eng', id, `eng_${id}`))
}

// Ad
for (let id = 1; id <= 3; id++) {
	properties.push(fromAnswer('ad_cred', id, `ad_cred_${id}`))
}
for (let id = 1; id <= 5; id++) {
	properties.push(fromAnswer('ad_att', id, `ad_att_${id}`))
}
for (let id = 1; id <= 2; id++) {
	properties.push(fromAnswer('ad_ethical', id, `ad_ethical_${id}`))
}

// Recognition
properties.push(fromValue('rec', 'product', 'product_rec'))
properties.push(fromValue('rec', 'brand', 'brand_rec'))

// Congruency
for (let id = 1; id <= 4; id++) {
	properties.push(fromAnswer('con', id, `con_${id}`))
}

// Covid content
for (let id = 1; id <= 5; id++) {
	properties.push(fromValue('covid_cont', id, `covid_cont_${id}`))
}

// Covid attractive
for (let id = 1; id <= 5; id++) {
	properties.push(fromAnswer('covid_att', id, `covid_att_${id}`))
}

// Third person
properties.push(new Property('third_pers', results => results['third_pers'].selected))

// Covid congruency
for (let id = 1; id <= 4; id++) {
	properties.push(fromAnswer('covid_con', id, `covid_con_${id}`))
}

// Credibility
properties.push(fromAnswer('cred', 'control', 'cred_control'))
for (let id = 1; id <= 5; id++) {
	properties.push(fromAnswer('cred', id, `att_${id}`))
}
for (let id = 1; id <= 5; id++) {
	properties.push(fromAnswer('cred', id + 5, `trust_${id}`))
}
for (let id = 1; id <= 5; id++) {
	properties.push(fromAnswer('cred', id + 10, `exp_${id}`))
}
for (let id = 1; id <= 6; id++) {
	properties.push(fromAnswer('cred', id + 15, `good_${id}`))
}
properties.push(new Property('cred_sum', results =>
	results['cred']
		.inputs
		.reduce((sum, input) => {
			if (input.id == 'control') {
				return sum
			} else {
				return sum + input.answer
			}
		}, 0)
))
properties.push(new Property('cred_att', results =>
	results['cred']
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
	results['cred']
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
	results['cred']
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
	results['cred']
		.inputs
		.reduce((sum, input) => {
			if (['16', '17', '18', '19', '20', '21'].includes(input.id)) {
				return sum + input.answer
			} else {
				return sum
			}
		}, 0)
))

// Advertisement
properties.push(new Property('ad_perc', results => results['ad_perc'].selected))

// Post familiar
properties.push(new Property('fam_post', results => results['fam_post'].selected))

// Brand familiar
properties.push(new Property('fam_brand', results => results['fam_brand'].selected))

// Sales knowledge
properties.push(fromAnswer('sales_exp', 1, 'sales_exp_1'))
properties.push(fromAnswer('sales_exp', 2, 'sales_exp_2'))

// Age
properties.push(fromValue('age', 'age', `age`))

// Gender
properties.push(new Property('gender', results => results['gender'].selected))

// Education
properties.push(new Property('edu', results => results['edu'].selected))

// Marketing knowledge
properties.push(new Property('mkt_exp', results => results['mkt_exp'].selected))

module.exports = new Converter(properties)
