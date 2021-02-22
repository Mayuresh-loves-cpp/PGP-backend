const Question = require("../models/surveyQueSchema")
const Response = require("../models/surveyResponseSchema")

var mongoose = require('mongoose');
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
            res.json({
                success: true,
                data: data,
            });
        } else {
            res.json({
                success: false,
                data: null
            });
            res.status(500).send();
        }
    },
    // isSurveyExist: async (responseID, uID, res) => {
    //     Date.prototype.getWeek = function () {
    //         var onejan = new Date(this.getFullYear(), 0, 1);
    //         return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    //     }
    //     const date = new Date()
    //     const result = await Response.findOne({
    //         _id: responseID,
    //         userID: uID
    //     })
    //     const today = new Date(parseInt(date.getFullYear()), parseInt(date.getMonth()), parseInt(date.getDate()))
    //     console.log("found " + result.surveyType + " survey")
    //     console.log("today's date: " + today)
    //     var week = result.surveyDate.getWeek();
    //     var month = result.surveyDate.getMonth();
    //     var year = result.surveyDate.getFullYear();
    //     if (result == null) {
    //         return null
    //     } else if (result.surveyDate < today) {
    //         if (result.surveyType == "daily") {
    //             return {
    //                 surveyType: result.surveyType
    //             }
    //         } else if (result.surveyType == "weekly" && year <= today.getFullYear()) {
    //             if (week < today.getWeek()) {
    //                 return {
    //                     surveyType: result.surveyType
    //                 }
    //             } else {
    //                 return null
    //             }
    //         } else if (result.surveyType == "monthly" && year <= today.getFullYear()) {
    //             if (month < today.getMonth()) {
    //                 return {
    //                     surveyType: result.surveyType
    //                 }
    //             } else {
    //                 return null
    //             }
    //         } else {
    //             return null
    //         }
    //     } else if (result.surveyDate == today) {
    //         return null
    //     } else {
    //         res.json({
    //             success: false,
    //             response: "no recent " + result.surveyType + " survey exists!",
    //         })
    //         res.status(500).send()
    //     }
    // },
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
        // .sort({
        //     surveyDate: -1
        // })
        console.log("type of response " + typeof result)
        result = result.sort((a, b) => {
            return b.createdAt - a.createdAt
        })
        result = result[0]
        console.log("result going to be used for processing: ", result)
        if (result == undefined) {
            console.log("sending null from upper if condition")
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
    }
}