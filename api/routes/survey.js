/*************************************************
 * 
 * api routes for survey opeartions
 * 
 *************************************************/

// imports
const express = require("express")
const router = express.Router()
const checkUser = require('../middlewares/checkUser')

// importing controller
const surveyController = require("../controllers/survey")

// survey routes
router.post('/getSurvey', checkUser.checkUser, surveyController.getSurvey)
router.post('/saveResponse', checkUser.checkUser, surveyController.saveResponse)
router.post('/surveyStatus', checkUser.checkUser, surveyController.surveyStatus)
router.post('/saveQuestion', surveyController.saveQuestion)
router.post('/addOptionSet', surveyController.addOptionSet)
router.post('/getFirstQuestions', surveyController.getFirstQuestions)

module.exports = router