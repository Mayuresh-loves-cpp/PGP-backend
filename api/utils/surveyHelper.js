const Question = require("../models/surveyQueSchema")
const Response = require("../models/surveyResponseSchema")

var mongoose = require('mongoose');
const {
    findByIdAndUpdate,
    createIndexes
} = require("../models/surveyQueSchema");
const survey = require("../controllers/survey");

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
    getSurvey: async (type) => {
        console.log('survey type to find ' + type)
        const doc = await Question.find({
            surveyType: type,
            active: true
        });
        console.log(doc)
        return doc
    },
    sendSurvey: async (survey, res) => {
        if (survey != null) {
            const data = JSON.parse(JSON.stringify(survey));
            res.json({
                success: true,
                data: data,
            });
        } else {
            res.json({
                success: false,
                data: data
            });
            res.status(500).send();
        }
    },
    isSurveyExist: async (data) => {
        const result = Response.findOne(data)
        return result
    },
}