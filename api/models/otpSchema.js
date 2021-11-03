/*************************************************
 *
 * database schema for otp
 *
 *************************************************/

// importing mongoose
const mongoose = require("mongoose");

// otp schema structure
const otpSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    userOtp: String,
});

// exporting schema
module.exports = mongoose.model("otp", otpSchema);