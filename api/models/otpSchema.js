const mongoose = require("mongoose");

const otpSchema = mongoose.Schema({
    userId: String,
    userEmailId: String,
    userOtp: String
});

module.exports = mongoose.model('otp', otpSchema);