const express = require("express");
const router = express.Router();

const surveyController = require("../controllers/survey")

// question database routes
router.post('/saveQuestion', surveyController.saveQuestion)
router.post('/updateQuestion', surveyController.updateQuestion)

module.exports = router