const mongoose = require("mongoose");

const queSchema = mongoose.Schema({
    surveyType: String,
    active: Boolean,
    question: String,
    questionNumber: String,
    type: String, // text, text fields, radio button, check box 
    options: Array
}, {
    timestamps: true
});

module.exports = mongoose.model('Survey Questions', queSchema);