<template>
	<h1>Info Image</h1>
</template>

<script lang="ts">
	import {Vue, Component} from "vue-property-decorator";
	import {InfoImageModel} from "src/viewmodel/InfoImageModel";

	@Component
	export default class InfoImage extends Vue {

		private viewModel = new InfoImageModel()
	};
</script>

<style scoped>

</style>
