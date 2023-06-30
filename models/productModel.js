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
        // enum: ["Phone", "Computers", "Accessories", "Audio"],
    },
    discount: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["AVAILABLE", "UNAVAILABLE", "COMING SOON", "OUT OF STOCK"]
    },
    pictures: {
        type: [String],  // Array of strings
        required: true
    },
    description: {
        type: String,
        required: true
    },
    colors: {
        type: [String],

    },
    imageColors: {
        type: [String],

    }
})

module.exports.productModel = new mongoose.model('Products', productSchema)