<template>
	<div class="screen">
		<div class="card title">
			<h1 v-if="viewModel.title">{{ viewModel.title }}</h1>
			<p v-if="viewModel.description">{{ viewModel.description }}</p>
		</div>

		<div class="card options">
			<label v-for="(label, index) of viewModel.optionLabels" :key="index">
				{{ label }}
				<input type="radio" :value="index" v-model="viewModel.selectedOption"/>
				<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
					<path d="M0 0h24v24H0z" fill="none"/>
					<path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
				</svg>
			</label>
		</div>

		<button
			v-if="viewModel.nextLabel"
			:class="{invisible: !viewModel.showNext}"
			@click="viewModel.next()">
			{{ viewModel.nextLabel }}
		</button>
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

.options {
	box-sizing: border-box;
	width: 500px;
	margin-top: 20px;
	display: flex;
	flex-direction: column;
}

.options label {
	position: relative;
	text-align: center;
	padding: 15px 30px;
}

.options label:not(:first-child):after {
	content: "";
	position: absolute;
	top: 0;
	left: 8%;
	right: 8%;
	height: 1px;
	background: var(--color_on_surface);
	opacity: 0.2;
}

.options label input[type=radio] {
	display: none
}

.options label input[type=radio] + svg {
	position: absolute;
	top: 50%;
	right: 10px;
	fill: var(--color_primary);
	opacity: 0;
	transform: translateY(-100%);
	transition: opacity 0.2s, transform 0.2s;
}

.options label:hover input[type=radio] + svg {
	transform: translateY(-50%);
	opacity: 0.5;
}

.options label input[type=radio]:checked + svg {
	transform: translateY(-50%);
	opacity: 1;
}

button {
	margin-top: 20px;
	align-self: flex-end;
}
</style>
