const express = require("express");
const {adminAccount,adminLogin} = require('../controllers/adminController')
const  {userModel} = require("../models/userModel")
const router = express.Router()

router.post('/admin',adminAccount());
router.post('/login',adminLogin());

module.exports.adminRoutes = router ;