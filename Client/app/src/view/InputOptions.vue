<template>
	<h1>Input Options</h1>
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
