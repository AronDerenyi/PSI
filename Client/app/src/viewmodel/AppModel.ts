import Vue from "vue";
import {TestAPI} from "src/api/TestAPI";

export class AppModel {

	readonly stateId: string = null
	readonly screenType: string = null
	readonly screenParameters: any = null

	private readonly testAPI = TestAPI.instance;

	constructor() {
		this.testAPI.getTest()
			.then(response => this.apply(response))
			.catch((error) => alert(error.status + " Error: " + error.response))
	}

	onResult(result: any) {
		const stateId = this.stateId

		// this.reset()
		this.testAPI.postTest(stateId, result)
			.then(response => this.apply(response))
			.catch((error) => alert(`${error.status} Error: ${error.response}`))
	}

	private reset() {
		Vue.set(this, 'stateId', null)
		Vue.set(this, 'screenType', null)
		Vue.set(this, 'screenParameters', null)
	}

	private apply(response: { stateId: string, screenType: string, screenParameters: any }) {
		Vue.set(this, 'stateId', response.stateId)
		Vue.set(this, 'screenType', response.screenType)
		Vue.set(this, 'screenParameters', response.screenParameters)
	}
}
