module.exports.userErr = {
  BadRequestError: 'Переданы некорректные данные',
  BadRequestPassError: 'Неверный пароль',
  ValidationError: 'Ошибка валидации при создании пользователя',
  NotFoundError: 'Запрашиваемый пользователь не найден',
  ConflictError: 'Пользователь с таким Логином или Email уже зарегистрирован',
};

module.exports.contactErr = {
  BadRequestError: 'Переданы некорректные данные',
  ValidationError: 'Ошибка валидации при создании контакта',
};

module.exports.validErr = {
  urlErr: 'Неверный URL-адрес',
  emailErr: 'Неверная почта',
};

module.exports.authErr = {
  UnauthorizedError: 'Ошибка аутентификации',
  AuthRequired: 'Необходима авторизация',
  userUnauthError: 'Неправильные почта или пароль',
};

module.exports.serverErr = {
  NotFoundError: 'Запрашиваемый ресурс не найден',
  InternalServerError: 'Ошибка сервера. Ошибка по-умолчанию',
  ServerError: 'На сервере произошла ошибка',
};
