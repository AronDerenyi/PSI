<template>
	<div class="screen">
		<div class="card title">
			<h1 v-if="viewModel.title">{{ viewModel.title }}</h1>
			<p v-if="viewModel.description">{{ viewModel.description }}</p>
		</div>

		<label class="card slider">
			{{ viewModel.minValue }}
			<input
				type="range" step="1"
				:min="viewModel.minValue"
				:max="viewModel.maxValue"
				v-model="viewModel.selectedValue"/>
			{{ viewModel.maxValue }}
		</label>

		<button
			:class="{invisible: !viewModel.showNext}"
			@click="viewModel.next()">
			{{ viewModel.nextLabel }}
		</button>
	</div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from "vue-property-decorator";
import {InputSliderModel} from "src/viewmodel/InputSliderModel";

@Component
export default class InputSlider extends Vue {

	@Prop() readonly parameters: any

	private viewModel = new InputSliderModel(this.parameters)

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
	color: var(--color_on_surface_variant);
}

.slider {
	width: 400px;
	margin-top: 20px;
	display: flex;
	align-items: center;
	padding: 20px;
}

.slider input {
	flex-grow: 1;
	height: 24px;
	margin-left: 20px;
	margin-right: 20px;
	-webkit-appearance: none;
	appearance: none;
	border-radius: 12px;
	background: var(--color_surface);
	box-shadow: 0 0 6px var(--color_shadow) inset;
	outline: none;
}

.slider input::-webkit-slider-thumb {
	width: 24px;
	height: 24px;
	-webkit-appearance: none;
	appearance: none;
	border-radius: 100%;
	background: var(--color_surface_variant);
	box-shadow: 0 0 6px var(--color_shadow);
	border: none;
}

.slider input::-moz-range-thumb {
	width: 24px;
	height: 24px;
	border-radius: 100%;
	background: var(--color_surface_variant);
	box-shadow: 0 0 6px var(--color_shadow);
	border: none;
}

button {
	margin-top: 20px;
	align-self: flex-end;
}
</style>
