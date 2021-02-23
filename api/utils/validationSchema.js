const Joi = require('@hapi/joi')

const loginSchema = Joi.object({
    userEmailId: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})

const registerSchema = Joi.object({
    userEmailId: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().min(6).required(),
})

module.exports = {
    loginSchema,
    registerSchema
}