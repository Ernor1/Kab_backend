const joi = require("joi")
const passwordComplexity = require("joi-password-complexity");

function validateAdmin(admin){
    const schema = joi.object({
        email:joi.string().email().required(),
        password:new passwordComplexity()
    })
    return schema.validate(admin)
}
module.exports.AdminValidation = validateAdmin;

