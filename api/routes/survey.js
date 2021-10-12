/*************************************************
 * 
 * api routes for survey opeartions
 * 
 *************************************************/

// imports
const express = require("express");
const router = express.Router();

// importing controller
const surveyController = require("../controllers/survey")

// survey routes
router.post('/getSurvey', surveyController.getSurvey)
router.post('/saveResponse', surveyController.saveResponse)
router.post('/surveyStatus', surveyController.surveyStatus)
router.post('/saveQuestion', surveyController.saveQuestion)
router.post('/addOptionSet', surveyController.addOptionSet)
router.post('/getFirstQuestions', surveyController.getFirstQuestions)

module.exports = router