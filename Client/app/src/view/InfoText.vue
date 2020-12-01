<template>
	<div>
		<h1>{{ viewModel.title }}</h1>
		<p>{{ viewModel.text }}</p>
		<button @click="viewModel.next()">Folytatás</button>
	</div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from "vue-property-decorator";
import {InfoTextModel} from "src/viewmodel/InfoTextModel";
import {InputOptionsModel} from "src/viewmodel/InputOptionsModel";

@Component
export default class InfoText extends Vue {

	@Prop() readonly parameters: any

	private viewModel = new InfoTextModel(this.parameters)

	@Watch('viewModel.result')
	private onResult(result: any) {
		this.$emit('result', result)
	}
};
</script>

<style scoped>

</style>
