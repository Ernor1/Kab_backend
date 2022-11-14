const express  = require("express")
const {createCart,getCartById,getAllCarts,updateCart,deleteCart} = require("../controllers/cartController")
const {validate} = require("../utils/validation")
const {productSchema} = require("../models/productModel")
const router = express.Router();

router.post('/cart',createCart());
router.get('/cart/:_id',getCartById())
router.get('/cart',getAllCarts())
router.put('/cart/:_id',updateCart())
router.delete('/cart/:_id',deleteCart())


module.exports.cartRoutes  = router

