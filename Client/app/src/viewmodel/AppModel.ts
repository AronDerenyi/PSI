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
		if (result) console.log(JSON.parse(JSON.stringify(result)))
		this.testAPI.postTest(this.stateId, result)
			.then(response => this.apply(response))
			.catch((error) => alert(error.status + " Error: " + error.response))
	}

	private apply(response: { stateId: string, screenType: string, screenParameters: any }) {
		Vue.set(this, 'stateId', response.stateId)
		Vue.set(this, 'screenType', response.screenType)
		Vue.set(this, 'screenParameters', response.screenParameters)
	}
}
