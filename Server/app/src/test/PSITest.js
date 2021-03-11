const Test = require('./Test')
const State = require('./State')

module.exports = new Test(
	{
		'inft': new State('infi', 'info_text', {
			title: "Text Title",
			description: "Some text that is here",
			positive: "Next"
		}),
		'infi': new State('infv', 'info_image', {
			title: "Image Title",
			description: "Wait a second and observe the image",
			next: "Next",
			source: "https://peach.blender.org/wp-content/uploads/poster_rodents_small.jpg",
			waitingTime: 1000
		}),
		'infv': new State('inpo', 'info_video', {
			title: "Video Title",
			description: "Watch the video",
			next: "Next",
			source: "https://www.w3schools.com/html/mov_bbb.mp4"
		}),
		'inpo': new State('inpt', 'input_options', {
			title: "Options Title",
			description: "Select an option:",
			next: "Next",
			options: [
				{id: "a", label: "Option A"},
				{id: "b", label: "Option B"},
				{id: "c", label: "Option C"},
				{id: "d", label: "Option D"}
			]
		}),
		'inpt': new State('inps', 'input_text', {
			title: "Text input Title",
			description: "Type something!",
			next: "Next",
			inputs: [
				{id: "a", label: "Input A"},
				{id: "b", label: "Input B"},
				{id: "c", label: "Input C"}
			]
		}),
		'inps': new State('lik', 'input_slider', {
			title: "Slider Title",
			description: "Sliiiiide",
			next: "Next",
			minValue: 0,
			maxValue: 100
		}),
		'lik': new State('osg', 'likert', {
			title: "Likert Title",
			next: "Next",
			pageSize: 3,
			random: true,
			labels: [
				'strongly disagree',
				'disagree',
				'neutral',
				'agree',
				'strongly agree'
			],
			questions: [
				{id: 'a', question: 'Question A'},
				{id: 'b', question: 'Question B'},
				{id: 'c', question: 'Question C'},
				{id: 'd', question: 'Question D'},
				{id: 'e', question: 'Question E'},
				{id: 'f', question: 'Question F'},
				{id: 'g', question: 'Question G'},
				{id: 'h', question: 'Question H'}
			]
		}),
		'osg': new State(null, 'osgood', {
			title: "Osgood Title",
			next: "Next",
			pageSize: 3,
			random: true,
			size: 6,
			pairs: [
				{id: 'a', first: 'First A', second: 'Second A'},
				{id: 'b', first: 'First B', second: 'Second B'},
				{id: 'c', first: 'First C', second: 'Second C'},
				{id: 'd', first: 'First D', second: 'Second D'},
				{id: 'e', first: 'First E', second: 'Second E'},
				{id: 'f', first: 'First F', second: 'Second F'},
				{id: 'g', first: 'First G', second: 'Second G'},
				{id: 'h', first: 'First H', second: 'Second H'}
			]
		})
	},
	() => 'inft',
	() => ({})
)
