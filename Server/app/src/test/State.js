module.exports = function State(
	transitions,
	screenType,
	screenParameters
) {

	this.screenType = screenType
	this.screenParameters = screenParameters
	this.ending = !transitions

	this.next = (results) => {
		if (this.ending) {
			throw "The state is an ending state."
		} else if (typeof transitions === "string") {
			return transitions
		} else {
			let nextStateId

			for (let stateId in transitions) {
				if (transitions[stateId](results)) {
					if (!nextStateId) {
						nextStateId = stateId
					} else {
						throw "Multiple states to go to."
					}
				}
			}

			if (!nextStateId) {
				throw "No state to go to"
			}

			return nextStateId
		}
	}
}
