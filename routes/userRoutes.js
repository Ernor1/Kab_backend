const express = require('express')
const router = express.Router()
const { createAccount, getAllUsers, getUserById, deleteUser, updateUser, loginUser } = require('../controllers/userController')

router.post('/user', createAccount());
router.get('/user/:id', getUserById())
router.get('/user', getAllUsers());
router.put('/user', updateUser());
router.delete('/user', deleteUser());
router.post('/user/login', loginUser())

module.exports.userRoutes = router;

