const router = require('express').Router();

const {
  getContacts,
  createContact,
} = require('../controllers/contacts');

const {
  contactValidation,
} = require('../middlewares/validation/contactValidation');

router.get('/', getContacts);
router.post('/', contactValidation, createContact);

module.exports = router;