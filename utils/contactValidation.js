const Joi = require("joi")

function validateContact(contact){
    const schema = Joi.object({
        name:Joi.string().required(),
        email:Joi.string().email().required(),
        subject:Joi.string().required(),
        category:Joi.string().required()

        
    })

    return schema.validate(contact)
}
module.exports.contactValidation = validateContact