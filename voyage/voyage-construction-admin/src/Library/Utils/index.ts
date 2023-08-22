export const isRequired = (value: string) => {
  if (value === "" || value === undefined || value === null) {
    return true;
  }
  return false;
};

export function validateEmail(email: string) {
  const emailRegx = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,16})+$/);
  return emailRegx.test(email) !== false;
}
export function validatePhoneNumber(phonenumber: string) {
  const phonenumberRegx = new RegExp(
    /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
  );
  return phonenumberRegx.test(phonenumber) !== false;
}
export function isValidUrl (url: string) {
  const urlRegex = new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/) ;
 
  const result = url.match(urlRegex);
  return result !== null;
};

export function isPassword(value: string) {
  const str = value;
  if (
    str.match(/[a-z]/g) &&
    str.match(/[A-Z]/g) &&
    str.match(/[0-9]/g) &&
    str.match(/[^a-zA-Z\d]/g) &&
    str.length >= 6 &&
    str.length <= 16
  ) {
    return true;
  }
  return false;
}
export function isCheckUppercase(value: string) {
  const str = value;
  if (str.match(/[A-Z]/g)) {
    return true;
  }
  return false;
}
export function isCheckLowercase(value: string) {
  const str = value;
  if (str.match(/[a-z]/g)) {
    return true;
  }
  return false;
}
export function isCheckNumber(value: string) {
  const str = value;
  if (str.match(/[A-Z]/g)) {
    return true;
  }
  return false;
}
export function isCheckSpecialChar(value: string) {
  const str = value;
  if (str.match(/[^a-zA-Z\d]/g)) {
    return true;
  }
  return false;
}
export function isCheckMinLength(value: string) {
  const str = value;
  if (str.length >= 6) {
    return true;
  }
  return false;
}
export function isCheckMaxLength(value: string) {
  const str = value;
  if (str.length <= 16) {
    return true;
  }
  return false;
}
