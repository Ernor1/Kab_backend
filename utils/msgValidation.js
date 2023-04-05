const Joi = require("joi")

function validateMessage(message) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        subject: Joi.string().required(),
        message: Joi.string().required()


    })

    return schema.validate(message)
}
module.exports.messageValidation = validateMessage