const express = require("express")
const { createCategory, getCategoryById, getAllCategories, updateCategory, deleteCategory } = require("../controllers/categoryController")
const { validate } = require("../utils/validation")
const { categorySchema } = require("../models/categoryModel")
const router = express.Router();

router.post('/category', createCategory());
router.get('/category/:_id', getCategoryById())
router.get('/category', getAllCategories())
router.put('/category/:_id', updateCategory())
router.delete('/category/:_id', deleteCategory())


module.exports.categoryRoutes = router

