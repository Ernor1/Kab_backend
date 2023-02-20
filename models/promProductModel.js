const mongoose = require("mongoose")

const promProductSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["Phone", "Computers", "Accessories", "Audio"],
    },
    picture: {
        type: String,
        required: true
    },
    duration: {
        type: Date,
        required: true
    }
}

)

module.exports.promProductModel = new mongoose.model('PromProducts', promProductSchema)