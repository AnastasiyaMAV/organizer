// eslint-disable-next-line import/prefer-default-export
export const regularExpressions = {
  password: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  login: /^[a-z0-9_-]{3,16}$/,
};