// imports
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');

const auth = require('./api/routes/auth');
const ques = require("./api/routes/question");
const survey = require("./api/routes/survey");

// database URIs
const maindb = 'mongodb+srv://durgesh07:934521796@cluster0.zr3jl.mongodb.net/PGP?authSource=admin&replicaSet=atlas-a4xj7z-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true';
const localdb = 'mongodb://localhost:27017/tmp?readPreference=primary&appname=MongoDB%20Compass&ssl=false';

// connecting to database
mongoose.connect(maindb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on("connected", () => {
    console.log("Database connected")
})

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