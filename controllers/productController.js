const mongoose = require("mongoose");
const { productSchema, productModel } = require("../models/productModel");
const multer = require("multer");
const upload = multer({ dest: "./uploads" });
var type = upload.single("recfile");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { validate } = require("../utils/validation");
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
module.exports.createProduct = () => {
  return async (req, res, next) => {
    // console.log(req.body);
    console.log(req.files.picture);

    const { error } = validate(req.body);
    if (error) return res.send(error.details[0].message);
    try {
      // Upload the image
      const result = await uploadFromBuffer(req);
      console.log(result);

      // then(result=>console.log(result));

      const product = new productModel({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        discount: req.body.discount,
        status: req.body.status,
        picture: result.url,
      });

      await product.save();
      res.send(product).status(201);
    } catch (error) {
      console.error(error);
    }
  };
};
module.exports.getProductById = () => {
  return async (req, res) => {
    console.log(req.params);
    try {
      const product = await productModel.findById(req.params._id);
      res.status(200).send(product);
    } catch (error) {
      console.log(error);
    }
  };
};

module.exports.getAllProducts = () => {
  return async (req, res) => {
    try {
      const products = await productModel.find();
      return res.send(products).status(200);
    } catch (error) {
      console.log(error);
    }
  };
};

module.exports.updateProduct = () => {
  return async (req, res) => {
    // const product = await productModel.findOne({ id: req.params.id });
    // if (!product)
    //   return res.status(404).send(`user with id${req.params.id} was not found`);
    // product = await productModel.findOneAndUpdate(
    //   {
    //     id: req.params._id,
    //   },
    //   req.body,
    //   { new: true }
    // );
   try {
     product = await productModel.findByIdAndUpdate(req.params._id, req.body);
     res.send("product updated").status(201);
   return await product.save(); 

   } catch (error) {
    console.log(error);
   }
   
    // if(!product)
    // return res.send("failed to update")
    
    
  };
};

module.exports.deleteProduct = () => {
  return async (req, res) => {
    try {
      product = await productModel.findByIdAndDelete(req.params.id);
      return res.send("product deleted");
    } catch (error) {
      console.log(error);
    }
  };
};
