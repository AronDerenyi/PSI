exports.module = function Converter(
	properties
) {

	this.toHTML = (results) => {
		return html(results)
	}

	const html = (results) => {
		return `<html>${body(results)}</html>`
	}

	const body = (results) => {
		return `<body>${table(results)}</body>`
	}

	const table = (results) => {
		let html = `<body>`
		html += headers(results)
		results.forEach(results => {
			html += row(results)
		})
		return html + `<body>`
	}

	const headers = (results) => {
		let html = `<tr>`
		properties.forEach(property => {
			html += `<td>${property.name}</td>`
		})
		return html + `</tr>`
	}

	const row = (results) => {
		let html = `<tr>`
		properties.forEach(property => {
			html += `<td>${property.value(results)}</td>`
		})
		return html + `</tr>`
	}
}
