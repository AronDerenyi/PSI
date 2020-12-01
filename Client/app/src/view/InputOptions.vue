<template>
	<div>
		<h1>{{ viewModel.title }}</h1>

		<label v-for="(optionName, optionIndex) of viewModel.optionNames" :key="optionIndex">
			<input type="radio" :value="optionIndex" v-model="viewModel.selectedOption"/>
			<p>{{ optionName }}</p>
		</label>

		<button v-if="viewModel.showNext" @click="viewModel.next()">Folytatás</button>
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
	private onResult(result: any) {
		this.$emit('result', result)
	}
};
</script>

<style scoped>
input[type=radio] {
	display: none
}

input[type=radio]:checked + p {
	color: red
}

input[type=radio]:checked + p::after {
	content: "✓";
}
</style>
