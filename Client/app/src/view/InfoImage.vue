<template>
	<div>
		<h1>{{ viewModel.title }}</h1>
		<p>{{ viewModel.src }}</p>
		<p>{{ viewModel.progress }}</p>
		<button v-if="viewModel.showNext" @click="viewModel.next()">Folytatás</button>
	</div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from "vue-property-decorator";
import {InfoImageModel} from "src/viewmodel/InfoImageModel";
import {InfoTextModel} from "src/viewmodel/InfoTextModel";

@Component
export default class InfoImage extends Vue {

	@Prop() readonly parameters: any

	private viewModel = new InfoImageModel(this.parameters)

	@Watch('viewModel.result')
	private onResult(result: any) {
		this.$emit('result', result)
	}
};
</script>

<style scoped>

</style>
