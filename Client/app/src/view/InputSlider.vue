<template>
	<div>
		<h1>Input Slider</h1>
		<button @click="$emit('result')">next</button>
	</div>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import {InputSliderModel} from "src/viewmodel/InputSliderModel";

@Component
export default class InputSlider extends Vue {

	private viewModel = new InputSliderModel()
};
</script>

<style scoped>

</style>
