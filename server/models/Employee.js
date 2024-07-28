const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  image: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  designation: { type: String, required: true }
});

module.exports = mongoose.model('Employee', EmployeeSchema);
