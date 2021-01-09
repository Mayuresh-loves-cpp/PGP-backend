const Question = require("../models/surveyQueSchema")
const Response = require("../models/surveyResponseSchema")

var mongoose = require('mongoose');
const {
    findByIdAndUpdate,
    createIndexes
} = require("../models/surveyQueSchema");

module.exports = {
    saveq: async (data) => {
        const result = await Question.create(data)
        return result
    },
    updateq: async (id) => {
        const result = await Question.findByIdAndUpdate(id, {
            $set: {
                active: false
            }
        })
        return result
    },
    saveres: async (data) => {
        const result = await Response.create(data)
        return result
    },
    isSurveyExist: async (data) => {
        const result = Response.findOne(data)
        return result
    },
}