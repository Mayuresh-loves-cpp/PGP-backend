/*************************************************
 * 
 * api routes for question opeartions
 * 
 *************************************************/

// imports
const express = require("express");
const router = express.Router();

// importing controller
const surveyController = require("../controllers/survey")

// question operational routes
router.post('/saveQuestion', surveyController.saveQuestion)
router.post('/updateQuestion', surveyController.updateQuestion)

module.exports = router