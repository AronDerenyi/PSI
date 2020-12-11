<template>
	<div class="screen">
		<div class="card title">
			<h1>{{ viewModel.title }}</h1>
			<p>{{ viewModel.description }}</p>
		</div>

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
.screen {
	display: flex;
	flex-direction: column;
}

.title h1 {
	padding: 20px 60px;
	text-align: center;
}

.title p {
	padding: 40px 40px;
	text-align: center;
}

button {
	margin-top: 20px;
	align-self: flex-end;
}
</style>
