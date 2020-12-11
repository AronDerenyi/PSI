<template>
	<div class="screen">
		<div class="card title">
			<h1>{{ viewModel.title }}</h1>
			<p>{{ viewModel.description }}</p>
		</div>

		<div class="card image">
			<img :src="viewModel.source" alt="image"/>
			<div class="progress" :style="{width: (viewModel.progress * 100) + '%'}"></div>
		</div>

		<button
			:class="{invisible: !viewModel.showNext}"
			@click="viewModel.next()">
			{{ viewModel.nextLabel }}
		</button>
	</div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from "vue-property-decorator";
import {InfoImageModel} from "src/viewmodel/InfoImageModel";

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
.screen {
	display: flex;
	flex-direction: column;
}

.title h1 {
	padding: 20px 60px;
	text-align: center;
}

.title p {
	padding: 40px 40px;
	text-align: center;
}

.image {
	position: relative;
	margin-top: 20px;
	display: block;
}

.image img {
	width: 100%;
	display: block;
}

.progress {
	position: absolute;
	bottom: 0;
	left: 0;
	height: 5px;
	background: var(--color_primary);
}

button {
	margin-top: 20px;
	align-self: flex-end;
}
</style>
