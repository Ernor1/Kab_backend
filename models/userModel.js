const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    default: "?Dh3444440"

  }
})

module.exports.userModel = new mongoose.model('Clients', signupSchema)
