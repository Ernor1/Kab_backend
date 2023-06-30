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
  console.log(req.files);
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
let uploadMultipleFromBuffer = (req) => {
  console.log(req.files);
  return new Promise((resolve, reject) => {
    const uploadPromises = [];

    const arr = Object.entries(req.files).map(([key, value]) => ({ key, value }));

    const picturesPromises = [];
    const colorPicturesPromises = [];

    arr.forEach((element) => {
      const uploadPromise = new Promise((resolve, reject) => {
        let cld_upload_stream = cloudinary.uploader.upload_stream(
          {
            folder: "Kabstore",
            // Append a unique identifier for color pictures
            public_id: element.key.includes('color') ? `${element.key}_${Date.now()}` : undefined,
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
          .createReadStream(element.value.data)
          .pipe(cld_upload_stream);
      });

      if (element.key.includes('color')) {
        colorPicturesPromises.push(uploadPromise);
      } else {
        picturesPromises.push(uploadPromise);
      }

      uploadPromises.push(uploadPromise);
    });

    Promise.all(uploadPromises)
      .then((results) => {
        const picturesResults = results.filter(result => !result.public_id.includes('color'));
        const colorPicturesResults = results.filter(result => result.public_id.includes('color'));
        const sortedPicturesResults = picturesResults.sort((a, b) => a.public_id.localeCompare(b.public_id));
        const sortedColorPicturesResults = colorPicturesResults.sort((a, b) => a.public_id.localeCompare(b.public_id));

        resolve({
          pictures: sortedPicturesResults,
          colorPictures: sortedColorPicturesResults
        });
      })
      .catch((error) => reject(error));
  });
};




module.exports.createProduct = () => {
  return async (req, res, next) => {
    console.log(req.body);
    console.log("from here", req.files);

    const { error } = validate(req.body);
    if (error) return res.send(error.details[0].message);
    try {
      // Upload the image
      const results = await uploadMultipleFromBuffer(req)
      console.log(results);
      const finalResults = results.pictures.map((result) => result.url);
      console.log(finalResults);
      const colorResults = results.colorPictures.map((result) => result.url);
      console.log(colorResults);

      // then(result=>console.log(result));

      const product = new productModel({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        discount: req.body.discount,
        status: req.body.status,
        pictures: finalResults,
        description: req.body.description,
        colors: req.body.colors,
        imageColors: colorResults

      });

      await product.save();
      res.json({
        product: product,
        message: "product created",
      }).status(201);
    } catch (error) {
      console.error(error);
      res.json({
        message: error,
      }).status(500);
    }
  };
};
module.exports.getProductById = () => {
  return async (req, res) => {
    console.log(req.params);
    try {
      const product = await productModel.findById(req.params._id);
      res.status(200).json({ product: product });
    } catch (error) {
      console.log(error);
    }
  };
};

module.exports.getAllProducts = () => {
  return async (req, res) => {
    try {
      const products = await productModel.find();
      return res.json(products).status(200);
    } catch (error) {
      console.log(error);
    }
  };
};
module.exports.productImages = () => {
  return async (req, res) => {
    const results = await uploadMultipleFromBuffer(req)
    const finalResults = results.map((result) => result.url);

    try {
      product = await productModel.updateOne({ _id: req.params._id }, { $push: { pictures: { $each: finalResults } } })
      res.json({
        message: "product updated",
        product: product
      }).status(201);

    } catch (error) {
      res.json({
        message: error
      }).status(201);
      console.log(error);
    }


  }
}
module.exports.updateProduct = () => {

  return async (req, res) => {
    if (req.files) {

      try {
        const results = await uploadMultipleFromBuffer(req);
        const finalResults = results.map((result) => result.url);
        req.body.pictures = finalResults;

        product = await productModel.findByIdAndUpdate(req.params._id, req.body);
        res.json({
          message: "product updated",
          product: product
        }).status(201);


      } catch (error) {
        res.json({
          message: error
        }).status(201);
        console.log(error);
      }

    }

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
      res.json({
        message: "product updated",
        product: product
      }).status(201);


    } catch (error) {
      res.json({
        message: error
      }).status(201);
      console.log(error);
    }

    // if(!product)
    // return res.send("failed to update")


  };
}


module.exports.deleteProduct = () => {
  return async (req, res) => {
    try {
      product = await productModel.findByIdAndDelete(req.params._id);
      console.log("deleted");
      console.log(product);
      return res.json({ message: "product deleted" });
    } catch (error) {
      console.log(error);
    }
  };
};
