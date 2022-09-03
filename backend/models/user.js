const mongoose = require('mongoose');
const validator = require('validator');

const { validErr } = require('../errors/errorMessages');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: validErr.emailErr,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
  admin: {
    type: Boolean,
    required: true,
    default: false,
  },
  lang: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 2,
    default: 'RU',
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);