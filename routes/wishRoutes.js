const express = require("express")
const {createWish,getWishById,getAllWishes,updateWish,deleteWish} = require("../controllers/wishController")
const {wishValidation} = require("../utils/wishValidation")
const {wishSchema} = require("../models/wishModel")
const router = express.Router()

router.post('/wish',createWish())
router.get('/wish/:id',getWishById())
router.get('/wish/',getAllWishes())
router.put('/wish/:id',updateWish())
router.delete('/wish/:id',deleteWish())

module.exports.wishRoutes = router