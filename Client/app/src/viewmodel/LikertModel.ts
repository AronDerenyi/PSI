import Vue from "vue";

export class LikertModel {

	readonly title: string
	readonly nextLabel: string

	readonly labels: { readonly [index: number]: string }
	readonly questions: {
		readonly [index: number]: {
			readonly question: string,
			answer: number
		}
	}

	readonly result: {
		elapsedTime: number,
		questions: {
			id: string,
			answer: number,
			events: {
				time: number,
				answer: number
			}[]
		}[]
	}

	private readonly internalQuestions: {
		readonly id: string,
		readonly question: string,

		answer: number,

		readonly events: {
			readonly time: number,
			readonly answer: number
		}[]
	}[] = []

	private readonly pageSize: number
	private currentPage = -1

	private readonly startTime = Date.now()

	constructor(parameters: any) {
		if (typeof parameters.title === 'string') this.title = parameters.title
		if (typeof parameters.next === 'string') this.nextLabel = parameters.next

		if (Array.isArray(parameters.labels)) {
			this.labels = parameters.labels.filter(
				(label: any) => typeof label === 'string'
			)
		}

		if (Array.isArray(parameters.questions)) {
			parameters.questions.forEach((question: any) => {
				if (
					typeof question.id === 'string' &&
					typeof question.question === 'string'
				) {
					this.internalQuestions.push({
						id: question.id,
						question: question.question,
						answer: null,
						events: []
					})
				}
			})
		}

		if (typeof parameters.pageSize === 'number') {
			this.pageSize = parameters.pageSize
		} else {
			this.pageSize = this.internalQuestions.length
		}

		if (parameters.random === true) {
			for (let index = this.internalQuestions.length - 1; index > 0; index--) {
				const randomIndex = Math.floor(Math.random() * (index + 1))
				const temp = this.internalQuestions[index]
				this.internalQuestions[index] = this.internalQuestions[randomIndex]
				this.internalQuestions[randomIndex] = temp
			}
		}

		this.nextPage()
	}

	get showNext() {
		for (let index in this.questions) {
			if (this.questions[index].answer === null) return false
		}
		return true
	}

	next() {
		if (this.nextPage()) return
		Vue.set(this, 'result', {
			elapsedTime: Date.now() - this.startTime,
			inputs: this.internalQuestions.map(question => ({
				id: question.id,
				answer: question.answer,
				events: question.events.map(event => ({
					time: event.time,
					answer: event.answer
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

		if (this.currentPage * this.pageSize >= this.internalQuestions.length) {
			Vue.set(this, 'questions', [])
			return false
		}

		const startTime = this.startTime
		const startIndex = this.currentPage * this.pageSize
		const endIndex = startIndex + this.pageSize
		const questions = this.internalQuestions
			.slice(startIndex, endIndex)
			.map(question => ({
				question: question.question,
				get answer() { return question.answer },
				set answer(answer) {
					question.answer = answer
					question.events.push({
						time: Date.now() - startTime,
						answer: answer
					})
				}
			}))

		Vue.set(this, 'questions', questions)
		return true
	}
}
