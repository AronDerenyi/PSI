<template>
	<div class="screen">
		<h1 class="card title">{{ viewModel.title }}</h1>

		<div v-for="question of viewModel.questions" class="card question" :key="question.question">
			<p>{{ question.question }}</p>
			<label v-for="(label, index) of viewModel.labels" :key="index + 1">
				<input type="radio" :value="index + 1" v-model="question.answer"/>
				<p>{{ index + 1 }}</p>
				{{ label }}
			</label>
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
import {LikertModel} from "src/viewmodel/LikertModel";

@Component
export default class Likert extends Vue {

	@Prop() readonly parameters: any

	private viewModel = new LikertModel(this.parameters)

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

.question {
	width: 600px;
	margin-top: 20px;
	display: flex;
	flex-wrap: wrap;
	padding: 20px;
}

.question > p {
	width: 100%;
	padding: 0 40px;
	margin-bottom: 20px;
	text-align: center;
}

.question label {
	flex-basis: 0;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	padding: 5px 5px;
	color: var(--color_on_surface_variant);
	font-size: 14px;
}

.question label input {
	display: none;
}

.question label p {
	/*width: 40px;*/
	/*height: 40px;*/
	text-align: center;
	/*background: var(--color_surface);*/
	color: var(--color_on_surface);
	font-size: 24px;
	transition: all 0.2s;
}

.question label:hover p {
	/*background: var(--color_surface_variant);*/
	transform: scale(1.4);
	/*box-shadow: 0 6px 24px var(--color_shadow);*/
}

.question label input:checked + p {
	/*background: var(--color_surface_variant);*/
	color: var(--color_primary);
	transform: scale(1.4);
	/*box-shadow: 0 6px 24px var(--color_shadow);*/
}

button {
	margin-top: 20px;
	align-self: flex-end;
}
</style>
