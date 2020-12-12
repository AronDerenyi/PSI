<template>
	<div class="screen">
		<div class="card title">
			<h1 v-if="viewModel.title">{{ viewModel.title }}</h1>
			<p v-if="viewModel.description">{{ viewModel.description }}</p>
		</div>

		<div class="card video">
			<video
				controls
				class="card"
				:src="viewModel.source"
				@ended="viewModel.videoFinished()"></video>
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
.screen {
	display: flex;
	flex-direction: column;
}

.title {
	width: 800px;
}

.title h1 {
	padding: 20px 60px;
	text-align: center;
}

.title p {
	padding: 40px 40px;
	text-align: center;
	color: var(--color_on_surface_variant);
}

.video {
	position: relative;
	margin-top: 20px;
	display: block;
}

.video video {
	width: 800px;
	display: block;
}

button {
	margin-top: 20px;
	align-self: flex-end;
}
</style>
