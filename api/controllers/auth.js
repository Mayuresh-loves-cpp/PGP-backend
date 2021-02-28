const sendMail = require('../utils/mail')
const {
    generateOtp,
    checkUserExist,
    saveOtp,
    checkOtp,
    updateInfo,
    checkPassword,
    updatePassword,
} = require('../utils/helper')

const user = require('../models/user')

const {
    mongo,
    Mongoose
} = require('mongoose')

const {
    passwordSchema,
} = require('../utils/validationSchema')

module.exports = {
    sendOtp: async (req, res, next) => {
        try {
            console.log("send otp", req.query)
            const userExist = await checkUserExist(req.query.email)
            if (userExist) {
                const otp = generateOtp()
                const mailResponse = await sendMail(req.query.email, otp)
                if (mailResponse) {
                    const result = await saveOtp(userExist._id, otp)
                    if (result) {
                        return res.status(201).json({
                            success: true,
                            data: {
                                id: userExist._id
                            }
                        })
                    } else {
                        return res.status(500).json({
                            success: false,
                            err: "Something went wrong"
                        })
                    }
                }
            } else {
                return res.status(404).json({
                    success: false,
                    err: "User not found"
                })
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                err: "Server error"
            })
        }
    },
    checkOtp: async (req, res, next) => {
        try {
            console.log("check otp", req.body)
            const {
                id,
                otp
            } = req.body
            const result = await checkOtp(id, otp)
            console.log(result)
            if (result) {
                return res.status(201).json({
                    success: true
                })
            } else {
                return res.status(400).json({
                    success: false
                })
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                err: "Server error"
            })
        }
    },
    newPassword: async (req, res, next) => {
        try {
            console.log("reset password", req.body)
            const {
                userID,
                password
            } = req.body
            const result = await updatePassword(userID, password)
            if (result) {
                return res.status(201).json({
                    success: true
                })
            } else {
                return res.status(400).json({
                    success: false
                })
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                err: "Server error"
            })
        }
    },
    updateUserInfo: async (req, res, next) => {
        try {
            const {
                userID,
                update
            } = req.body
            if (checkUserExist(userID)) {
                const result = await updateInfo(userID, update)
                if (result) {
                    console.log('user:', userID, 'has been found & data successfully updated')
                    res.status(200).json({
                        success: true,
                        message: "user exists and data sucessfully updated"
                    }).send()
                } else {
                    console.log('user:', userID, 'data didn\'t get updated')
                    res.status(500).json({
                        success: false,
                        message: "user exist and data isn't updated"
                    }).send()
                }
            } else {
                console.log('user:', userID, 'doesn\'t exist')
                res.status(500).json({
                    success: false,
                    message: "user does not exist"
                }).send()
            }

        } catch (error) {
            console.log(error)
            console.log("recived wrong information!")
            res.status(404).json({
                success: false,
                message: 'recived wrong information'
            }).send()
        }
    },
    checkPassword: async (req, res, next) => {
        try {
            const {
                userID,
                password
            } = req.body
            const result = await checkPassword(userID, password)
            if (result) {
                console.log("user:", userID, "with given password exist in database")
                res.status(200).json({
                    success: true,
                    message: "user with given id and password exist"
                })
            } else {
                console.log("user:", userID, "with given password doesn't exist in database")
                res.status(200).json({
                    success: false,
                    message: "user with given id and password doesn't exist"
                })
            }
        } catch (error) {
            console.log(error)
            res.status(404).json({
                success: false,
                message: "incorrect information"
            })
        }
    },
    // add new api here
}