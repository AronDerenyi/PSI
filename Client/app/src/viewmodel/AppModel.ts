import Vue from "vue";

export class AppModel {

	readonly id: string = null
	readonly type: string = null
	readonly parameters: any = null

	constructor() {
		this.next()
	}

	onResult(result: any) {
		if (result) console.log(JSON.parse(JSON.stringify(result)))
		this.next()
	}

	private next() {
		switch (this.id) {
			case null:
				this.navigateToInfoText()
				break
			case 'inft':
				this.navigateToInfoImage()
				break
			case 'infi':
				this.navigateToInfoVideo()
				break
			case 'infv':
				this.navigateToInputOptions()
				break
			case 'inpo':
				this.navigateToInputText()
				break
			case 'inpt':
				this.navigateToInputSlider()
				break
			case 'inps':
				this.navigateToLikert()
				break
			case 'lik':
				this.navigateToOsgood()
				break
		}
	}

	private navigateToInfoText() {
		Vue.set(this, 'id', 'inft')
		Vue.set(this, 'type', 'info_text')
		Vue.set(this, 'parameters', {
			title: "Text Title",
			description: "Some text that is here",
			next: "Next"
		})
	}

	private navigateToInfoImage() {
		Vue.set(this, 'id', 'infi')
		Vue.set(this, 'type', 'info_image')
		Vue.set(this, 'parameters', {
			title: "Image Title",
			description: "Wait a second and observe the image",
			next: "Next",
			source: "https://peach.blender.org/wp-content/uploads/poster_rodents_small.jpg",
			waitingTime: 1000
		})
	}

	private navigateToInfoVideo() {
		Vue.set(this, 'id', 'infv')
		Vue.set(this, 'type', 'info_video')
		Vue.set(this, 'parameters', {
			title: "Video Title",
			description: "Watch the video",
			next: "Next",
			source: "https://www.w3schools.com/html/mov_bbb.mp4"
		})
	}


	private navigateToInputOptions() {
		Vue.set(this, 'id', 'inpo')
		Vue.set(this, 'type', 'input_options')
		Vue.set(this, 'parameters', {
			title: "Options Title",
			description: "Select an option:",
			next: "Next",
			options: [
				{id: "a", name: "Option A"},
				{id: "b", name: "Option B"},
				{id: "c", name: "Option C"},
				{id: "d", name: "Option D"}
			]
		})
	}

	private navigateToInputText() {
		Vue.set(this, 'id', 'inpt')
		Vue.set(this, 'type', 'input_text')
		Vue.set(this, 'parameters', {})
	}

	private navigateToInputSlider() {
		Vue.set(this, 'id', 'inps')
		Vue.set(this, 'type', 'input_slider')
		Vue.set(this, 'parameters', {})
	}


	private navigateToLikert() {
		Vue.set(this, 'id', 'lik')
		Vue.set(this, 'type', 'likert')
		Vue.set(this, 'parameters', {})
	}

	private navigateToOsgood() {
		Vue.set(this, 'id', 'osg')
		Vue.set(this, 'type', 'osgood')
		Vue.set(this, 'parameters', {})
	}
}
