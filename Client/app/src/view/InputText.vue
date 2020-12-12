<template>
	<div class="screen">
		<div class="card title">
			<h1 v-if="viewModel.title">{{ viewModel.title }}</h1>
			<p v-if="viewModel.description">{{ viewModel.description }}</p>
		</div>

		<div class="card inputs">
			<label v-for="(label, index) of viewModel.inputLabels" :key="index">
				{{ label }}
				<input
					type="text"
					:value="viewModel.getInputValue(index)"
					@input="viewModel.setInputValue(index, $event.target.value)"/>
			</label>
		</div>

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

.title {
	box-sizing: border-box;
	width: 500px;
}

.title h1 {
	padding: 20px 40px;
	text-align: center;
}

.title p {
	padding: 40px 40px;
	text-align: center;
	color: var(--color_on_surface_variant);
}

.inputs {
	box-sizing: border-box;
	width: 500px;
	margin-top: 20px;
	display: flex;
	flex-direction: column;
}

.inputs label {
	position: relative;
	display: flex;
	flex-direction: column;
	text-align: center;
	padding: 15px 15px;
}

.inputs label input {
	padding: 10px 10px;
	font-weight: 300;
	font-size: 18px;
	text-align: center;
	border-radius: 8px;
	color: var(--color_primary);
	background: var(--color_surface);
	border: none;
	outline: none;
}

button {
	margin-top: 20px;
	align-self: flex-end;
}
</style>
