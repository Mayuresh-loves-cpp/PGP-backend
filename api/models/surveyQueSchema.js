/*************************************************
 *
 * database schema for survey questions
 *
 *************************************************/

// importing mongoose
const mongoose = require("mongoose");

// survey question schema structure
const queSchema = mongoose.Schema({
    surveyType: String,
    active: Boolean,
    required: Boolean,
    question: String,
    questionNumber: String,
    type: String, // short answer, long answer, radio button, check box, option table
    options: Array,
}, {
    timestamps: true,
});

// exporting schema
module.exports = mongoose.model("Survey Questions", queSchema);