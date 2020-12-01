<template>
	<h1>{{viewModel.title}}</h1>
</template>

<script lang="ts">
	import {Vue, Component} from "vue-property-decorator";
	import {AppModel} from "../viewmodel/AppModel";

	@Component
	export default class InfoText extends Vue {

		private viewModel = new AppModel()
	};
</script>

<style scoped>

</style>
