/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const BadRequestError = require('../errors/400 - BadRequestError');
const UnauthorizedError = require('../errors/401 - UnauthorizedError');
const NotFoundError = require('../errors/404 - NotFoundError');
const ConflictError = require('../errors/409 - ConflictError');
const InternalServerError = require('../errors/500 - InternalServerError');

const { userErr, authErr, serverErr } = require('../errors/errorMessages');
const { successOk } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const {
  SUCCESS_OK,
  ERROR_CODE,
  ERROR_NOT_FOUND,
} = require('../errors/errorStatuses');

// зарегистрировать пользователя
module.exports.register = (req, res, next) => {
  const {
    email, password, name, lang, admin,
  } = req.body;

  bcrypt
    .hash(password, 8)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      lang,
      admin,
    })
      .then((user) => res.status(SUCCESS_OK).send({
        name: user.name,
        email: user.email,
      }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          throw new BadRequestError(userErr.ValidationError);
        }
        if (err.name === 'CastError') {
          throw new BadRequestError(userErr.BadRequestError);
        }
        if (err.name === 'MongoError' && err.code === 11000) {
          throw new ConflictError(userErr.ConflictError);
        }
        throw new InternalServerError(serverErr.InternalServerError);
      }))
    .catch(next);
};

// проверить переданные в теле почту и пароль и вернуть JWT
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(authErr.userUnauthError));
      }

      return bcrypt.compare(password, user.password)
        // eslint-disable-next-line consistent-return
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(authErr.userUnauthError));
          }

          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
            { expiresIn: '7d' },
          );

          res.status(SUCCESS_OK).send({ token });
        });
    })
    .catch(() => {
      throw new UnauthorizedError(authErr.UnauthorizedError);
    })
    .catch(next);
};

// вернуть информацию о пользователе (email и имя)
module.exports.getUser = (req, res, next) => {
  User.findById(req.user)
    .orFail(new Error('NotFound'))
    .then((user) => res.status(SUCCESS_OK).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError(userErr.BadRequestError);
      }
      if (err.message === 'NotFound') {
        throw new NotFoundError(userErr.NotFoundError);
      }
      throw new InternalServerError(serverErr.InternalServerError);
    })
    .catch(next);
};

// вернуть всех пользователей
module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .orFail(new Error('NotFound'))
    .then((users) => res.status(SUCCESS_OK).send(users))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError(userErr.BadRequestError);
      }
      if (err.message === 'NotFound') {
        throw new NotFoundError(userErr.NotFoundError);
      }
      throw new InternalServerError(serverErr.InternalServerError);
    })
    .catch(next);
};

// обновить информацию о пользователе (email и имя)
module.exports.updateUser = (req, res, next) => {
  const { name, email, lang } = req.body;
  const { userId } = req.params;

  User.findByIdAndUpdate(
    userId,
    { name, email, lang },
    { new: true, runValidators: true },
  )
    .orFail(new Error('NotFound'))
    .then((user) => res.status(SUCCESS_OK).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError(userErr.BadRequestError);
      }
      if (err.message === 'NotFound') {
        throw new NotFoundError(userErr.NotFoundError);
      }
      if (err.name === 'MongoError' && err.code === 11000) {
        throw new ConflictError(userErr.ConflictError);
      }
      throw new InternalServerError(serverErr.InternalServerError);
    })
    .catch(next);
};

// редактирование админа
module.exports.updateUserAdmin = (req, res, next) => {
  const {
    name, email, admin, lang,
  } = req.body;
  const { userId } = req.params;

  User.findByIdAndUpdate(
    userId,
    {
      name,
      email,
      admin,
      lang,
    },
    { new: true, runValidators: true },
  )
    .orFail(new Error('NotFound'))
    .then((user) => res.status(SUCCESS_OK).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError(userErr.BadRequestError);
      }
      if (err.message === 'NotFound') {
        throw new NotFoundError(userErr.NotFoundError);
      }
      if (err.name === 'MongoError' && err.code === 11000) {
        throw new ConflictError(userErr.ConflictError);
      }
      throw new InternalServerError(serverErr.InternalServerError);
    })
    .catch(next);
};

// изменить язык пользователя
module.exports.updateUserLang = (req, res, next) => {
  const { lang } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { lang },
    { new: true, runValidators: true },
  )
    .orFail(new Error('NotFound'))
    .then((user) => res.status(SUCCESS_OK).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError(userErr.BadRequestError);
      }
      if (err.message === 'NotFound') {
        throw new NotFoundError(userErr.NotFoundError);
      }
      if (err.name === 'MongoError' && err.code === 11000) {
        throw new ConflictError(userErr.ConflictError);
      }
      throw new InternalServerError(serverErr.InternalServerError);
    })
    .catch(next);
};

// изменение пароля
module.exports.updatePass = async (req, res, next) => {
  const { password, newPassword } = req.body;
  const { userId } = req.params;

  await User.findById(userId)
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(userErr.NotFoundError));
      }

      bcrypt.compare(password, user.password)
        // eslint-disable-next-line consistent-return
        .then((matched) => {
          if (!matched) {
            return res.status(ERROR_CODE).send({
              message: userErr.BadRequestPassError,
            });
          }
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError(userErr.BadRequestError);
      }
      if (err.message === 'NotFound' || err.message === userErr.NotFoundError) {
        throw new NotFoundError(userErr.NotFoundError);
      }
      throw new InternalServerError(serverErr.InternalServerError);
    })
    .catch(next);

  await bcrypt
    .hash(newPassword, 8)
    .then((hash) => User.findByIdAndUpdate(
      userId,
      { password: hash },
      { new: true, runValidators: true },
    ).then((user) => res.status(SUCCESS_OK).send({
      message: 'Пароль успешно изменен',
    }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          throw new BadRequestError(userErr.ValidationError);
        }
        if (err.name === 'CastError') {
          throw new BadRequestError(userErr.BadRequestError);
        }
        if (err.name === 'MongoError' && err.code === 11000) {
          throw new ConflictError(userErr.ConflictError);
        }
        throw new InternalServerError(serverErr.InternalServerError);
      }))
    .catch(next);
};

// удаление пользователя
module.exports.deleteUser = (req, res, next) => {
  const { userId } = req.params;

  User.findByIdAndRemove(userId)
    .orFail(new Error('NotFound'))
    .then(() => res.status(SUCCESS_OK).send({
      message: successOk.deleteUser,
    }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        throw new NotFoundError(userErr.NotFoundError);
      }
      throw new InternalServerError(serverErr.InternalServerError);
    })
    .catch(next);
};

// ! после nodemailer сделать сброс пароля
// https://www.npmjs.com/package/nodemailer
// https://morioh.com/p/6cb2170e8b68
// https://devsday.ru/blog/details/41395