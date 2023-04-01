const mongoose = require("mongoose");
const { cartModel } = require("../models/cartModel")
const multer = require("multer");
const upload = multer({ dest: "./uploads" });
var type = upload.single("recfile");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { cartValidation } = require("../utils/cartValidation")
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
  return async (req, res) => {
    const { error } = cartValidation(req.body);
    if (error) {
      console.log("we refuse ", error.details[0].message, " as a cart");
      return res.json(error.details[0].message);
    }

    // set the user identifier from the authenticated user
    const userId = req.params.userId;

    const cartExist = await cartModel.find({ user: userId, id: req.body.id })
    console.log(cartExist);
    if (cartExist.length >= 1) {
      res.json({ message: "Exists" })
    }
    else {
      // set the user identifier on the cart object
      const cart = new cartModel({ ...req.body, user: userId });
      try {
        const newCart = await cart.save()
        res.status(201).json({
          data: newCart,
          message: "Added To cart"
        });
        console.log(newCart, "done");
      } catch (error) {
        console.error(error);
        res.status(500).json(error)
      }
    }
  };
};

module.exports.getCartById = () => {
  return async (req, res) => {
    console.log(req.params);

    // get the user identifier from the authenticated user
    const userId = req.params.userId;

    try {
      const cart = await cartModel.findOne({ _id: req.params._id, user: userId });
      if (cart) {
        res.status(200).send(cart);
      } else {
        res.status(404).send("Cart not found");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };
};


module.exports.getAllCarts = () => {
  return async (req, res) => {
    // get the user identifier from the authenticated user
    const userId = req.params.userId;

    try {
      console.log("this is the ", userId);
      if (userId !== "undefined") {
        const carts = await cartModel.find({ user: userId }); 
        return res.json(carts).status(200);
      }
      else {
        return res.json([]).status(200);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };
};


module.exports.updateCart = () => {
  return async (req, res) => {
    try {
      const cart = await cartModel.findOneAndUpdate({ _id: req.params._id, userId: req.params.userId }, req.body, { new: true });
      if (!cart) {
        return res.status(404).send('Cart not found');
      }
      res.json({ message: "cart updated", data: cart }).status(201);
      console.log("done updated cart");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };
};

module.exports.deleteCart = () => {
  return async (req, res) => {
    try {
      const cart = await cartModel.findOneAndDelete({ _id: req.params._id, userId: req.params.userId });
      if (!cart) {
        return res.status(404).send('Cart not found');
      }
      console.log(cart);
      return res.json("cart deleted");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };
};
