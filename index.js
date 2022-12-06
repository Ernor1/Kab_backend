const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const joi = require("joi");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const cors = require("cors");
const { application, urlencoded } = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
dotenv.config();
const PORT = process.env.PORT
const dbConnection = require('./middleware/database')
const schema = require('./models/productModel')
const {productRoutes} = require('./routes/productRouter')
const {messageRoutes} = require("./routes/messageRouter")
const {wishRoutes} = require("./routes/wishRoutes")
const {contactRoutes} = require("./routes/contactRoutes")
const {cartRoutes} = require("./routes/cartRoutes")
const fileupload  = require('express-fileupload')
const {adminRoutes} = require("./routes/adminRoutes");
const {userRoutes} = require("./routes/userRoutes");
require("dotenv/config");

app.use(fileupload())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(productRoutes)
app.use(messageRoutes)
app.use(wishRoutes)
app.use(contactRoutes)
app.use(cartRoutes)
app.use(adminRoutes)
app.use(userRoutes)
// app.use(express.static)


app.use(cors({
    
    explore:true,
}))

var options = {
    explore:true,
}

const upload = multer({dest: './uploads'});
var type = upload.single('recfile')

dbConnection();



app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})