const express = require('express');
const {userModel }  = require('../models/userModel')
const cookie = require('cookie-parser')
const jwt = require("jsonwebtoken")
const {validateUser} = require('../utils/userValidation')
const bcryptjs = require('bcryptjs')

module.exports.createAccount  = () => {
    return async (req,res,next) => {
        const {error} = validateUser(req.body)
        if(error) return res.send(error.details[0].message)
        try {
            const user = new userModel({
                username:req.body.username,
                email:req.body.email,
                password:req.body.password
            })
            // console.log("before token");
            // let jwt = jwt.sign({_id:user_id},process.env.SECRET,{
            //     expiresIn:"1h"
            // })
            const salt = await bcryptjs.genSalt(10);
            user.password = await bcryptjs.hash(user.password,salt)
             await account.save();
            res.cookie('userdat',user.email)
            res.send(user).status(201)
        } catch (error) {
            console.log(error);
        }
    };
};

module.exports.getUserById = () => {
    return async (req, res, next) =>  {
    console.log(req.params);
    try {
        const user  = await userModel.findById(req.params._id)
        res.status(200).send(user);
        
    } catch (error) {
        console.log(error);
    }
    }
}

module.exports.getAllUsers = () => {
    return async (req,res) => {
        try {
            const users  = await userModel.find();
            return res.send(users).status(200)
        } catch (error) {
            console.log(error);
        }
    }
}


module.exports.updateUser = (req, res, next) => {
     return async (req,res) => {
        try {
            user  = await userModel.findByIdAndUpdate(req.params._id, req.body);
            res.send("user upsdate").status(201)
            return await user.save();
        } catch (error) {
            console.log(error);
        }
     }
    }

    module.exports.deleteUser  = () => {
        return async (req, res) => {
            try {
                user = await userModel.findByIdAndDelete(req.params.id);
                res.send("user deleted")
            } catch (error) {
                console.log(error);
            }

        };

    };

    module.exports.loginUser = () => {
    return async(req,res) => {
        try {
            const { email, password } = req.body;
            const user = await userModel.findOne({ email: email });
            if (!user) {
              return res.send("person not found");
            }
            console.log(user.password);
            const passwordMatch = await bcryptjs.compare(password, user.password);
            console.log(passwordMatch);
            if (!passwordMatch) {
              console.log("Testing");
              return res.send("incorrect password or email");
            }
            let token = jwt.sign({
                _id: person._id },
                process.env.MY_TOKEN
                );
            res.cookie("userdata", user.email, {
              sameSite: true,
              httpOnly: false,
              maxAge: 24 * 60 * 60 * 1000
            });
            // await user.save()
            // res.redirect('/form');
            // console.log(email)
            return res.send(token);
          } catch (error) {
            console.log(error);
          }
    }

    }