const mongoose = require("mongoose");

const queSchema = mongoose.Schema({
    surveyType: String,
    active: Boolean,
    required: Boolean,
    question: String,
    questionNumber: String,
    type: String, // short answer, long answer, radio button, check box, option table
    options: Array
}, {
    timestamps: true
});

module.exports = mongoose.model('Survey Questions', queSchema);