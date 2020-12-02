import Vue from "vue";

export class InfoVideoModel {

	readonly title: string
	readonly src: string

	readonly result: {
		elapsedTime: number
	}

	private finished = false
	private readonly startTime = Date.now()

	constructor(parameters: any) {
		if (typeof parameters.title === 'string') this.title = parameters.title
		if (typeof parameters.src === 'string') this.src = parameters.src
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
