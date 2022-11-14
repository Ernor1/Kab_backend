const express = require("express")
const {wishModel} = require("../models/wishModel")
const {wishValidation} = require("../utils/wishValidation")


module.exports.createWish = () =>{
    return async(req,res) =>{
const {error} = wishValidation(req.body)
if(error) return  res.send(error.details[0].message)
        try {
            
            const wish = await new wishModel({
                name:req.body.name,
                price:req.body.price
            })
            await wish.save();
            res.send(wish).status(200)
         } catch (error) {
            console.log(error);
        }
    };
};

module.exports.getWishById = () =>{
    return async(req,res) =>{
        try {
            const wish = await wishModel.findById(req.params._id);
            res.status(200).send(wish);
          } catch (error) {
            console.log(error);
          }
    }
}

module.exports.getAllWishes = () => {
    return async (req, res) => {
      try {
        const wish = await wishModel.find();
        return res.send(wish).status(200);
      } catch (error) {
        console.log(error);
      }
    };
  };
  
  module.exports.updateWish = () => {
    return async (req, res) => {
     try {
       wish = await wisheModel.findByIdAndUpdate(req.params._id, req.body);
       res.send("wish updated").status(201);
     return await wish.save(); 
  
     } catch (error) {
      console.log(error);
     }
     
    };
  };
  
  module.exports.deleteWish = () => {
    return async (req, res) => {
      try {
        wish = await wishModel.findByIdAndDelete(req.params.id);
        return res.send("wish deleted");
      } catch (error) {
        console.log(error);
      }
    };
  };