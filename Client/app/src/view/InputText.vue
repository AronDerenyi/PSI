<template>
	<div>
		<h1>{{ viewModel.title }}</h1>
		<p>{{ viewModel.description }}</p>

		<label v-for="(label, index) of viewModel.inputLabels" :key="index">
			<p>{{ label }}</p>
			<input
				type="text"
				:value="viewModel.getInputValue(index)"
				@input="viewModel.setInputValue(index, $event.target.value)"/>
		</label>

		<button @click="viewModel.next()">{{ viewModel.nextLabel }}</button>
	</div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from "vue-property-decorator";
import {InputTextModel} from "src/viewmodel/InputTextModel";

@Component
export default class InputText extends Vue {

	@Prop() readonly parameters: any

	private viewModel = new InputTextModel(this.parameters)

	@Watch('viewModel.result')
	private onResult(result: any) {
		this.$emit('result', result)
	}
};
</script>

<style scoped>

</style>
