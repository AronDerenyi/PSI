const express = require("express");
const bodyParser = require('body-parser');

// Creating the server

const app = express();

// Setting up Express

app.use(bodyParser.urlencoded({extended: true, limit: '5mb'}));
app.use(bodyParser.json({extended: true, limit: '5mb'}));
app.use(express.static('../client/dist'));

// Starting the server

app.listen(process.env.PORT || 80);
