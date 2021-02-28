// imports
const express = require("express");
const auth = require("../controllers/auth");
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
router.patch('/updateInfo', authController.updateUserInfo)
router.patch('/updatePassword', authController.upadtePassword)
router.patch('/updateEmail', authController.updateEmail)

module.exports = router