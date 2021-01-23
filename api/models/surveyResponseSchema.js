const mongoose = require("mongoose");

const responseSchema = mongoose.Schema({
    userID: mongoose.Types.ObjectId,
    surveyDate: Date,
    surveyType: String,
    response: Array
}, {
    timestamps: true
});

module.exports = mongoose.model('Survey Responses', responseSchema);