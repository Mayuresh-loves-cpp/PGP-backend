/*************************************************
 * 
 * api routes for authentication apis
 * 
 *************************************************/

// imports
const express = require("express");
const auth = require("../controllers/auth");
const router = express.Router();
const authController = require("../controllers/auth")
const userFunction = require("../controllers/loginSignup")
const checkUser = require("../middlewares/checkUser")

// authentication routes

// otp routes
router.get('/otp', authController.sendOtp)
router.post('/otp', authController.checkOtp)
// new password route
router.patch('/password', authController.newPassword)
// login & signup route
router.post('/login', userFunction.login)
router.post('/register', userFunction.register)
router.post('/additionalInfo', checkUser.checkUser, userFunction.additionalInfo)
// reset passsword route
// router.post('/resetPasswordEmail', userFunction.resetPasswordEmail)
// routes for updating data
router.patch('/updateInfo', checkUser.checkUser, authController.updateUserInfo)
router.patch('/updatePassword', checkUser.checkUser, authController.upadtePassword)
router.patch('/updateEmail', checkUser.checkUser, authController.updateEmail)

module.exports = router