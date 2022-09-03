const Contact = require('../models/contact');

const BadRequestError = require('../errors/400 - BadRequestError');
const InternalServerError = require('../errors/500 - InternalServerError');

const { contactErr, serverErr } = require('../errors/errorMessages');

const {
  SUCCESS_OK,
} = require('../errors/errorStatuses');

// вернуть все контакты
module.exports.getContacts = (req, res, next) => {
  Contact.find({})
    .then((contacts) => res.status(SUCCESS_OK).send(contacts))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError(contactErr.BadRequestError);
      }
      throw new InternalServerError(serverErr.InternalServerError);
    })
    .catch(next);
};

// создать контакт
module.exports.createContact = (req, res, next) => {
  const {
    surname, name, patronymic, organization, position,
    phone, phoneAdd, site, email, emailAdd, link,
    country, region, city, address, info, vcf,
  } = req.body;

  Contact.create({
    surname,
    name,
    patronymic,
    organization,
    position,
    phone,
    phoneAdd,
    site,
    email,
    emailAdd,
    link,
    country,
    region,
    city,
    address,
    info,
    vcf,
  })
    .then((contact) => {
      res.status(SUCCESS_OK).send(contact);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(contactErr.ValidationError);
      } else if (err.name === 'CastError') {
        throw new BadRequestError(contactErr.BadRequestError);
      }
      throw new InternalServerError(serverErr.InternalServerError);
    })
    .catch(next);
};