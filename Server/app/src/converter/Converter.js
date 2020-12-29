module.exports = function Converter(
	properties
) {

	this.toHTML = (results) => html(results)

	const html = (results) => `<html>
		${body(results)}
	</html>`.trim()

	const body = (results) => `<body>
		${style()}
		${table(results)}
	</body>`.trim()

	const style = () => `<style>
		table, th, td {border: 1px solid black}
		th, td {padding: 4px 8px}
		th {background: #AAA}
		td {background: #DDD}
		.null {background: #FFF}
	</style>`.trim()

	const table = (results) => {
		let html = `<table>`
		html += headers()
		results.forEach(r => {
			html += row(r)
		})
		return html + `</table>`
	}

	const headers = () => {
		let html = `<tr>`
		properties.forEach(property => {
			html += `<th>${property.name}</th>`
		})
		return html + `</tr>`
	}

	const row = (results) => {
		let html = `<tr>`
		properties.forEach(property => {
			const converted = property.convert(results)
			if (converted !== null) {
				html += `<td>${converted}</td>`
			} else {
				html += `<td class="null"></td>`
			}
		})
		return html + `</tr>`
	}
}