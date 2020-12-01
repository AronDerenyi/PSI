import Vue from "vue"

export class InputOptionsModel {

	readonly optionNames: { readonly [index: number]: string } = null
	readonly optionCount: number = null
	selectedOption: number = null

	readonly result: { readonly selected: string } = null

	private readonly options: {
		id: string,
		name: string
	}[] = []

	constructor(parameters: any) {
		if (Array.isArray(parameters.options)) {
			parameters.options.forEach((option: any) => {
				if (
					typeof option.id === 'string' &&
					typeof option.name === 'string'
				) {
					this.options.push({
						id: option.id,
						name: option.name
					})
				}
			})
		}

		this.optionNames = this.options.map(option => option.name)
		this.optionCount = this.options.length
	}

	next() {
		Vue.set(this, "result", {
			selected: this.options[this.selectedOption - 1].id
		})
	}
}
