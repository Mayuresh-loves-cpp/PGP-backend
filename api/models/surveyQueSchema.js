const mongoose = require("mongoose");

const queSchema = mongoose.Schema({
    surveyType: String,
    question: String,
    questionNumber: String,
    type: String,
    options: Array
});

module.exports = mongoose.model('Survey Questions', queSchema);