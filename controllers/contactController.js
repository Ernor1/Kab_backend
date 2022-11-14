const express = require("express")
const {contactModel} = require("../models/contactModel")
const {contactValidation} = require("../utils/contactValidation")


module.exports.createContact = () => {
    return async (req, res, next) => {
  
      const {error} = contactValidation(req.body)
      if(error) return res.send(error.details[0].message)
    try {
       const contact = new contactModel({
          name: req.body.name,
          email:req.body.email,
          subject:req.body.subject,
          category: req.body.category,
         
        });
  
        await contact.save();
        res.send(contact).status(201);
      } catch (error) {
        console.error(error);
      }
    };
  };
  module.exports.getContactById = () => {
    return async (req, res) => {
      console.log(req.params);
      try {
        const contact = await contactModel.findById(req.params._id);
        res.status(200).send(contact);
      } catch (error) {
        console.log(error);
      }
    };
  };
  
  module.exports.getAllContacts = () => {
    return async (req, res) => {
      try {
        const contacts = await contactModel.find();
        return res.send(contacts).status(200);
      } catch (error) {
        console.log(error);
      }
    };
  };
  
  module.exports.updateContact= () => {
    return async (req, res) => {
     try {
       contact = await contactModel.findByIdAndUpdate(req.params._id, req.body);
       res.send("contacts updated").status(201);
     return await contact.save(); 
  
     } catch (error) {
      console.log(error);
     }
     
    };
  };
  
  module.exports.deleteContact = () => {
    return async (req, res) => {
      try {
        contact = await contactModel.findByIdAndDelete(req.params.id);
        return res.send("contact deleted");
      } catch (error) {
        console.log(error);
      }
    };
  };
  