const User = require("../models/user");
const Otp = require("../models/otpSchema");
var mongoose = require('mongoose');
const {
    findByIdAndUpdate
} = require("../models/user");


module.exports = {
    generateOtp: () => {
        const otp = Math.floor(1000 + Math.random() * 9000);
        return otp
    },
    checkUserExist: async (email) => {
        const user = await User.findOne({
            userEmailId: email
        })
        return user
    },
    saveOtp: async (id, otp) => {
        const userId = mongoose.Types.ObjectId(id);
        const result = await Otp.create({
            userId,
            userOtp: otp
        })
        return result
    },
    checkOtp: async (id, otp) => {
        const userId = mongoose.Types.ObjectId(id);
        const result = await Otp.findOne({
            userId,
            userOtp: otp
        })
        return result
    },
    checkExistByID: async (uID) => {
        const result = await User.findOne({_id: uID})
        console.log("checking if user exist!")
        console.log("result after finding user in account's db: ", result)
        return result
    },
    updateInfo: async (id, toUpdate) => {
        mongoose.set('useFindAndModify', false)
        const result = await User.findByIdAndUpdate(id, toUpdate)
        return result
    },
}