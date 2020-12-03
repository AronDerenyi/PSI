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

const test = require('./test/PSITest')

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
	initializeSession(test),
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
