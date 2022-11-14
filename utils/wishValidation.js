const Joi = require("joi")

function wishValidate(wish) {
    const schema =  Joi.object({
        name:Joi.string().required(),
        price:Joi.number().required()

    })
    return schema.validate(wish)
}

module.exports.wishValidation = wishValidate