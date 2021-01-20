const mongoose = require("mongoose");

const responseSchema = mongoose.Schema({
    userID: mongoose.Types.ObjectId,
    //surveyNumber: Number,
    surveyType: String,
    response: Array
}, {
    timestamps: true
});

module.exports = mongoose.model('Survey Responses', responseSchema);