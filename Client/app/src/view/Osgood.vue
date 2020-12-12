<template>
	<div class="screen">
		<h1 v-if="viewModel.title" class="card title">{{ viewModel.title }}</h1>

		<div v-for="pair of viewModel.pairs" class="card pair" :key="pair.first + pair.second">
			<p>{{ pair.first }}</p>
			<label v-for="value of viewModel.size" :key="value">
				<input type="radio" :value="value" v-model="pair.value"/>
				<div></div>
			</label>
			<p>{{ pair.second }}</p>
		</div>

		<button
			v-if="viewModel.nextLabel"
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
	box-sizing: border-box;
	width: 700px;
	padding: 20px 40px;
	text-align: center;
}

.pair {
	box-sizing: border-box;
	width: 700px;
	margin-top: 20px;
	display: flex;
	align-items: center;
	padding: 20px;
}

.pair p {
	flex-basis: 0;
	flex-grow: 1;
	text-align: center;
}

.pair label {
	margin-left: 6px;
	margin-right: 6px;
}

.pair label input {
	display: none
}

.pair label div {
	width: 20px;
	height: 20px;
	border-radius: 100%;
	background: var(--color_on_surface);
	transition: transform 0.2s, opacity 0.2s;
	opacity: 0.2;
}

.pair label:hover div {
	transform: scale(1.4);
}

.pair label input:checked + div {
	transform: scale(1.4);
	background: var(--color_primary);
	opacity: 1;
}

button {
	margin-top: 20px;
	align-self: flex-end;
}
</style>
