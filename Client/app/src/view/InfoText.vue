<template>
	<div class="screen">
		<div class="card title">
			<h1 v-if="viewModel.title">{{ viewModel.title }}</h1>
			<p class="info-text-description" v-if="description" v-html="description"></p>
		</div>
		<button
			v-if="viewModel.nextLabel"
			@click="viewModel.next()">
			{{ viewModel.nextLabel }}
		</button>
	</div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from "vue-property-decorator";
import {InfoTextModel} from "src/viewmodel/InfoTextModel";
import DOMPurify from "dompurify";
import marked from "marked";

@Component
export default class InfoText extends Vue {

	@Prop() readonly parameters: any

	private viewModel = new InfoTextModel(this.parameters)

	private get description() {
		try {
			return DOMPurify.sanitize(marked(this.viewModel.description, { breaks: true }))
		} catch (error) {
			return null
		}
	}

	@Watch('viewModel.result')
	private onResult(result: any) {
		this.$emit('result', result)
	}
};
</script>

<style scoped>
.screen {
	display: flex;
	flex-direction: column;
}

.title {
	box-sizing: border-box;
	width: 800px;
}

.title h1 {
	padding: 20px 40px;
	text-align: center;
}

.title p {
	padding: 40px 40px;
	text-align: justify;
	color: var(--color_on_surface_variant);
}

button {
	margin-top: 20px;
	align-self: flex-end;
}
</style>

<style>
.info-text-description *:not(:last-child) {
	margin-bottom: 16px;
}
</style>
