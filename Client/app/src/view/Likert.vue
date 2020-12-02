<template>
	<div>
		<h1>{{ viewModel.title }}</h1>

		<div v-for="question of viewModel.questions">
			<p>{{ question.question }}</p>
			<label v-for="(label, index) of viewModel.labels" :key="index + 1">
				<input type="radio" :value="index + 1" v-model="question.answer"/>
				{{ label }}
			</label>
		</div>

		<button v-if="viewModel.showNext" @click="viewModel.next()">{{ viewModel.nextLabel }}</button>
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

</style>
