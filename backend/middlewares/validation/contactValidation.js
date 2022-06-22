const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const { validErr } = require('../../errors/errorMessages');

// eslint-disable-next-line no-unused-vars
const verifyUrl = (value) => {
  if (validator.isURL(value, { require_protocol: true })) {
    return value;
  }
  return value.message(validErr.urlErr);
};

module.exports.contactValidation = celebrate({
  body: Joi.object().keys({
    surname: Joi.string().required().min(2).max(30),
    name: Joi.string().required().min(2).max(30),
    patronymic: Joi.string().min(2).max(30),
    organization: Joi.string().min(2).max(30),
    position: Joi.string().min(2).max(30),

    // ! сделать проверку номера
    phone: Joi.string().required().min(6).max(24),
    phoneAdd: Joi.string().min(6).max(24),

    site: Joi.string(), // .custom(verifyUrl),
    email: Joi.string().required().email(),
    emailAdd: Joi.string().email(),
    link: Joi.string().required().min(3).max(6),

    country: Joi.string().required().min(2).max(30),
    region: Joi.string().required().min(2).max(30),
    city: Joi.string().required().min(2).max(30),
    address: Joi.string().required().min(2).max(30),
    info: Joi.string().required().min(2).max(50),
    vcf: Joi.string().required().min(2).max(30),
  }),
});

module.exports.signupValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((value, url) => {
      if (validator.isURL(value, { require_protocol: true })) {
        return url;
      }
      return value.message('Неверный URL-адрес');
    }),
  }),
});