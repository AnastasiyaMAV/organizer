const router = require('express').Router();

const { login, register } = require('../controllers/users');
const {
  signinValidation,
  signupValidation,
} = require('../middlewares/validation/userValidation');
const auth = require('../middlewares/auth');

const usersRoutes = require('./users');
const contactsRoutes = require('./contacts');

const NotFoundError = require('../errors/404 - NotFoundError');
const { serverErr } = require('../errors/errorMessages');

router.post('/signup', signupValidation, register);
router.post('/signin', signinValidation, login);

router.use('/users', auth, usersRoutes);
router.use('/contacts', auth, contactsRoutes);

router.get('*', () => {
  throw new NotFoundError(serverErr.NotFoundError);
});

module.exports = router;