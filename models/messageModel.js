const mongoose = require("mongoose");


const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        reqyured: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

module.exports.messageModel = new mongoose.model("Messages", messageSchema);