/* eslint-disable import/prefer-default-export */
import * as RU from './ru';
import * as EN from './en';
import * as DE from './de';

export const localize = (lang) => {
  if (lang === 'EN') {
    return EN;
  } if (lang === 'DE') {
    return DE;
  }
  return RU;
};