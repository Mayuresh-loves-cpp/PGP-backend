/*************************************************
 *
 * api routes for survey opeartions
 *
 *************************************************/

// imports
// const express = require("express");
const router = require("express").Router();
const checkUser = require("../middlewares/checkUser");

// importing controller
const surveyController = require("../controllers/survey");
const {
    getSurvey,
    saveResponse,
    surveyStatus,
    saveQuestion,
    addOptionSet,
    getFirstQuestions,
    saveQuestoionResponse,
} = require("../controllers/survey");

// survey routes
router.post("/getSurvey", checkUser.checkUser, getSurvey);
router.post("/saveResponse", checkUser.checkUser, saveResponse);
router.post("/surveyStatus", checkUser.checkUser, surveyStatus);
router.post("/saveQuestion", saveQuestion);
router.post("/addOptionSet", addOptionSet);
router.post("/getFirstQuestions", getFirstQuestions);

// exporting router
module.exports = router;