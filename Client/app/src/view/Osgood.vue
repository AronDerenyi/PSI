<template>
	<div>
		<h1>{{ viewModel.title }}</h1>

		<div v-for="pair of viewModel.pairs">
			{{ pair.first }}
			<label v-for="value of viewModel.size" :key="value">
				<input type="radio" :value="value" v-model="pair.value"/>
			</label>
			{{ pair.second }}
		</div>

		<button v-if="viewModel.showNext" @click="viewModel.next()">{{ viewModel.nextLabel }}</button>
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

</style>
