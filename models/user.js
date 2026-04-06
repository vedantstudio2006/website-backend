const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', ContactSchema);