const winston = require('winston');
const expressWinston = require('express-winston');
const path = require('path');

const loggersPath = path.join(__dirname, '../logs');

// логгер запросов
module.exports.requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: path.join(loggersPath, 'request.log') }),
  ],
  format: winston.format.json(),
});

// логгер ошибок
module.exports.errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: path.join(loggersPath, 'error.log') }),
  ],
  format: winston.format.json(),
});