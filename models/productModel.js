const mongoose = require("mongoose")

const productSchema = mongoose.Schema({

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
    discount: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    }
})

module.exports.productModel = new mongoose.model('Products', productSchema)