/*************************************************
 * 
 * operational apis for login and signup procedure
 * 
 *************************************************/

// importing user schema
const userSchema = require("../models/user")

// importing validation schemas
const {
    loginSchema,
    registerSchema
} = require('../utils/validationSchema')

// exporting apis and their code
module.exports = {
    login: async (req, res, next) => {
        try {
            const result = await loginSchema.validateAsync(req.body)
            console.log("validation result: -\n", result)
            const doc = await userSchema.findOne({
                userEmailId: result.userEmailId
            });
            if (doc != null) {
                const areSame = await doc.validPassword(result.password, doc.password);
                if (areSame) {
                    const data = JSON.parse(JSON.stringify(doc));
                    delete data.password;
                    delete data.admin;
                    console.log("login successful", data)
                    res.json({
                        success: true,
                        data: data,
                        message: "login successful",
                    });
                } else {
                    console.log("incorrect login credientials")
                    res.json({
                        success: false,
                        data: null,
                        message: "login failed",
                    });
                }
            } else {
                console.log("user not found", doc)
                res.status(404).json({
                    success: false,
                    data: doc,
                    message: "incorrect email id or password",
                });
            }
        } catch (error) {
            console.log(error)
            if (error.isJoi === true) {
                res.status(422).json({
                    success: false,
                    data: null,
                    message: "incorrect data format"
                }).send();
            } else {
                res.status(400).json({
                    success: false,
                    data: null,
                    message: "incorrect data format"
                }).send()
            }
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
                lastName: result.lastName,
                admin: false,
            });
            user.save().then(result => {
                    console.log(result);
                    res.status(200).json({
                        success: true,
                        userID: result._id
                    });
                    console.log("new user registered");
                })
                .catch(error => {
                    console.log(error);
                    res.status(409).json({
                        success: false,
                        message: "user already exist!",
                    }).send();
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
    // add new api here
}