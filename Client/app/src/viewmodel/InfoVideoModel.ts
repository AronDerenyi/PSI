import Vue from "vue";

export class InfoVideoModel {

	readonly title: string
	readonly description: string
	readonly nextLabel: string
	readonly source: string

	readonly result: {
		elapsedTime: number
	}

	private finished = false
	private readonly startTime = Date.now()

	constructor(parameters: any) {
		if (typeof parameters.title === 'string') this.title = parameters.title
		if (typeof parameters.description === 'string') this.description = parameters.description
		if (typeof parameters.next === 'string') this.nextLabel = parameters.next
		if (typeof parameters.source === 'string') this.source = parameters.source
	}

	get showNext(): boolean {
		return this.finished
	}

	videoFinished() {
		this.finished = true
	}

	next() {
		Vue.set(this, "result", {
			elapsedTime: Date.now() - this.startTime
		})
	}
}
