<template>
	<div>
		<h1>Likert</h1>
		<button @click="$emit('result')">next</button>
	</div>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import {LikertModel} from "src/viewmodel/LikertModel";

@Component
export default class Likert extends Vue {

	private viewModel = new LikertModel()
};
</script>

<style scoped>

</style>
