<template>
	<h1>Info Text</h1>
</template>

<script lang="ts">
	import {Vue, Component} from "vue-property-decorator";
	import {InfoTextModel} from "src/viewmodel/InfoTextModel";

	@Component
	export default class InfoText extends Vue {

		private viewModel = new InfoTextModel()
	};
</script>

<style scoped>

</style>
