<template>
	<div class="screen">
		<div class="card title">
			<h1 v-if="viewModel.title">{{ viewModel.title }}</h1>
			<p v-if="viewModel.description">{{ viewModel.description }}</p>
		</div>
		<button @click="viewModel.next()">{{ viewModel.nextLabel }}</button>
	</div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from "vue-property-decorator";
import {InfoTextModel} from "src/viewmodel/InfoTextModel";

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
	white-space: pre-wrap;
	color: var(--color_on_surface_variant);
}

button {
	margin-top: 20px;
	align-self: flex-end;
}
</style>
