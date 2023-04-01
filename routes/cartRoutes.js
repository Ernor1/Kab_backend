const express = require("express")
const { createCart, getCartById, getAllCarts, updateCart, deleteCart } = require("../controllers/cartController")
const { validate } = require("../utils/validation")
const { productSchema } = require("../models/productModel")
const router = express.Router();

router.post('/user/:userId/cart', createCart());
router.get('/user/:userId/cart/:_id', getCartById())
router.get('/user/:userId/cart', getAllCarts())
router.put('/user/:userId/cart/:_id', updateCart())
router.delete('/user/:userId/cart/:_id', deleteCart())


module.exports.cartRoutes = router

