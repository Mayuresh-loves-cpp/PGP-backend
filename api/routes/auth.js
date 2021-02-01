// imports
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth")
const userFunction = require("../controllers/loginSignup")

// authentication routes
router.get('/otp', authController.sendOtp)
router.post('/otp', authController.checkOtp)
router.patch('/password', authController.newPassword)
router.post('/login', userFunction.login)
router.post('/register', userFunction.register)
router.post('/resetPasswordEmail', userFunction.resetPasswordEmail)
router.post('/passwordUpdateConfirmation', userFunction.passwordUpdateConfirmation)

module.exports = router