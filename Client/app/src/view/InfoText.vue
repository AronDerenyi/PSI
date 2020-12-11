<template>
	<div class="screen">
		<div class="card">
			<h1>{{ viewModel.title }}</h1>
			<p>{{ viewModel.description }}</p>
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

h1 {
	padding: 20px 60px;
}

p {
	padding: 40px 40px;
}

button {
	margin-top: 20px;
	align-self: flex-end;
}
</style>
