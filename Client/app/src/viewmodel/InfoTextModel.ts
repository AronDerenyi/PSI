import Vue from "vue";

export class InfoTextModel {

	readonly title: string
	readonly text: string

	readonly result: {}

	constructor(parameters: any) {
		if (typeof parameters.title === 'string') {
			this.title = parameters.title
		}

		if (typeof parameters.text === 'string') {
			this.text = parameters.text
		}
	}

	next() {
		Vue.set(this, "result", {})
	}
}
