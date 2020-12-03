<template>
	<div class="screen">
		<h1>{{ viewModel.title }}</h1>
		<p>{{ viewModel.description }}</p>
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
	align-items: center;
}

h1 {
	width: 300px;
	padding-bottom: 48px;
}

p {
	max-width: 500px;
	padding-bottom: 48px;
}

button {
	align-self: flex-end;
}
</style>
