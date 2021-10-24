/*************************************************
 * 
 * operational apis for authentication
 * 
 *************************************************/
// importing packages
const sendMail = require('../utils/mail')
const {
    mongo,
    Mongoose
} = require('mongoose')

// importing helper functions
const {
    generateOtp,
    checkUserExist,
    saveOtp,
    checkOtp,
    updateInfo,
    checkPassword,
    updatePassword,
    updateEmail
} = require('../utils/helper')

// importing user model
const user = require('../models/user')

// importing validation schemas
const {
    passwordUpdateSchema,
    emailUpdateSchema,
} = require('../utils/validationSchema')

// exporting apis and their code
module.exports = {
    sendOtp: async (req, res, next) => {
        try {
            console.log("send otp", req.query)
            const userExist = await checkUserExist(req.query.email)
            console.log('user data:', userExist)
            if (userExist) {
                const otp = generateOtp()
                console.log('otp generated was:', otp)
                const mailResponse = await sendMail(req.query.email, otp)
                console.log('mail response:', mailResponse)
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
            if (res.locals.user) {
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
                    res.status(404).json({
                        success: false,
                        message: "user does not exist"
                    }).send()
                }
            } else {
                console.log('invalid token!')
                res.status(403).json({
                    success: false,
                    message: "invalid token"
                });
            }
        } catch (error) {
            console.log(error)
            console.log("recived wrong information!")
            res.status(400).json({
                success: false,
                message: 'recived wrong information'
            }).send()
        }
    },
    upadtePassword: async (req, res, next) => {
        try {
            if (res.locals.user) {
                const {
                    userID,
                    oldPassword,
                    newPassword
                } = req.body
                const validationResult = await passwordUpdateSchema.validateAsync(req.body)
                console.log("validation result: ", validationResult)
                const result = await checkPassword(userID, oldPassword)
                console.log('user with old password exist: ', result)
                if (result) {
                    console.log("user:", userID, "with given password exist in database")
                    console.log("updating password")
                    const isSame = await checkPassword(userID, newPassword)
                    if (isSame) {
                        console.log("same old password and new password recived")
                        res.status(409).json({
                            success: false,
                            message: "old password and new password must be different"
                        }).send()
                    } else {
                        const updateResult = await updatePassword(userID, newPassword)
                        if (updateResult) {
                            console.log("password updated sucessfully for user:", userID)
                            res.status(200).json({
                                success: true,
                                message: "password updated sucessfully"
                            }).send()
                        } else {
                            console.log("unable to update password for user:", userID)
                            res.status(500).json({
                                success: false,
                                message: "unable to update password for user"
                            }).send()
                        }
                    }

                } else {
                    console.log("user:", userID, "with given password doesn't exist in database")
                    res.status(404).json({
                        success: false,
                        message: "user with given password doesn't exist in database"
                    }).send()
                }
            } else {
                console.log('invalid token!')
                res.status(403).json({
                    success: false,
                    message: "invalid token"
                });
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                success: false,
                message: "incorrect information"
            }).send()
        }
    },
    updateEmail: async (req, res, next) => {
        try {
            if (res.locals.user) {
                const {
                    userID,
                    newEmail,
                    password
                } = req.body
                const validationResult = await emailUpdateSchema.validateAsync(req.body)
                console.log(validationResult)
                const result = await checkPassword(userID, password)
                if (result) {
                    console.log("user:", userID, "with given password exist in database")
                    console.log("updating email")
                    const updateResult = await updateEmail(userID, newEmail)
                    if (updateResult == "same emailID") {
                        console.log("same old emailID and new emailID recived")
                        res.status(409).json({
                            success: false,
                            message: "same old emailID and new emailID recived"
                        }).send()
                    } else if (updateResult == "user with given emailID exist in DB") {
                        console.log("user with given emailID exist in DB")
                        res.status(409).json({
                            success: false,
                            message: "user with given emailID already exist"
                        }).send()
                    } else if (updateResult) {
                        console.log("email id updated sucessfully for user:", userID)
                        res.status(200).json({
                            success: true,
                            message: "email id updated sucessfully"
                        }).send()
                    } else {
                        console.log("unable to update email id for user:", userID)
                        res.status(500).json({
                            success: false,
                            message: "unable to update email id for user"
                        }).send()
                    }
                } else {
                    console.log("user:", userID, "with given credntials doesn't exist in database")
                    res.status(404).json({
                        success: false,
                        message: "user with given credntials doesn't exist in database"
                    })
                }
            } else {
                console.log('invalid token!')
                res.status(403).json({
                    success: false,
                    message: "invalid token"
                });
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                success: false,
                message: "incorrect information"
            })
        }
    }
    // add new api here
}