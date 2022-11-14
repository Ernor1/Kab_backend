const express = require("express")
const {createMessage,getMessageById,getAllMessages,updateMessage,deleteMessage } = require("../controllers/messageContoller")
const {messageSchema} = require("../models/messageModel")
const {messageValidation} = require("../utils/msgValidation")
const router = express.Router()

router.post('/message',createMessage());
router.get('/message/:_id',getMessageById())
router.get('/message',getAllMessages())
router.put('/message/:_id',updateMessage())
router.delete('/message/:_id',deleteMessage())

module.exports.messageRoutes = router