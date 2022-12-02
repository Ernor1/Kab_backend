const express = require("express");
const  {adminAccount,adminLogin} = require("../controllers/signUPController")
const  {signUpModel} = require("../models/signUpModel")
const router = express.Router()

router.post('/admin',adminAccount());
router.post('/login',adminLogin());

module.exports.adminRoutes = router ;