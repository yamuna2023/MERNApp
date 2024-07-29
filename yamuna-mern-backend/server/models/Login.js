const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
  sno: { type: Number, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('Login', LoginSchema);
