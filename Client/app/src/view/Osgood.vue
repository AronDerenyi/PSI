<template>
	<div>
		<h1>Osgood</h1>
		<button @click="$emit('result')">next</button>
	</div>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import {OsgoodModel} from "src/viewmodel/OsgoodModel";

@Component
export default class Osgood extends Vue {

	private viewModel = new OsgoodModel()
};
</script>

<style scoped>

</style>
