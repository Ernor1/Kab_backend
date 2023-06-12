const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    isTop: {
        type: String,
        required: true,
        enum: ["YES", "NO"],
    },
    description: {
        type: String,
        required: true,
    }

})
module.exports.categoryModel = new mongoose.model('Category', categorySchema)