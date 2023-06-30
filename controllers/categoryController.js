const mongoose = require("mongoose");
const { categorytSchema, categoryModel } = require("../models/categoryModel");
const multer = require("multer");
require("dotenv").config();
const { categoryValidation } = require("../utils/categoryValidation");
module.exports.createCategory = () => {
    return async (req, res, next) => {


        const { error } = categoryValidation(req.body);
        if (error) return res.send(error.details[0].message);
        try {


            const category = new categoryModel({
                name: req.body.name,
                isTop: req.body.isTop,
                description: req.body.description
            });

            await category.save();
            res.send(category).status(201);
        } catch (error) {
            console.error(error);
        }
    };
};
module.exports.getCategoryById = () => {
    return async (req, res) => {
        console.log(req.params);
        try {
            const category = await categoryModel.findById(req.params._id);
            res.status(200).send(category);
        } catch (error) {
            console.log(error);
        }
    };
};

module.exports.getAllCategories = () => {
    return async (req, res) => {
        try {
            const categories = await categoryModel.find();
            return res.send({ categories }).status(200);
        } catch (error) {
            console.log(error);
        }
    };
};

module.exports.updateCategory = () => {
    return async (req, res) => {
        // const category = await categoryModel.findOne({ id: req.params.id });
        // if (!category)
        //   return res.status(404).send(`user with id${req.params.id} was not found`);
        // category = await categoryModel.findOneAndUpdate(
        //   {
        //     id: req.params._id,
        //   },
        //   req.body,
        //   { new: true }
        // );
        try {
            category = await categoryModel.findByIdAndUpdate(req.params._id, req.body);
            res.json({ message: "category updated", category: category }).status(201);
            return await category.save();

        } catch (error) {
            console.log(error);
        }

        // if(!category)
        // return res.send("failed to update")


    };
};

module.exports.deleteCategory = () => {
    return async (req, res) => {
        try {
            category = await categoryModel.findByIdAndDelete(req.params._id);
            return res.json({ message: "category deleted" });
        } catch (error) {
            console.log(error);
        }
    };
};
