/* eslint-disable operator-linebreak */
/* eslint-disable consistent-return */
/* eslint-disable implicit-arrow-linebreak */
import moment from 'moment';

export const randomStrForId = () =>
  `id-${Math.random().toString().substr(2, 5)}`;

export const dateDifference = (inputData) =>
  moment(new Date(inputData)).fromNow();

export const isRequired = (value) => {
  if (value === '' || value === undefined || value === null) {
    // return { isRequired: true, message: `${name} is required ` };
    return true;
  }
};

export function validateEmail(email) {
  const emailRegx = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,16})+$/);
  return emailRegx.test(email) !== false;
}
export function isCheckLength(value, length) {
  if (value.length !== length) {
    return true;
  }
}

export function isCheckOnlyNumber(value) {
  const numberRegx = new RegExp(/^[0-9\b]+$/);
  return numberRegx.test(value) !== false;
}
export function isPassword(value) {
  let str = value;
  if (
    str.match(/[a-z]/g) &&
    str.match(/[A-Z]/g) &&
    str.match(/[0-9]/g) &&
    str.match(/[^a-zA-Z\d]/g) &&
    str.length >= 8
  ) {
    return true;
  }
  return false;
}

export function calculateAge(birthday) {
  // birthday is a date
  let ageDifMs = Date.now() - new Date(birthday).getTime();
  let ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
