const express = require("express");
const router = express.Router();

const surveyController = require("../controllers/survey")

// survey routes
router.post('/getSurvey', surveyController.getSurvey)
router.post('/saveResponse', surveyController.saveResponse)
router.post('/surveyStatus', surveyController.surveyStatus)

module.exports = router