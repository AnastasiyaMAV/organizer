/* eslint-disable prefer-promise-reject-errors */
// url бэкенда
export const BACK_URL = 'http://localhost:4000';

// заголовки
export const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

// фиксация промиса
export const fixPromise = (res) => (
  res.ok ? res.json()
    : Promise.reject(`Произошла ошибка ${res.status}: ${res.statusText}`)
);

// переменные страниц
export const path = {
  main: '/',
  signin: '/signin',
  signup: '/signup',
  users: '/users',
  contacts: '/contacts',
  docs: '/docs',
  profile: '/profile',
};

export const langValue = {
  RU: 'RU',
  EN: 'EN',
  DE: 'DE',
};