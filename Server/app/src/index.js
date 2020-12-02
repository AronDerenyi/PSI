const express = require("express")
const bodyParser = require('body-parser')
const session = require('express-session')

// Creating the Server

const app = express()

// Setting up Express

app.use(session({
	name: "sid",
	secret: "L9QCCmn82N",
	resave: false,
	saveUninitialized: true,
	cookie: {
		secure: false,
		maxAge: 1000 * 60 * 60
	},
	store: session.MemoryStore()
}))

app.use(bodyParser.urlencoded({extended: true, limit: '5mb'}))
app.use(bodyParser.json({extended: true, limit: '5mb'}))

app.use(express.static('../Client/dist'))

// Setting up the test

const Test = require('./test/Test')
const State = require('./test/State')

const test = new Test(
	{
		'inft': new State('info_text', {
			title: "Text Title",
			description: "Some text that is here",
			next: "Next"
		}, 'infi'),
		'infi': new State('info_image', {
			title: "Image Title",
			description: "Wait a second and observe the image",
			next: "Next",
			source: "https://peach.blender.org/wp-content/uploads/poster_rodents_small.jpg",
			waitingTime: 1000
		}, 'infv'),
		'infv': new State('info_video', {
			title: "Video Title",
			description: "Watch the video",
			next: "Next",
			source: "https://www.w3schools.com/html/mov_bbb.mp4"
		}, 'inpo'),
		'inpo': new State('input_options', {
			title: "Options Title",
			description: "Select an option:",
			next: "Next",
			options: [
				{id: "a", label: "Option A"},
				{id: "b", label: "Option B"},
				{id: "c", label: "Option C"},
				{id: "d", label: "Option D"}
			]
		}, 'inpt'),
		'inpt': new State('input_text', {
			title: "Text input Title",
			description: "Type something!",
			next: "Next",
			inputs: [
				{id: "a", label: "Input A"},
				{id: "b", label: "Input B"},
				{id: "c", label: "Input C"}
			]
		}, 'inps'),
		'inps': new State('input_slider', {
			title: "Slider Title",
			description: "Sliiiiide",
			next: "Next",
			minValue: 0,
			maxValue: 100
		}, 'lik'),
		'lik': new State('likert', {
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
		}, 'osg'),
		'osg': new State('osgood', {
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
	'inft'
)

// Setting up the routes

const initializeSession = require('./middleware/InitializeSession')
const validateSession = require('./middleware/ValidateSession')
const validateState = require('./middleware/ValidateState')
const updateResults = require('./middleware/UpdateResults')
const updateState = require('./middleware/UpdateState')
const resetSession = require('./middleware/ResetSession')
const returnStateParameters = require('./middleware/ReturnStateParameters')

app.get(
	"/api/test",
	initializeSession(test),
	returnStateParameters(test)
)

app.post(
	"/api/test",
	validateSession(),
	validateState(),
	updateResults(),
	updateState(test),
	returnStateParameters(test)
)

app.put(
	"/api/reset",
	resetSession(),
	initializeSession(test),
	returnStateParameters(test)
)

// Starting the Server

app.listen(process.env.PORT || 80)
