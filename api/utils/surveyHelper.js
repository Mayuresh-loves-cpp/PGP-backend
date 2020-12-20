const question = require("../models/surveyQueSchema")

var mongoose = require('mongoose');
const { findByIdAndUpdate } = require("../models/surveyQueSchema");

module.exports = {
    saveq: async (data) => {
        const result = await question.create(data)
        return result
    },
}