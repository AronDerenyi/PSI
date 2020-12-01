<template>
	<h1>Input Text</h1>
</template>

<script lang="ts">
	import {Vue, Component} from "vue-property-decorator";
	import {InputTextModel} from "src/viewmodel/InputTextModel";

	@Component
	export default class InputText extends Vue {

		private viewModel = new InputTextModel()
	};
</script>

<style scoped>

</style>
