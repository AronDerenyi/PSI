export class TestAPI {

	static readonly instance = new TestAPI();

	private constructor() {

	}

	private create(xhttp: XMLHttpRequest): Promise<{ id: string, type: string, parameters: any }> {
		return new Promise((resolve, reject) => {
			xhttp.onreadystatechange = function () {
				if (this.readyState == 4) {
					if (this.status == 200) {
						const response = JSON.parse(this.response)

						if (typeof response.id !== 'string') reject()
						if (typeof response.type !== 'string') reject()

						resolve({
							id: response.id,
							type: response.type,
							parameters: response.parameters
						})
					} else {
						reject({
							status: this.status,
							response: this.response
						})
					}
				}
			};
		})
	}

	getTest(): Promise<{ id: string, type: string, parameters: any }> {
		const xhttp = new XMLHttpRequest();
		const promise = this.create(xhttp)

		xhttp.open("GET", "/api/test", true);
		xhttp.send();

		return promise
	}

	postTest(stateId: string, result: any): Promise<{ id: string, type: string, parameters: any }> {
		const xhttp = new XMLHttpRequest();
		const promise = this.create(xhttp)

		xhttp.open("POST", "/api/test", true);
		xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhttp.send(JSON.stringify({
			stateId: stateId,
			result: result
		}));

		return promise
	}

	putReset(): Promise<{ id: string, type: string, parameters: any }> {
		const xhttp = new XMLHttpRequest();
		const promise = this.create(xhttp)

		xhttp.open("PUT", "/api/reset", true);
		xhttp.send();

		return promise
	}
}
