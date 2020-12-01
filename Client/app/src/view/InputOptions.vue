<template>
	<div>
		<h1>Input Options</h1>
		<button @click="$emit('result')">next</button>
	</div>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import {InputOptionsModel} from "src/viewmodel/InputOptionsModel";

@Component
export default class InputOptions extends Vue {

	private viewModel = new InputOptionsModel()
};
</script>

<style scoped>

</style>
