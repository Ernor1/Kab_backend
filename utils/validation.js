const Joi = require("joi");

function validateProduct(product) {
    const schema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        category: Joi.string().required(),
        discount: Joi.string().required(),
        status: Joi.string().required(),
        description: Joi.string().required(),
        colors: Joi.array().items(Joi.string()).required(),
    });

    return schema.validate(product);
}

module.exports.validate = validateProduct;
