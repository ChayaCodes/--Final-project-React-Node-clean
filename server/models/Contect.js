const mongoose = require('mongoose');

const { Schema } = mongoose;

const ContectSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
    unique: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  phone: {
    type: String,
    required: false,
    trim: true,
    minlength: 7,
    maxlength: 10,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  message: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
   });

module.exports = mongoose.model('Contect', ContectSchema);
