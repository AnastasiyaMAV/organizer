import * as constants from '../constants/constants';

const { BACK_URL, headers, fixPromise } = constants;

// вход
export const login = ({ email, password }) => fetch(`${BACK_URL}/signin`, {
  method: 'POST',
  headers,
  body: JSON.stringify({
    email,
    password,
  }),
}).then((res) => fixPromise(res));

// регистрация
export const register = ({
  name, email, password, lang, admin,
}) => fetch(
  `${BACK_URL}/signup`,
  {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name,
      email,
      password,
      lang,
      admin,
    }),
  },
).then((res) => fixPromise(res));

// запрос данных пользователя
export const getUserInfo = (token) => fetch(`${BACK_URL}/users/me`, {
  method: 'GET',
  headers: {
    headers,
    Authorization: `Bearer ${token}`,
  },
}).then((res) => fixPromise(res));

// изменить данные пользователя
export const editUserInfo = (token, { name, email, lang }) => fetch(`${BACK_URL}/users/me`, {
  method: 'PATCH',
  headers: {
    ...headers,
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    name,
    email,
    lang,
  }),
}).then((res) => fixPromise(res));

// изменить данные администратора
export const editAdminInfo = (token, {
  name, email, admin, lang,
}) => fetch(`${BACK_URL}/users/me/admin`, {
  method: 'PATCH',
  headers: {
    ...headers,
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    name,
    email,
    admin,
    lang,
  }),
}).then((res) => fixPromise(res));

// изменить язык пользователя
export const editUserLang = (token, { lang }) => fetch(`${BACK_URL}/users/me/lang`, {
  method: 'PATCH',
  headers: {
    ...headers,
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ lang }),
}).then((res) => fixPromise(res));

// запрос на получение всех пользователей
export const getAllUsers = (token) => fetch(`${BACK_URL}/users`, {
  method: 'GET',
  headers: {
    headers,
    Authorization: `Bearer ${token}`,
  },
}).then((res) => fixPromise(res));

// изменить данные пользователя на правах админа
export const editUserInfoAdmin = (token, {
  _id, name, email, lang,
}) => fetch(`${BACK_URL}/users/${_id}`, {
  method: 'PATCH',
  headers: {
    ...headers,
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    name,
    email,
    lang,
  }),
}).then((res) => fixPromise(res));