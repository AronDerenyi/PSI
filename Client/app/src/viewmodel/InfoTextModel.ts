import Vue from "vue";

export class InfoTextModel {

	readonly title: string
	readonly description: string
	readonly nextLabel: string

	readonly result: {
		elapsedTime: number
	}

	private readonly startTime = Date.now()

	constructor(parameters: any) {
		if (typeof parameters.title === 'string') this.title = parameters.title
		if (typeof parameters.description === 'string') this.description = parameters.description
		if (typeof parameters.next === 'string') this.nextLabel = parameters.next
	}

	next() {
		Vue.set(this, "result", {
			elapsedTime: Date.now() - this.startTime
		})
	}
}
