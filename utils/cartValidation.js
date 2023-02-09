const { integer } = require("joi")
// import { object, string, number, array } from '@hapi/joi';
const Joi = require("joi")

function cartValidate(cart) {
    const schema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        category: Joi.string().required(),
        discount: Joi.string().required(),
        status: Joi.string().required(),
        id: Joi.string().required(),
        picture: Joi.string().required()

    })


    return schema.validate(cart)
}

module.exports.cartValidation = cartValidate;