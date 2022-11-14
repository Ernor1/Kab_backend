const { integer} = require("joi")
// import { object, string, number, array } from '@hapi/joi';
const Joi = require("joi")

function validateProduct(product){
    const schema  =  Joi.object({
        name:Joi.string().required(),
        price:Joi.number().required(),
        category:Joi.string().required(),
        discount:Joi.number().required(),
        status:Joi.string().required(),
        // Picture:Joi.string().required()

    })
    

    return schema.validate(product)
}

module.exports.validate = validateProduct;