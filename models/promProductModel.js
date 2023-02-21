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
promProductSchema.pre('remove', function (next) {
    if (Date.parse(this.duration) < Date.now()) {
        this.model('PromProducts').deleteOne({ _id: this._id }, function (err) {
            if (err) return next(err);
            next();
        });
    } else {
        next();
    }
})

module.exports.promProductModel = new mongoose.model('PromProducts', promProductSchema)