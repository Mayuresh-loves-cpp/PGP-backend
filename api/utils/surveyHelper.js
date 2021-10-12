/*************************************************
 * 
 * helper functions for survey operational apis
 * 
 *************************************************/

// importing schemas
const Question = require("../models/surveyQueSchema")
const Response = require("../models/surveyResponseSchema")
const OptionSet = require("../models/optionsSchema")

// imports
var mongoose = require('mongoose');
const survey = require("../controllers/survey");

////////////////////////////////////////////////////////////////////////
// required functions
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1))
        var temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array
}
////////////////////////////////////////////////////////////////////////

// exporting helper functions
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
        if (type == "" || type == undefined) {
            return null
        }
        console.log('survey type to find ' + type)
        const doc = await Question.find({
            surveyType: type,
            active: true
        });
        console.log(doc)
        return doc
    },
    sendSurvey: async (survey, res) => {
        if (survey != null || survey != undefined) {
            const data = JSON.parse(JSON.stringify(survey));
            res.status(200).json({
                success: true,
                data: data,
            });
        } else {
            res.json({
                success: false,
                data: null
            });
            res.status(404).send();
        }
    },
    isSurveyExist: async (uID, survey) => {
        Date.prototype.getWeek = function () {
            var onejan = new Date(this.getFullYear(), 0, 1);
            return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
        }
        const date = new Date()
        const today = new Date(parseInt(date.getFullYear()), parseInt(date.getMonth()), parseInt(date.getDate()))
        var result = await Response.find({
            userID: uID,
            surveyType: survey,
        }).exec()
        console.log("type of response " + typeof result)
        result = result.sort((a, b) => {
            return b.createdAt - a.createdAt
        })
        result = result[0]
        console.log("result going to be used for processing: ", result)
        if (result == undefined) {
            return {
                surveyType: survey
            }
        }
        if (result == null) {
            return {
                surveyType: survey
            }
        }
        console.log(survey + " result is: " + result.surveyDate)
        var week = result.createdAt.getWeek();
        var month = result.createdAt.getMonth();
        var year = result.createdAt.getFullYear();
        console.log("showing type of result: " + typeof result)
        console.log("calculating survey info")
        console.log("last survey given by the user is on: ", result.surveyDate)
        if (result == null) {
            return null
        } else if (result.surveyDate < today) {
            if (result.surveyType == "daily") {
                return {
                    surveyType: result.surveyType
                }
            } else if (result.surveyType == "weekly" && year <= today.getFullYear()) {
                if (week < today.getWeek()) {
                    return {
                        surveyType: result.surveyType
                    }
                } else {
                    return null
                }
            } else if (result.surveyType == "monthly" && year <= today.getFullYear()) {
                if (month < today.getMonth()) {
                    return {
                        surveyType: result.surveyType
                    }
                } else {
                    return null
                }
            } else {
                return null
            }
        } else if (result.surveyDate == today) {
            return null
        } else {
            return null
        }
    },
    isUserExist: async (uID) => {
        const result = await Response.find({
            userID: uID,
        })
        return result
    },
    shuffleOptions: (questions, indicesToExclude) => {
        for (var i = 0; i < questions.length; i++) {
            if (!(i in indicesToExclude)) {
                if (questions[i].options.length) {
                    questions[i].options = shuffleArray(questions[i].options)
                }
            }
        }
        return questions
    },
    saveOptionSet: async (optionSet) => {
        return await OptionSet.create(optionSet)
    },
    getFirst2Questions: async () => {
        const doc = await Question.find({
            surveyType: "daily",
            active: true
        })
        doc.sort((a, b) => {
            return  a.questionNumber - b.questionNumber
        })
        doc = [doc[0], doc[1]]
        console.log('1st 2 questions going to be returned are: ', doc)
        return doc
    },
    // add new helper function here
}