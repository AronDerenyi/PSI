module.exports = function State(
	transitions,
	screenType,
	screenParameterFactory
) {

	this.isEnding = () => {
		return !transitions
	}

	this.getScreenType = () => {
		return screenType
	}

	this.getScreenParameters = (env) => {
		if (typeof screenParameterFactory === "object") {
			return screenParameterFactory
		} else {
			return screenParameterFactory(env)
		}
	}

	this.next = (env) => {
		if (this.ending) {
			throw "The state is an ending state."
		} else if (typeof transitions === "string") {
			return transitions
		} else {
			let nextStateId

			for (let stateId in transitions) {
				if (transitions[stateId](env)) {
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
