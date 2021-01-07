const mongoose = require("mongoose");

const queSchema = mongoose.Schema({
    surveyType: String,
    active: Boolean,
    question: String,
    questionNumber: String,
    type: String,
    options: Array
}, {
    timestamps: true
});

module.exports = mongoose.model('Survey Questions', queSchema);