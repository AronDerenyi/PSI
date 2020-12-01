import Vue from "vue"

export class InputOptionsModel {

	readonly title: string = null
	readonly optionNames: { readonly [index: number]: string }

	readonly result: {
		selected: string,
		elapsedTime: number,
		events: {
			time: number,
			selected: string
		}[]
	}

	private readonly options: {
		id: string,
		name: string
	}[] = []

	private readonly events: {
		readonly time: number,
		readonly selected: string
	}[] = []

	private readonly startTime = Date.now()
	private internalSelectedOption = -1

	constructor(parameters: any) {
		if (typeof parameters.title === 'string') this.title = parameters.title
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
	}

	get selectedOption() {
		return this.internalSelectedOption
	}

	set selectedOption(selectedOption) {
		this.internalSelectedOption = selectedOption
		this.events.push({
			time: Date.now() - this.startTime,
			selected: this.options[selectedOption].id
		})
	}

	get showNext(): boolean {
		return this.internalSelectedOption >= 0 && this.internalSelectedOption < this.options.length
	}

	next() {
		Vue.set(this, "result", {
			selected: this.options[this.internalSelectedOption].id,
			elapsedTime: Date.now() - this.startTime,
			events: this.events.map(event => ({
				time: event.time,
				selected: event.selected
			}))
		})
	}
}
