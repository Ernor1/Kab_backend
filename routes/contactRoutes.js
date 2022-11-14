const express = require("express")
const {createContact,getContactById,getAllContacts,updateContact,deleteContact } = require("../controllers/contactController")
const {contactSchema} = require("../models/contactModel")
const {contactValidation} = require("../utils/msgValidation")
const router = express.Router()

router.post('/contact',createContact());
router.get('/contact/:_id',getContactById())
router.get('/contact',getAllContacts())
router.put('/contact/:_id',updateContact())
router.delete('/contact/:_id',deleteContact())

module.exports.contactRoutes = router