import Vue from "vue";

export class OsgoodModel {

	readonly title: string
	readonly nextLabel: string

	readonly size: number
	readonly pairs: {
		readonly [index: number]: {
			readonly first: string,
			readonly second: string,
			value: number
		}
	}

	readonly result: {
		elapsedTime: number,
		questions: {
			id: string,
			value: number,
			events: {
				time: number,
				value: number
			}[]
		}[]
	}

	private readonly internalPairs: {
		readonly id: string,
		readonly first: string,
		readonly second: string,

		value: number

		readonly events: {
			readonly time: number,
			readonly value: number
		}[]
	}[] = []

	private readonly pageSize: number
	private currentPage = -1

	private readonly startTime = Date.now()

	constructor(parameters: any) {
		if (typeof parameters.title === 'string') this.title = parameters.title
		if (typeof parameters.next === 'string') this.nextLabel = parameters.next

		if (typeof parameters.size === 'number') this.size = parameters.size

		if (Array.isArray(parameters.pairs)) {
			parameters.pairs.forEach((pair: any) => {
				if (
					typeof pair.id === 'string' &&
					typeof pair.first === 'string' &&
					typeof pair.second === 'string'
				) {
					this.internalPairs.push({
						id: pair.id,
						first: pair.first,
						second: pair.second,
						value: null,
						events: []
					})
				}
			})
		}

		if (typeof parameters.pageSize === 'number') {
			this.pageSize = parameters.pageSize
		} else {
			this.pageSize = this.internalPairs.length
		}

		if (parameters.random === true) {
			for (let index = this.internalPairs.length - 1; index > 0; index--) {
				const randomIndex = Math.floor(Math.random() * (index + 1))
				const temp = this.internalPairs[index]
				this.internalPairs[index] = this.internalPairs[randomIndex]
				this.internalPairs[randomIndex] = temp
			}
		}

		this.nextPage()
	}

	get showNext() {
		for (let index in this.pairs) {
			if (this.pairs[index].value === null) return false
		}
		return true
	}

	next() {
		if (this.nextPage()) return
		Vue.set(this, 'result', {
			elapsedTime: Date.now() - this.startTime,
			inputs: this.internalPairs.map(pair => ({
				id: pair.id,
				answer: pair.value,
				events: pair.events.map(event => ({
					time: event.time,
					answer: event.value
				}))
			}))
		})
	}

	private nextPage(): boolean {
		if (this.currentPage < 0) {
			this.currentPage = 0
		} else {
			this.currentPage++
		}

		if (this.currentPage * this.pageSize >= this.internalPairs.length) {
			Vue.set(this, 'pairs', [])
			return false
		}

		const startTime = this.startTime
		const startIndex = this.currentPage * this.pageSize
		const endIndex = startIndex + this.pageSize
		const pairs = this.internalPairs
			.slice(startIndex, endIndex)
			.map(pair => ({
				first: pair.first,
				second: pair.second,
				get value() { return pair.value },
				set value(value) {
					pair.value = value
					pair.events.push({
						time: Date.now() - startTime,
						value: value
					})
				}
			}))

		Vue.set(this, 'pairs', pairs)
		return true
	}
}
