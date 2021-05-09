// imports
const User = require("../models/user");
const Otp = require("../models/otpSchema");
var mongoose = require('mongoose');
const {
    findByIdAndUpdate
} = require("../models/user");

mongoose.set('useFindAndModify', false)

// exporting helper functions
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
        const result = await User.findOne({
            _id: uID
        })
        console.log("checking if user exist!")
        console.log("result after finding user in account's db: ", result)
        return result
    },
    updateInfo: async (id, toUpdate) => {
        const result = await User.findByIdAndUpdate(id, toUpdate)
        return result
    },
    checkPassword: async (userID, password) => {
        const doc = await User.findById(userID)
        if (doc) {
            console.log('check password user: ', doc)
            const areSame = await doc.validPassword(password, doc.password)
            console.log('in check password areSame: ', areSame)
            if (areSame) {
                return doc
            } else {
                return null
            }
        } else {
            return null
        }
    },
    updatePassword: async (userID, password) => {
        const doc = await User.findById(userID)
        if (doc) {
            doc.password = password
            const result = await doc.save()
            return result
        } else {
            return null
        }
    },
    updateEmail: async (userID, emailID) => {
        const doc = await User.findOne({
            _id: userID
        });
        const doc1 = await User.findOne({
            userEmailId: emailID
        })
        if (doc.userEmailId == emailID) {
            return "same emailID"
        } else if (doc1) {
            return "user with given emailID exist in DB"
        } else if (doc) {
            const result = await User.findByIdAndUpdate(userID, {
                userEmailId: emailID
            })
            return result
        } else {
            return null
        }
    },
    // add new helper function here
}