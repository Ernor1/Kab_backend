const Joi = require("joi")

function validatePromProduct(product) {
    const schema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        category: Joi.string().required(),
        duration: Joi.string().required()
    })


    return schema.validate(product)
}

module.exports.validatePromProduct = validatePromProduct;