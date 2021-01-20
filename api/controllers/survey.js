/**
 * operational apis for survey
 */

// importing database
const questionSchema = require("../models/surveyQueSchema");

// importing survey helper functions
const {
    saveq,
    updateq,
    saveres,
    getSurvey,
    sendSurvey,
    isSurveyExist
} = require("../utils/surveyHelper")

// api routes
module.exports = {
    saveQuestion: (req, res, next) => {
        try {
            // const recevedQuestion = new questionSchema({
            //     surveyType: req.body.surveyType,
            //     question: req.body.question,
            //     questionNumber: req.body.questionNumber,
            //     type: req.body.type,
            //     options: req.body.options
            // });
            const state = saveq(req.body);

            if (state) {
                console.log("new question added!");
                res.json({
                    success: true
                });
            } else {
                console.log(error);
                res.json({
                    success: false
                });
                res.status(500).send();
            }
        } catch (error) {
            console.log(error);
            res.json({
                success: false
            });
            res.status(404).send();
        }
    },
    updateQuestion: async (req, res, next) => {
        const id = req.body._id;
        const newQues = req.body.newQuesData;
        try {
            const result = await updateq(id);
            if (result) {
                res.status(200);
                res.json({
                    success: true
                });
                console.log('question updated!');
            } else {
                res.status(404);
                res.json({
                    success: false
                });
                console.log('error updating question!');
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                error: "Server error"
            })
        }

        console.log(newQues);
        // adding new question in data base
        try {
            const state = saveq(newQues);

            if (state) {
                console.log("new question added!");
                res.json({
                    success: true
                });
            } else {
                console.log(error);
                res.json({
                    success: false
                });
                res.status(500).send();
            }
        } catch (error) {
            console.log(error);
            res.json({
                success: false
            });
            res.status(404).send();
        }
    },
    getDailySurvey: async (req, res, next) => {
        try {
            const doc = await getSurvey("daily")
            sendSurvey(doc, res)

        } catch (error) {
            console.log(error)
            res.json({
                success: false,
                data: null
            })
            res.status(404).send();
        }


        // const data = JSON.parse(JSON.stringify(doc));
        // if (doc != null) {
        //     res.json({
        //         success: true,
        //         data: data,
        //     });
        // } else {
        //     res.json({
        //         success: false,
        //         data: data
        //     });
        //     res.status(500).send();
        // }
    },
    getWeeklySurvey: async (req, res, next) => {
        try {
            const doc = await getSurvey("weekly")
            sendSurvey(doc, res)

        } catch (error) {
            console.log(error)
            res.json({
                success: false,
                data: null
            })
            res.status(404).send();
        }
        // const doc = await getSurvey("weekly");
        // const data = JSON.parse(JSON.stringify(doc));
        // if (doc != null) {
        //     res.json({
        //         success: true,
        //         data: data,
        //     });
        // } else {
        //     res.json({
        //         success: false,
        //         data: data
        //     });
        //     res.status(500).send();
        // }
    },
    getMonthlySurvey: async (req, res, next) => {
        try {
            const doc = await getSurvey("monthly")
            sendSurvey(doc, res)

        } catch (error) {
            console.log(error)
            res.json({
                success: false,
                data: null
            })
            res.status(404).send();
        }
        // const doc = await getSurvey("monthly");
        // const data = JSON.parse(JSON.stringify(doc));
        // if (doc != null) {
        //     res.json({
        //         success: true,
        //         data: data,
        //     });
        // } else {
        //     res.json({
        //         success: false,
        //         data: data
        //     });
        //     res.status(500).send();
        // }
    },
    saveResponse: async (req, res, next) => {
        try {
            const status = await saveres(req.body);
            console.log(status);
            if (status) {
                res.json({
                    success: true,
                    responseID: status._id,
                    createdAt: status.createdAt,
                    updatedAt: status.updatedAt,
                })
                res.status(200).send()
            } else {
                res.json({
                    success: false,
                    responseID: null,
                })
                res.status(500).send()
            }
        } catch (error) {
            res.json({
                success: false,
                responseID: null,
            })
            console.log('failed to save response!')
            res.status(404).send()
        }
    },
    surveyStatus: async (req, res, next) => {
        try {
            const result = await isSurveyExist(req.body)
            if (result) {
                res.json({
                    success: true,
                    response: "recent survey exists!"
                })
                res.status(200).send()
            } else {
                res.json({
                    success: false,
                    response: "no recent survey exists!"
                })
                res.status(500).send()
            }
        } catch (error) {
            console.log(error)
        }
    },
    // add new route api here
}