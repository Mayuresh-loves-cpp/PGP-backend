const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth")


router.get('/otp', authController.sendOtp)
router.post('/otp', authController.checkOtp)
router.patch('/password', authController.newPassword)


module.exports = router