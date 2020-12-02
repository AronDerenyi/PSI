<template>
	<div>
		<h1>{{ viewModel.title }}</h1>
		<p>{{ viewModel.description }}</p>

		<label>
			{{ viewModel.minValue }}
			<input
				type="range" step="1"
				:min="viewModel.minValue"
				:max="viewModel.maxValue"
				v-model="viewModel.selectedValue"/>
			{{ viewModel.maxValue }}
		</label>

		<button v-if="viewModel.showNext" @click="viewModel.next()">{{ viewModel.nextLabel }}</button>
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

</style>
