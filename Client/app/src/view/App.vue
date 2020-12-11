<template>
	<div class="app" :key="viewModel.stateId">
		<component
			class="screen" v-if="screen" :is="screen"
			:parameters="viewModel.screenParameters"
			@result="viewModel.onResult($event)"/>
	</div>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import {AppModel} from "../viewmodel/AppModel";
import InfoText from "src/view/InfoText.vue";
import InfoImage from "src/view/InfoImage.vue";
import InfoVideo from "src/view/InfoVideo.vue";
import InputOptions from "src/view/InputOptions.vue";
import InputText from "src/view/InputText.vue";
import InputSlider from "src/view/InputSlider.vue";
import Likert from "src/view/Likert.vue";
import Osgood from "src/view/Osgood.vue";

@Component
export default class App extends Vue {

	private viewModel = new AppModel()

	get screen(): typeof Vue {
		switch (this.viewModel.screenType) {
			case 'info_text':
				return InfoText
			case 'info_image':
				return InfoImage
			case 'info_video':
				return InfoVideo
			case 'input_options':
				return InputOptions
			case 'input_text':
				return InputText
			case 'input_slider':
				return InputSlider
			case 'likert':
				return Likert
			case 'osgood':
				return Osgood
			default:
				return null
		}
	}
};
</script>

<style scoped>
.app {
	width: 100%;
	min-height: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.screen {
	width: 800px;
	margin: 48px;
}
</style>
