const questionSchema = require("../models/surveyQueSchema");

const { saveq } = require("../utils/surveyHelper")

module.exports = {
    saveQuestion: (req, res, next) => {
        try {
            const recevedQuestion = new questionSchema({
                surveyType: req.body.surveyType,
                question: req.body.question,
                questionNumber: req.body.questionNumber,
                type: req.body.type,
                options: req.body.options
            });
            const state = saveq(recevedQuestion);

            if(state){
                console.log("new question added!");
                res.json({
                    success: true
                });
            }
            else{
                console.log(error);
                res.json({
                    success: false
                });
                res.status(500).send();
            }
            /*recevedQuestion.save().then(result => {
                    console.log(result);
                })
                .catch(error => {
                    console.log(error);
                    res.status(500).send();
                });
            console.log("new question added!");
            res.json({
                success: true
            });*/
        } catch (error) {
            console.log(error);
            res.json({
                success: false
            });
            res.status(404).send();
        }
    },
    updateQuestion: async (req, res, next) => {
        const doc = req.body;
        questionSchema.findOne({
            questionNumber: doc["questionNumber"],
            surveyType: doc["surveyType"]
        }, function (err, foundObject) {
            if (err) {
                console.log(err);
                res.json({
                    success: false
                });
                res.status(500).send();
            } else {
                if (!foundObject) {
                    res.json({
                        success: false
                    });
                    res.status(404).send();
                } else {
                    if (req.body.question) {
                        foundObject.question = req.body.question;
                    }
                    foundObject.save(function (err, updatedObject) {
                        if (err) {
                            console.log(err);
                            res.json({
                                success: false
                            });
                            res.status(500).send();
                        } else {
                            console.log("question updated!")
                            res.json({
                                success: true
                            });
                        }
                    });
                }
            }
        });
    },
    getDailySurvey: async (req, res, next) => {
        const doc = await questionSchema.find({
            surveyType: "daily"
        });
        const data = JSON.parse(JSON.stringify(doc));
        if (doc != null) {
            res.json({
                success: true,
                data: data
            });
        } else {
            res.json({
                success: false,
                data: data
            });
            res.status(500).send();
        }
    },
    getWeeklySurvey: async (req, res, next) => {
        const doc = await questionSchema.findOne({
            surveyType: "weekly"
        });
        const data = JSON.parse(JSON.stringify(doc));
        if (doc != null) {
            res.json({
                success: true,
                data: data
            });
        } else {
            res.json({
                success: false,
                data: data
            });
            res.status(500).send();
        }
    },
    getDailySurvey: async (req, res, next) => {
        const doc = await questionSchema.find({
            surveyType: "daily"
        });
        const data = JSON.parse(JSON.stringify(doc));
        if (doc != null) {
            res.json({
                success: true,
                data: data
            });
        } else {
            res.json({
                success: false,
                data: data
            });
            res.status(500).send();
        }
    },
    getMonthlySurvey: async (req, res, next) => {
        const doc = await questionSchema.findOne({
            surveyType: "Monthly"
        });
        const data = JSON.parse(JSON.stringify(doc));
        if (doc != null) {
            res.json({
                success: true,
                data: data
            });
        } else {
            res.json({
                success: false,
                data: data
            });
            res.status(500).send();
        }
    },
    // add new route api here
}