<template>
	<div class="screen">
		<div class="card">
			<h1>{{ viewModel.title }}</h1>
			<p>{{ viewModel.description }}</p>
		</div>

		<div class="card video-card">
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

h1 {
	padding: 20px 60px;
}

p {
	padding: 40px 40px;
}

.video-card {
	position: relative;
	margin-top: 20px;
	display: block;
}

video {
	width: 100%;
	display: block;
}

button {
	margin-top: 20px;
	align-self: flex-end;
}
</style>
