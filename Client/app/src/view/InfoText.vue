<template>
<div class="screen">
	<div class="card content">
		<h1 v-if="viewModel.title">{{ viewModel.title }}</h1>
		<p class="info-text-description" v-if="description" v-html="description"></p>
	</div>
	<div class="buttons">
		<button v-if="viewModel.negativeLabel" @click="viewModel.next(viewModel.negativeId)">
			{{ viewModel.negativeLabel }}
		</button>
		<button v-if="viewModel.positiveLabel" @click="viewModel.next(viewModel.positiveId)">
			{{ viewModel.positiveLabel }}
		</button>
	</div>
</div>
</template>

<script lang="ts">
import {
	Vue,
	Component,
	Prop,
	Watch
} from "vue-property-decorator";

import {
	InfoTextModel
} from "src/viewmodel/InfoTextModel";

import DOMPurify from "dompurify";
import marked from "marked";

@Component
export default class InfoText extends Vue {

	@Prop() readonly parameters: any

	private viewModel = new InfoTextModel(this.parameters)

	private get description() {
		try {
			return DOMPurify.sanitize(marked(this.viewModel.description, {
				breaks: true
			}))
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

.content {
	box-sizing: border-box;
	width: 800px;
}

.content h1 {
	padding: 20px 40px;
	text-align: center;
}

.content p {
	padding: 40px 40px;
	text-align: justify;
	color: var(--color_on_surface_variant);
}

.buttons {
	margin-top: 20px;

	display: flex;
	justify-content: flex-end;
}

.buttons *:not(:first-child) {
	margin-left: 20px;
}
</style>

<style>
.info-text-description *:not(:last-child) {
	margin-bottom: 16px;
}
</style>
