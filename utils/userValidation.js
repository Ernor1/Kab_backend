const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity')
 function validateUser(product) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: new passwordComplexity()
    })
        return schema.validate(product)
    }
module.exports.validate = validateUser;