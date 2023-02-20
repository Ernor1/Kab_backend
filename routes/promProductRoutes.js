const express = require("express")
const { createPromProduct, getPromProductById, getAllPromProducts, updatePromProduct, deletePromProduct } = require("../controllers/promProductController")
const { promProductValidate } = require("../utils/promProductValidation")
const { promProductSchema } = require("../models/promProductModel")
const router = express.Router();
router.post('/promproduct', createPromProduct());
router.get('/promproduct/:_id', getPromProductById())
router.get('/promproduct', getAllPromProducts())
router.put('/promproduct/:_id', updatePromProduct())
router.delete('/promproduct/:_id', deletePromProduct())


module.exports.promProductRoutes = router

