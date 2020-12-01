<template>
	<div>
		<h1>Input Options</h1>
		<div v-for="option in viewModel.optionCount" :key="option">
			<input type="radio" :id="option" :value="option" v-model="viewModel.selectedOption"/>
			<label :for="option">{{ viewModel.optionNames[option - 1] }}</label>
		</div>
		<button @click="viewModel.next()">Folytatás</button>
	</div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from "vue-property-decorator";
import {InputOptionsModel} from "src/viewmodel/InputOptionsModel";

@Component
export default class InputOptions extends Vue {

	@Prop() readonly parameters: any

	private viewModel = new InputOptionsModel(this.parameters)

	@Watch('viewModel.result')
	private onResult(result: { readonly selected: string }) {
		this.$emit('result', result)
	}
};
</script>

<style scoped>
input[type=radio] {
	display: none
}

input[type=radio]:checked + label {
	color: red
}

input[type=radio]:checked + label::after {
	content: "✓";
}
</style>
