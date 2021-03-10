/*************************************************
 * 
 * validation scemas for all database operations
 * 
 *************************************************/

// importing joi
const Joi = require('@hapi/joi')

// login vaidation schema
const loginSchema = Joi.object({
    userEmailId: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    admin: Joi.boolean().required(),
})

// register validation schema
const registerSchema = Joi.object({
    userEmailId: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    // admin: Joi.boolean().required(),
})

// survey question validation schema
const questionSchema = Joi.object({
    surveyType: Joi.string().equal('daily', 'weekly', 'monthly').required(),
    active: Joi.boolean().required(),
    required: Joi.boolean().required(),
    question: Joi.string().required(),
    questionNumber: Joi.string().required(),
    type: Joi.string().equal('short answer', 'long answer', 'radio button', 'check box', 'option table').required(),
    options: Joi.array().required(),
})

// update password validation schema
const passwordUpdateSchema = Joi.object({
    userID: Joi.required(),
    oldPassword: Joi.string().min(6).required(),
    newPassword: Joi.string().min(6).required(),
})

// update email validation schema
const emailUpdateSchema = Joi.object({
    userID: Joi.required(),
    newEmail: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})

// exporting validation schemas
module.exports = {
    loginSchema,
    registerSchema,
    questionSchema,
    passwordUpdateSchema,
    emailUpdateSchema,
}