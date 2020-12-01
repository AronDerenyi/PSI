<template>
	<h1>Info Video</h1>
</template>

<script lang="ts">
	import {Vue, Component} from "vue-property-decorator";
	import {InfoVideoModel} from "src/viewmodel/InfoVideoModel";

	@Component
	export default class InfoVideo extends Vue {

		private viewModel = new InfoVideoModel()
	};
</script>

<style scoped>

</style>
