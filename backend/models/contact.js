const mongoose = require('mongoose');
const validator = require('validator');

const { validErr } = require('../errors/errorMessages');

const contactSchema = new mongoose.Schema({
  avatar: {
    type: String,
  },
  surname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  patronymic: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  organization: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  position: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  phone: {
    type: String,
    required: true,
  },
  phoneAdd: {
    type: String,
  },
  site: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: validErr.emailErr,
    },
  },
  emailAdd: {
    type: String,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: validErr.emailErr,
    },
  },
  link: {
    type: String,
  },
  country: {
    type: String,
  },
  region: {
    type: String,
  },
  city: {
    type: String,
  },
  address: {
    type: String,
  },
  info: {
    type: String,
    maxlength: 50,
  },
  vcf: {
    type: String,
  },
}, { versionKey: false });

module.exports = mongoose.model('contact', contactSchema);