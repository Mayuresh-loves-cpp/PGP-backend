// imports
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');

const newAuth = require('./api/routes/auth');

// connecting to database
mongoose.connect('mongodb+srv://durgesh07:934521796@cluster0.zr3jl.mongodb.net/PGP?authSource=admin&replicaSet=atlas-a4xj7z-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true', {
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

app.use('/api/v1/auth/', newAuth)

module.exports = app;