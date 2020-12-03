module.exports = function Test(
	states,
	firstStateIdProvider,
	resultsProvider
) {

	this.states = states

	this.getFirstStateId = () => firstStateIdProvider()
	this.getResults = () => resultsProvider()
}
