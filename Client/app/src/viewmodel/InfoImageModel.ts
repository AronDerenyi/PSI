import Vue from "vue";

export class InfoImageModel {

	readonly title: string
	readonly src: string
	readonly progress: number

	readonly result: {
		elapsedTime: number
	}

	private readonly waitingTime = 0
	private readonly startTime = Date.now()

	constructor(parameters: any) {
		if (typeof parameters.title === 'string') this.title = parameters.title
		if (typeof parameters.src === 'string') this.src = parameters.src
		if (typeof parameters.waitingTime === 'number') this.waitingTime = parameters.waitingTime
		this.updateProgress()
	}

	private updateProgress() {
		const elapsedTime = Date.now() - this.startTime
		Vue.set(this, "progress", Math.min(elapsedTime / this.waitingTime, 1))
		if (this.progress < 1) requestAnimationFrame(() => this.updateProgress())
	}

	get showNext(): boolean {
		return this.progress === 1
	}

	next() {
		Vue.set(this, "result", {
			elapsedTime: Date.now() - this.startTime
		})
	}
}
