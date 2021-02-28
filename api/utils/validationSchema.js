const Joi = require('@hapi/joi')

const loginSchema = Joi.object({
    userEmailId: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})

const registerSchema = Joi.object({
    userEmailId: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
})

const questionSchema = Joi.object({
    surveyType: Joi.string().equal('daily', 'weekly', 'monthly').required(),
    active: Joi.boolean().required(),
    question: Joi.string().required(),
    questionNumber: Joi.string().required(),
    type: Joi.string().equal('text', 'text fields', 'radio button', 'check box', 'option table').required(),
    options: Joi.array().required(),
})

const passwordUpdateSchema = Joi.object({
    userID: Joi.required(),
    oldPassword: Joi.string().min(6).required(),
    newPassword: Joi.string().min(6).required(),
})

const emailUpdateSchema = Joi.object({
    userID: Joi.required(),
    newEmail: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})

module.exports = {
    loginSchema,
    registerSchema,
    questionSchema,
    passwordUpdateSchema,
    emailUpdateSchema,
}