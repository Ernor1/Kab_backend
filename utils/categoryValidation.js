const { integer } = require("joi")
// import { object, string, number, array } from '@hapi/joi';
const Joi = require("joi")

function validateCategory(category) {
    const schema = Joi.object({
        name: Joi.string().required(),
        isTop: Joi.string().required(),
        description: Joi.string().required(),
        // Picture:Joi.string().required()

    })


    return schema.validate(category)
}

module.exports.categoryValidation = validateCategory;