import Vue from "vue";

export class InputTextModel {

	readonly title: string
	readonly description: string
	readonly nextLabel: string
	readonly inputLabels: { readonly [index: number]: string }

	readonly result: {
		elapsedTime: number,
		inputs: {
			id: string,
			value: string,
			events: {
				time: number,
				value: string
			}[]
		}[]
	}

	private readonly inputs: {
		readonly id: string,
		readonly label: string,

		value: string,

		readonly events: {
			readonly time: number,
			readonly value: string
		}[]
	}[] = []

	private readonly startTime = Date.now()

	constructor(parameters: any) {
		if (typeof parameters.title === 'string') this.title = parameters.title
		if (typeof parameters.description === 'string') this.description = parameters.description
		if (typeof parameters.next === 'string') this.nextLabel = parameters.next
		if (Array.isArray(parameters.inputs)) {
			parameters.inputs.forEach((input: any) => {
				if (
					typeof input.id === 'string' &&
					typeof input.label === 'string'
				) {
					this.inputs.push({
						id: input.id,
						label: input.label,
						value: null,
						events: []
					})
				}
			})
		}

		this.inputLabels = this.inputs.map(input => input.label)
	}

	getInputValue(index: number) {
		return this.inputs[index].value
	}

	setInputValue(index: number, value: string) {
		const input = this.inputs[index]
		input.value = value
		input.events.push({
			time: Date.now() - this.startTime,
			value: value
		})
	}

	next() {
		Vue.set(this, "result", {
			elapsedTime: Date.now() - this.startTime,
			inputs: this.inputs.map(input => ({
				id: input.id,
				value: input.value,
				events: input.events.map(event => ({
					time: event.time,
					value: event.value
				}))
			}))
		})
	}
}
