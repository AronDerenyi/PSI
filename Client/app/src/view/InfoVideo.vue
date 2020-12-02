<template>
	<div>
		<h1>{{ viewModel.title }}</h1>
		<p>{{ viewModel.description }}</p>
		<video controls :src="viewModel.source" @ended="viewModel.videoFinished()"></video>
		<button v-if="viewModel.showNext" @click="$emit('result')">{{ viewModel.nextLabel }}</button>
	</div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from "vue-property-decorator";
import {InfoVideoModel} from "src/viewmodel/InfoVideoModel";

@Component
export default class InfoVideo extends Vue {

	@Prop() readonly parameters: any

	private viewModel = new InfoVideoModel(this.parameters)

	@Watch('viewModel.result')
	private onResult(result: any) {
		this.$emit('result', result)
	}
};
</script>

<style scoped>

</style>
