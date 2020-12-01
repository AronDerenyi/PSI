import Vue from "vue"

export class InputOptionsModel {

	readonly title: string = null

	readonly optionNames: { readonly [index: number]: string }
	readonly optionCount: number
	selectedOption: number = -1

	get showNext(): boolean {
		return this.selectedOption >= 0 && this.selectedOption < this.optionCount
	}

	readonly result: { readonly selected: string }

	private readonly options: {
		id: string,
		name: string
	}[] = []

	constructor(parameters: any) {
		if (typeof parameters.title === 'string') {
			this.title = parameters.title
		}

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
			selected: this.options[this.selectedOption].id
		})
	}
}
