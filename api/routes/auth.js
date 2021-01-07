const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth")
const userFunction = require("../controllers/loginSignup")
const surveyController = require("../controllers/survey")


router.get('/otp', authController.sendOtp)
router.post('/otp', authController.checkOtp)
router.patch('/password', authController.newPassword)
router.post('/login', userFunction.login)
router.post('/register', userFunction.register)
router.post('/resetPasswordEmail', userFunction.resetPasswordEmail)
router.post('/passwordUpdateConfirmation', userFunction.passwordUpdateConfirmation)
router.post('/saveQuestion', surveyController.saveQuestion)
router.post('/updateQuestion', surveyController.updateQuestion)
router.get('/getDailySurvey', surveyController.getDailySurvey)
router.get('/getWeeklySurvey', surveyController.getWeeklySurvey)
router.get('/getMonthlySurvey', surveyController.getMonthlySurvey)


module.exports = router