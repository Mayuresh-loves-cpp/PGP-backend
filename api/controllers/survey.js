/*************************************************
 *
 * operational apis for survey
 *
 *************************************************/

// importing survey helper functions
const {
    saveq,
    updateq,
    saveres,
    getSurvey,
    sendSurvey,
    isSurveyExist,
    shuffleOptions,
    saveOptionSet,
    getFirst2Questions,
    isUserResposneExist,
} = require("../utils/surveyHelper");

// importing other helper functions
const { checkExistByID } = require("../utils/helper");
const user = require("../models/user");

// importing validation schemeas
const { questionSchema } = require("../utils/validationSchema");

// api routes
module.exports = {
    saveQuestion: async (req, res, next) => {
        try {
            // const recevedQuestion = new questionSchema({
            //     surveyType: req.body.surveyType,
            //     question: req.body.question,
            //     questionNumber: req.body.questionNumber,
            //     type: req.body.type,
            //     options: req.body.options
            // });
            const result = await questionSchema.validateAsync(req.body);
            console.log(result);
            const state = saveq(req.body);
            if (state) {
                console.log("new question added!");
                res.json({
                    success: true,
                });
            } else {
                console.log(error);
                res.json({
                    success: false,
                });
                res.status(500).send();
            }
        } catch (error) {
            console.log(error);
            if (error.isJoi === true) {
                res.status(422)
                    .json({
                        success: false,
                        message: "improper data recived",
                    })
                    .send();
            } else {
                res.status(400)
                    .json({
                        success: false,
                    })
                    .send();
            }
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
                    success: true,
                });
                console.log("question updated!");
            } else {
                res.status(404);
                res.json({
                    success: false,
                });
                console.log("error updating question!");
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                error: "Server error",
            });
        }

        console.log(newQues);
        // adding new question in data base
        try {
            const state = saveq(newQues);

            if (state) {
                console.log("new question added!");
                res.json({
                    success: true,
                });
            } else {
                console.log(error);
                res.json({
                    success: false,
                });
                res.status(500).send();
            }
        } catch (error) {
            console.log(error);
            res.json({
                success: false,
            });
            res.status(404).send();
        }
    },
    getSurvey: async (req, res, next) => {
        try {
            console.log("res local user", res.locals.user);
            if (res.locals.user) {
                if (
                    req.body.surveyType == "daily" ||
                    req.body.surveyType == "weekly" ||
                    req.body.surveyType == "monthly"
                ) {
                    var doc = await getSurvey(req.body.surveyType);
                    if (req.body.surveyType == "daily") {
                        doc = shuffleOptions(doc, [1, 2]);
                    }
                    if (req.body.surveyType == "weekly") {
                        doc = shuffleOptions(doc, [1, 2]);
                    }
                    sendSurvey(doc, res);
                } else {
                    console.log("unknown surveytype requested!");
                    res.status(403).json({
                        success: false,
                        data: null,
                    });
                }
            } else {
                console.log("invalid token!");
                res.status(403).json({
                    success: false,
                    data: null,
                    message: "invalid token",
                });
            }
        } catch (error) {
            console.log(error);
            res.status(400)
                .json({
                    success: false,
                    data: null,
                })
                .send();
        }
    },
    getDailySurvey: async (req, res, next) => {
        try {
            const doc = await getSurvey("daily");
            sendSurvey(doc, res);
        } catch (error) {
            console.log(error);
            res.json({
                success: false,
                data: null,
            });
            res.status(404).send();
        }
    },
    getWeeklySurvey: async (req, res, next) => {
        try {
            const doc = await getSurvey("weekly");
            sendSurvey(doc, res);
        } catch (error) {
            console.log(error);
            res.json({
                success: false,
                data: null,
            });
            res.status(404).send();
        }
    },
    getMonthlySurvey: async (req, res, next) => {
        try {
            const doc = await getSurvey("monthly");
            sendSurvey(doc, res);
        } catch (error) {
            console.log(error);
            res.json({
                success: false,
                data: null,
            });
            res.status(404).send();
        }
    },
    saveResponse: async (req, res, next) => {
        try {
            if (res.locals.user) {
                const date = new Date();
                const doc = {
                    userID: req.body.userID,
                    surveyDate: new Date(
                        parseInt(date.getFullYear()),
                        parseInt(date.getMonth()),
                        parseInt(date.getDate())
                    ),
                    surveyType: req.body.surveyType,
                    response: req.body.response,
                };
                console.log(
                    "saving user: " +
                        doc.userID +
                        " has given " +
                        doc.surveyType +
                        " survey at " +
                        doc.surveyDate
                );
                const status = await saveres(doc);
                console.log(status);
                if (status) {
                    res.status(200)
                        .json({
                            success: true,
                            responseID: status._id,
                            createdAt: status.createdAt,
                            updatedAt: status.updatedAt,
                        })
                        .send();
                } else {
                    res.status(500)
                        .json({
                            success: false,
                            responseID: null,
                        })
                        .send();
                }
            } else {
                console.log("invalid token!");
                res.status(403).json({
                    success: false,
                    message: "invalid token",
                });
            }
        } catch (error) {
            res.json({
                success: false,
                responseID: null,
            });
            console.log("failed to save response!");
            res.status(404).send();
        }
    },
    surveyStatus: async (req, res, next) => {
        try {
            if (res.locals.user) {
                const result = [];
                const userExist = await checkExistByID(req.body.userID);
                if (userExist) {
                    console.log("user info: ", userExist);
                    console.log(
                        "user " +
                            userExist.firstName +
                            " exist in user's database!"
                    );
                    const responseExist = await isUserResposneExist(
                        req.body.userID
                    );
                    if (responseExist) {
                        console.log("user have given some responses already!");
                        const dailyStatus = await isSurveyExist(
                            req.body.userID,
                            "daily"
                        );
                        console.log("daily status recived is: ", dailyStatus);
                        if (dailyStatus != null) {
                            result.push(dailyStatus);
                        }
                        const weeklyStatus = await isSurveyExist(
                            req.body.userID,
                            "weekly"
                        );
                        console.log("weekly status recived is: ", weeklyStatus);
                        if (weeklyStatus != null) {
                            result.push(weeklyStatus);
                        }
                        const monthlyStatus = await isSurveyExist(
                            req.body.userID,
                            "monthly"
                        );
                        console.log(
                            "monthly status recived is: ",
                            monthlyStatus
                        );
                        if (monthlyStatus != null) {
                            result.push(monthlyStatus);
                        }
                        if (result) {
                            res.json({
                                success: true,
                                response: "recent survey exists!",
                                surveys: result,
                            });
                            res.status(200).send();
                        } else {
                            res.json({
                                success: false,
                                response: "no recent survey exists!",
                            });
                            res.status(500).send();
                        }
                    } else {
                        res.status(200).json({
                            success: true,
                            response: "user have given no surveys!",
                            surveys: [
                                {
                                    surveyType: "daily",
                                },
                                {
                                    surveyType: "weekly",
                                },
                                {
                                    surveyType: "monthly",
                                },
                            ],
                        });
                    }
                } else {
                    res.status(404).json({
                        success: false,
                        response: "this user doesn't exist in database",
                    });
                }
                console.log("displaying result at end: ", result);
            } else {
                console.log("invalid token!");
                res.status(403).json({
                    success: false,
                    message: "invalid token",
                });
            }
        } catch (error) {
            console.log(error);
            res.json({
                success: false,
            });
            res.status(400);
        }
    },
    addOptionSet: async (req, res, next) => {
        try {
            if (req.body) {
                const result = await saveOptionSet(req.body);
                if (result) {
                    console.log("new option set saved successfully!");
                    res.json({
                        success: true,
                    });
                    res.status(200).send();
                } else {
                    console.log("unable to save option set!");
                    res.json({
                        success: false,
                    });
                    res.status(400).send();
                }
            }
        } catch (error) {
            console.log(error);
            res.json({
                success: false,
            });
            res.status(400).send();
        }
    },
    getFirstQuestions: async (req, res, next) => {
        try {
            if (req.body.userID) {
                const data = await getFirst2Questions();
                if (data) {
                    res.json({
                        success: true,
                        data: data,
                    });
                    res.status(200).send();
                } else {
                    res.json({
                        success: false,
                        data: null,
                    });
                    res.status(400).send();
                }
            }
        } catch (error) {
            res.json({
                success: false,
                data: null,
            });
            res.status(500).send();
        }
    },
    saveQuestoionResponse: async (req, res) => {
        try {
            const { userID, surveyType, questioResponse } = req.body;
            const userResponse = await isUserResposneExist(userID);
            if (userResponse) {
            }
        } catch (error) {}
    },
    getSurveyQuestionsAll: async (req, res, next) => {
        try {
            if (res.locals.user) {
                const result = [];
                const userExist = await checkExistByID(req.body.userID);
                if (userExist) {
                    console.log("user info: ", userExist);
                    console.log(
                        "user " +
                            userExist.firstName +
                            " exist in user's database!"
                    );
                    const responseExist = await isUserResposneExist(
                        req.body.userID
                    );
                    if (responseExist) {
                        console.log("user have given some responses already!");
                        const dailyStatus = await isSurveyExist(
                            req.body.userID,
                            "daily"
                        );
                        console.log("daily status recived is: ", dailyStatus);
                        if (dailyStatus != null) {
                            result.push(dailyStatus);
                        }
                        const weeklyStatus = await isSurveyExist(
                            req.body.userID,
                            "weekly"
                        );
                        console.log("weekly status recived is: ", weeklyStatus);
                        if (weeklyStatus != null) {
                            result.push(weeklyStatus);
                        }
                        const monthlyStatus = await isSurveyExist(
                            req.body.userID,
                            "monthly"
                        );
                        console.log(
                            "monthly status recived is: ",
                            monthlyStatus
                        );
                        if (monthlyStatus != null) {
                            result.push(monthlyStatus);
                        }
                        if (result) {
                            var questions = [];
                            for (i in result) {
                                const ques = await getSurvey(
                                    result[i].surveyType
                                );
                                questions.push(...ques);
                            }
                            sendSurvey(questions, res);
                        } else {
                            sendSurvey(undefined, res);
                        }
                    } else {
                        var questions = [];
                        for (i in result) {
                            console.log("i is", i);
                            const ques = await getSurvey(result[i].surveyType);
                            questions.push(...ques);
                        }
                        console.log("questions are:", questions);
                        sendSurvey(questions, res);
                    }
                } else {
                    res.status(404).json({
                        success: false,
                        response: "this user doesn't exist in database",
                    });
                }
                console.log("displaying result at end: ", result);
            } else {
                console.log("invalid token!");
                res.status(403).json({
                    success: false,
                    message: "invalid token",
                });
            }
        } catch (error) {
            console.log(error);
            res.json({
                success: false,
            });
            res.status(400);
        }
    },
    // add new route api here
};
