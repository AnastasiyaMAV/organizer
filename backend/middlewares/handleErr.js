const ERROR_SERVER = require('../errors/errorStatuses');
const { serverErr } = require('../errors/errorMessages');

module.exports.handleErr = (err, req, res, next) => {
  const { statusCode = ERROR_SERVER, message } = err;

  res.status(statusCode).send({
    message: statusCode === ERROR_SERVER
      ? serverErr.ServerError
      : message,
  });

  next();
};