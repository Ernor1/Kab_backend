const mongoose = require("mongoose")

const wishSchema  = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})

module.exports.wishModel = new mongoose.model("Wish",wishSchema)