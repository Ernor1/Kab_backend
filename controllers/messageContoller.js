const mongoose = require("mongoose");
const {messageSchema,messageModel} = require('../models/messageModel')
const {messageValidation} = require("../utils/msgValidation")
// import {describe, expect, test} from '@jest/globals';


module.exports.createMessage = () => {
   return async (req, res, next) => {

    const {error} = messageValidation(req.body)
    if(error) return res.send(error.details[0].message)
  try {
     const message = new messageModel({
        name: req.body.name,
        email:req.body.email,
        subject:req.body.subject,
        category: req.body.category,
       
      });

      await message.save();
      res.send(message).status(201);
    } catch (error) {
      console.error(error);
    }
  };
};
module.exports.getMessageById = () => {
  return async (req, res) => {
    console.log(req.params);
    try {
      const message = await messageModel.findById(req.params._id);
      res.status(200).send(message);
    } catch (error) {
      console.log(error);
    }
  };
};

module.exports.getAllMessages = () => {
  return async (req, res) => {
    try {
      const messages = await messageModel.find();
      return res.send(messages).status(200);
    } catch (error) {
      console.log(error);
    }
  };
};

module.exports.updateMessage = () => {
  return async (req, res) => {
   try {
     message = await messageModel.findByIdAndUpdate(req.params._id, req.body);
     res.send("message updated").status(201);
   return await message.save(); 

   } catch (error) {
    console.log(error);
   }
   
  };
};

module.exports.deleteMessage = () => {
  return async (req, res) => {
    try {
      message = await messageModel.findByIdAndDelete(req.params.id);
      return res.send("message deleted");
    } catch (error) {
      console.log(error);
    }
  };
};
