// imports
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv').config()
require("./api/utils/init_mongodb")

const auth = require('./api/routes/auth');
const ques = require("./api/routes/question");
const survey = require("./api/routes/survey");

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use('/api/v1/auth/', auth)
app.use("/api/v1/questions", ques)
app.use("/api/v1/survey", survey)

module.exports = app;