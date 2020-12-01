<template>
	<div class="app" :key="viewModel.id">
		<InfoText class="screen" v-if="viewModel.type === 'info_text'" :parameters="viewModel.parameters"/>
		<InfoImage class="screen" v-if="viewModel.type === 'info_image'" :parameters="viewModel.parameters"/>
		<InfoVideo class="screen" v-if="viewModel.type === 'info_video'" :parameters="viewModel.parameters"/>
		<InputOptions class="screen" v-if="viewModel.type === 'input_options'" :parameters="viewModel.parameters"/>
		<InputText class="screen" v-if="viewModel.type === 'input_text'" :parameters="viewModel.parameters"/>
		<InputSlider class="screen" v-if="viewModel.type === 'input_slider'" :parameters="viewModel.parameters"/>
		<Likert class="screen" v-if="viewModel.type === 'likert'" :parameters="viewModel.parameters"/>
		<Osgood class="screen" v-if="viewModel.type === 'osgood'" :parameters="viewModel.parameters"/>
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

@Component({
	components: {
		InfoText,
		InfoImage,
		InfoVideo,
		InputOptions,
		InputText,
		InputSlider,
		Likert,
		Osgood
	}
})
export default class App extends Vue {

	private viewModel = new AppModel()
};
</script>

<style scoped>
.app {

}

.screen {

}
</style>
