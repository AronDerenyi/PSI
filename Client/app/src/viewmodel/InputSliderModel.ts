import Vue from "vue";

export class InputSliderModel {

	readonly title: string
	readonly description: string
	readonly nextLabel: string
	readonly minValue: number
	readonly maxValue: number

	readonly result: {
		elapsedTime: number,
		selected: number,
		events: {
			time: number,
			selected: number
		}[]
	}

	private readonly events: {
		readonly time: number,
		readonly selected: number
	}[] = []

	private readonly startTime = Date.now()
	private internalSelectedValue: number
	private selectedValueChanged = false

	constructor(parameters: any) {
		if (typeof parameters.title === 'string') this.title = parameters.title
		if (typeof parameters.description === 'string') this.description = parameters.description
		if (typeof parameters.next === 'string') this.nextLabel = parameters.next
		if (typeof parameters.minValue === 'number') this.minValue = parameters.minValue
		if (typeof parameters.maxValue === 'number') this.maxValue = parameters.maxValue

		this.internalSelectedValue = Math.round((this.minValue + this.maxValue) / 2)
	}

	get selectedValue() {
		return this.internalSelectedValue
	}

	set selectedValue(selectedValue) {
		this.selectedValueChanged = true
		this.internalSelectedValue = selectedValue
		this.events.push({
			time: Date.now() - this.startTime,
			selected: selectedValue
		})
	}

	get showNext(): boolean {
		return this.selectedValueChanged
	}

	next() {
		Vue.set(this, "result", {
			elapsedTime: Date.now() - this.startTime,
			selected: this.internalSelectedValue,
			events: this.events.map(event => ({
				time: event.time,
				selected: event.selected
			}))
		})
	}
}
