<template>
	<div>
		<h1>{{ viewModel.title }}</h1>
		<p>{{ viewModel.description }}</p>

		<label v-for="(label, index) of viewModel.optionLabels" :key="index">
			<input type="radio" :value="index" v-model="viewModel.selectedOption"/>
			<p>{{ label }}</p>
		</label>

		<button v-if="viewModel.showNext" @click="viewModel.next()">{{ viewModel.nextLabel }}</button>
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
