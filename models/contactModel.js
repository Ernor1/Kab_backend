const mongoose  = require("mongoose")

const contactSchema = new mongoose.Schema({

    name:{
        type:String,
        reqyured:true
    },
    email:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    }

})

module.exports.contactModel = new mongoose.model("Contact",contactSchema)