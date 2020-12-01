<template>
	<div class="app" :key="viewModel.id">
		<component
			class="screen" :v-if="screen" :is="screen"
			:parameters="viewModel.parameters"
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
		switch (this.viewModel.type) {
			case 'info-text': return InfoText
			case 'info-image': return InfoImage
			case 'info-video': return InfoVideo
			case 'input-options': return InputOptions
			case 'input-text': return InputText
			case 'input-slider': return InputSlider
			case 'likert': return Likert
			case 'osgood': return Osgood
			default: return null
		}
	}
};
</script>

<style scoped>
.app {

}

.screen {

}
</style>
