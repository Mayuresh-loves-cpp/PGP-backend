/*************************************************
 * 
 * database schema for survey response
 * 
 *************************************************/

// importing mongoose
const mongoose = require("mongoose");

// survey response schema structure
const responseSchema = mongoose.Schema({
    userID: mongoose.Types.ObjectId,
    surveyDate: Date,
    surveyType: String,
    response: Array
}, {
    timestamps: true
});

// exporting schema
module.exports = mongoose.model('Survey Responses', responseSchema);