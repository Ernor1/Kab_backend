const mongoose = require("mongoose")
require('dotenv').config()

const URL = process.env.MONGODB_URL

module.exports = function(){
mongoose.connect(URL,(err) => {
    if(err){
        console.log(err)
    }
    else {
        console.log("database connected successfully")
    }
})
}