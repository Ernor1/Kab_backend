const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Clients' },
    id: {
        type: String,
        requiresd: true,
        index: false
    },
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
    },
    quantity: {
        type: Number,
        default: 1
    }

})
module.exports.cartModel = new mongoose.model('CartUser', cartSchema)