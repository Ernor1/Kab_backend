const jwt = require("jsonwebtoken")
require('dotenv').config()
module.exports = function(req,res,next){
    const token = req.header('X-auth-token')
    if(!token) return res.send("access denied !no token found")
    try {
        const auth = jwt.verify(token,process.env.SECRET)
        next()
    } catch (error) {
        console.log(error);
    }
}