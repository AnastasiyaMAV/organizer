const { celebrate, Joi } = require('celebrate');

module.exports.signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports.signupValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    admin: Joi.boolean().required(),
    lang: Joi.string().required().length(2),
  }),
});

module.exports.userIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
});

module.exports.updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    lang: Joi.string().required().min(2).max(2),
  }),
});

module.exports.updateUserAdminValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    admin: Joi.boolean(),
    lang: Joi.string().required().min(2).max(2),
  }),
});

module.exports.updateUserLangValidation = celebrate({
  body: Joi.object().keys({
    lang: Joi.string().required().min(2).max(2),
  }),
});

module.exports.updateUserPassValidation = celebrate({
  body: Joi.object().keys({
    password: Joi.string().required().min(8),
    newPassword: Joi.string().required().min(8),
  }),
});