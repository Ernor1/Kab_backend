const mongoose = require("mongoose");
const { promProductSchema, promProductModel } = require("../models/promProductModel");
const multer = require("multer");
const upload = multer({ dest: "./uploads" });
var type = upload.single("recfile");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { validatePromProduct } = require("../utils/promProductValidation");
const { result } = require("@hapi/joi/lib/base");
let streamifier = require("streamifier");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

let uploadFromBuffer = (req) => {
    return new Promise((resolve, reject) => {
        let cld_upload_stream = cloudinary.uploader.upload_stream(
            {
                folder: "Kabstore",
            },
            (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );

        streamifier
            .createReadStream(req.files.picture.data)
            .pipe(cld_upload_stream);
    });
};
module.exports.createPromProduct = () => {
    return async (req, res, next) => {
        // console.log(req.body);
        console.log(req.files.picture);

        const { error } = validatePromProduct(req.body);
        if (error) return res.send(error.details[0].message);
        try {
            // Upload the image
            const result = await uploadFromBuffer(req);
            console.log(result);

            // then(result=>console.log(result));

            const product = new promProductModel({
                name: req.body.name,
                price: req.body.price,
                category: req.body.category,
                picture: result.url,
                duration: new Date(Date.parse(req.body.duration))
            });

            await product.save();
            res.send(product).status(201);
        } catch (error) {
            console.error(error);
        }
    };
};
module.exports.getPromProductById = () => {
    return async (req, res) => {
        console.log(req.params);
        try {
            const product = await promProductModel.findById(req.params._id);
            res.status(200).send(product);
        } catch (error) {
            console.log(error);
        }
    };
};

module.exports.getAllPromProducts = () => {
    return async (req, res) => {
        try {
            const products = await promProductModel.find();
            return res.send(products).status(200);
        } catch (error) {
            console.log(error);
        }
    };
};

module.exports.updatePromProduct = () => {
    return async (req, res) => {
        try {
            product = await promProductModel.findByIdAndUpdate(req.params._id, req.body);
            res.send("product updated").status(201);
            return await product.save();

        } catch (error) {
            console.log(error);
        }



    };
};

module.exports.deletePromProduct = () => {
    return async (req, res) => {
        try {
            product = await promProductModel.findByIdAndDelete(req.params.id);
            return res.send("product deleted");
        } catch (error) {
            console.log(error);
        }
    };
};
