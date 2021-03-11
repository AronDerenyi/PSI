import Vue from "vue";

export class InfoTextModel {

	readonly title: string
	readonly description: string

	readonly positiveLabel: string
	readonly positiveId: string

	readonly negativeLabel: string
	readonly negativeId: string

	readonly result: {
		elapsedTime: number
	}

	private readonly startTime = Date.now()

	constructor(parameters: any) {
		if (typeof parameters.title === 'string') this.title = parameters.title
		if (typeof parameters.description === 'string') this.description = parameters.description

		if (typeof parameters.positive === 'string') this.positiveLabel = parameters.positive
		if (typeof parameters.positiveId === 'string') this.positiveId = parameters.positiveId

		if (typeof parameters.negative === 'string') this.negativeLabel = parameters.negative
		if (typeof parameters.negativeId === 'string') this.negativeId = parameters.negativeId
	}

	next(selected: string) {
		Vue.set(this, "result", {
			selected: selected,
			elapsedTime: Date.now() - this.startTime
		})
	}
}
