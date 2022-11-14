const mongoose = require("mongoose");
const {cartModel} = require("../models/cartModel")
const multer = require("multer");
const upload = multer({ dest: "./uploads" });
var type = upload.single("recfile");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const {cartValidation} = require("../utils/cartValidation")
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
        folder: "Cart",
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
module.exports.createCart = () => {
  return async (req, res, next) => {
    // console.log(req.body);
    console.log(req.files.picture);

    const { error } = cartValidation(req.body);
    if (error) return res.send(error.details[0].message);
    try {
      // Upload the image
      const result = await uploadFromBuffer(req);
      console.log(result);

      // then(result=>console.log(result));

      const cart = new cartModel({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        discount: req.body.discount,
        status: req.body.status,
        picture: result.url,
      });

      await cart.save();
      res.send(cart).status(201);
    } catch (error) {
      console.error(error);
    }
  };
};
module.exports.getCartById = () => {
  return async (req, res) => {
    console.log(req.params);
    try {
      const cart = await cartModel.findById(req.params._id);
      res.status(200).send(cart);
    } catch (error) {
      console.log(error);
    }
  };
};

module.exports.getAllCarts = () => {
  return async (req, res) => {
    try {
      const carts = await cartModel.find();
      return res.send(carts).status(200);
    } catch (error) {
      console.log(error);
    }
  };
};

module.exports.updateCart = () => {
  return async (req, res) => {
   
   try {
     cart = await cartModel.findByIdAndUpdate(req.params._id, req.body);
     res.send("cart updated").status(201);
   return await cart.save(); 

   } catch (error) {
    console.log(error);
   }
   
 
    
    
  };
};

module.exports.deleteCart = () => {
  return async (req, res) => {
    try {
      cart = await cartModel.findByIdAndDelete(req.params.id);
      return res.send("cart deleted");
    } catch (error) {
      console.log(error);
    }
  };
};
