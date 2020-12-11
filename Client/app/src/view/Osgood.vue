<template>
	<div class="screen">
		<h1 class="card title">{{ viewModel.title }}</h1>

		<div v-for="pair of viewModel.pairs">
			{{ pair.first }}
			<label v-for="value of viewModel.size" :key="value">
				<input type="radio" :value="value" v-model="pair.value"/>
			</label>
			{{ pair.second }}
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
import {OsgoodModel} from "src/viewmodel/OsgoodModel";

@Component
export default class Osgood extends Vue {

	@Prop() readonly parameters: any

	private viewModel = new OsgoodModel(this.parameters)

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
	padding: 20px 60px;
	text-align: center;
}

button {
	margin-top: 20px;
	align-self: flex-end;
}
</style>
