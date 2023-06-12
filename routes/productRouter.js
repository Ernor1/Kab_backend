const express = require("express")
const { createProduct, getProductById, getAllProducts, updateProduct, deleteProduct, productImages } = require("../controllers/productController")
const { validate } = require("../utils/validation")
const { productSchema } = require("../models/productModel")
const router = express.Router();

router.post('/product', createProduct());
router.get('/product/:_id', getProductById())
router.get('/product', getAllProducts())
router.put('/product/:_id', updateProduct())
router.put('/product/imgs/:_id', productImages())
router.delete('/product/:_id', deleteProduct())


module.exports.productRoutes = router

