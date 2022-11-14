require('dotenv').config()
const cloudinary  = require("cloudinary")
const Cloudname = process.env.CLOUD_NAME
const cloudkey = process.env.CLOUD_KEY
const cloudsecret = process.env.CLOUD_SECRET


module.exports = cloudinary