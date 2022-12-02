const express = require("express")
const {loginSchema,loginModel} = require("../models/adminModel")
const {AdminValidation } = require("../utils/adminValidation");
const { request } = require("express");
const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs"); 
const cookie = require("cookie-parser")


module.exports.adminAccount = () =>{
    return async (req,res,next) => {
        const {error} = AdminValidation(req.body)
        if(error) return res.send(error.details[0].message)
        try{
            const admin = new loginModel({
                email: req.body.email,
                password:req.body.password
            });
            console.log("before token");
            let token = jwt.sign({_id:admin._id},process.env.SECRET,{
                expiresIn: "1h",
            })
            const bearerHeader = req.header(['X-auth-Token'],`Bearer ${token}`);
            if(typeof bearerHeader !== 'undenfined'){
                const bearer = bearerHeader.split(' ')
                const bearerToken = bearer[1];
                req.token = bearerToken;
                next()
            }
    //         const tok= req.headers.authorization.split("")[1];
    //   header,payload,signature = token.split('.')
    //   console.log(tok);
         const salt  = await bcryptjs.genSalt(10);
         admin.password = await bcryptjs.hash(admin.password, salt);
             await admin.save();res.cookie("admindata",admin.email);
            // console.log(token);
            res.send(token).status(201);
        }catch (error) {
            console.log(error);
        }
    };
};

module.exports.adminLogin = () => {
    return async(req, res, next) => {
        try {
            const  {email,password} = req.body;
            const admin = await signUpModel.findOne({
                email:email,
            })
            if(!admin){
                return res.status(404).send("incorrent fname or password")
            }
            const passwordMatch = await bcryptjs.compare(password,admin.password);
            if(!passwordMatch) {
                return res.status(404).send("incorect fname or password");
            }
            let token = jwt.sign(
                {
                    _id:admin._id, 
                },
                process.env.SECRET

            );
            res.cookie("admin",admin.email)
            res.status(200).header("X-auth-token",token).json({
                success:true,
               
            });
            next();
        } catch (error) {
            console.log(error);
        }
    }
   
}