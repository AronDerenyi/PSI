import Vue from "vue"

export class InputOptionsModel {

	readonly title: string
	readonly description: string
	readonly nextLabel: string
	readonly optionLabels: { readonly [index: number]: string }

	readonly result: {
		elapsedTime: number,
		selected: string,
		events: {
			time: number,
			selected: string
		}[]
	}

	private readonly options: {
		id: string,
		label: string
	}[] = []

	private readonly events: {
		readonly time: number,
		readonly selected: string
	}[] = []

	private readonly startTime = Date.now()
	private internalSelectedOption = -1

	constructor(parameters: any) {
		if (typeof parameters.title === 'string') this.title = parameters.title
		if (typeof parameters.description === 'string') this.description = parameters.description
		if (typeof parameters.next === 'string') this.nextLabel = parameters.next
		if (Array.isArray(parameters.options)) {
			parameters.options.forEach((option: any) => {
				if (
					typeof option.id === 'string' &&
					typeof option.label === 'string'
				) {
					this.options.push({
						id: option.id,
						label: option.label
					})
				}
			})
		}

		this.optionLabels = this.options.map(option => option.label)
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
			elapsedTime: Date.now() - this.startTime,
			selected: this.options[this.internalSelectedOption].id,
			events: this.events.map(event => ({
				time: event.time,
				selected: event.selected
			}))
		})
	}
}
