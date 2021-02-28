const userSchema = require("../models/user")
const {
    loginSchema,
    registerSchema
} = require('../utils/validationSchema')

module.exports = {
    login: async (req, res, next) => {
        try {
            const result = await loginSchema.validateAsync(req.body)
            console.log("validation result: -\n", result)
            const doc = await userSchema.findOne(result);
            const data = JSON.parse(JSON.stringify(doc));
            if (doc != null) {
                delete data.password;
                console.log("login successful", data)
                res.json({
                    success: true,
                    data: data,
                    message: "login successful",
                });
            } else {
                console.log("user not found", doc)
                res.json({
                    success: false,
                    data: doc,
                    message: "incorrect email id or password",
                });
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                success: false,
                data: null,
                message: "incorrect data format"
            }).send()
        }
    },
    register: async (req, res, next) => {
        try {
            const result = await registerSchema.validateAsync(req.body)
            console.log("validation result: -\n", result)
            const user = new userSchema({
                userEmailId: result.userEmailId,
                password: result.password,
                firstName: result.firstName,
                lastName: result.lastName
            });
            user.save().then(result => {
                    console.log(result);
                    res.json({
                        success: true,
                        userID: result._id
                    });
                    console.log("new user registered");
                })
                .catch(error => {
                    console.log(error);
                    res.json({
                        success: false,
                        message: "user already exist!",
                    });
                });

        } catch (error) {
            console.log(error);
            if (error.isJoi === true) {
                res.status(422).json({
                    success: false
                }).send();
            } else {
                res.status(400).json({
                    success: false
                }).send();
            }
        }
    },
    resetPasswordEmail: async (req, res, next) => {
        const doc = await userSchema.findOne(req.body);
        const data = JSON.parse(JSON.stringify(doc));

        if (doc != null) {
            delete data["userEmailId"];
            delete data["password"];
            delete data["firstName"];
            delete data["lastName"];
            console.log("user exist with email: ", doc["userEmailId"])
            res.json({
                success: true,
                data: data
            });
        } else {
            console.log("user not found!")
            res.json({
                success: false,
                data: doc
            });
        }
    },
    passwordUpdateConfirmation: (req, res, next) => {
        const doc = req.body;
        newUser.findOne({
            userEmailId: doc["userID"]
        }, function (err, foundObject) {
            if (err) {
                console.log(err);
                res.json({
                    success: false
                });
                res.status(500).send();
            } else {
                if (!foundObject) {
                    res.status(404).send();
                    res.json({
                        success: false
                    });
                } else {
                    if (req.body.password) {
                        foundObject.password = req.body.password;
                    }
                    foundObject.save(function (err, updatedObject) {
                        if (err) {
                            console.log(err);
                            res.json({
                                success: false
                            });
                            res.status(500).send();
                        } else {
                            res.json({
                                success: true
                            });
                        }
                    });
                }
            }
        });
    }
}