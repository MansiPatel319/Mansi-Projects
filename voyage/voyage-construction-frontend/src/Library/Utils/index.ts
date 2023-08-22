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
  if (str.length >= 8) {
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
export function formatTime24to12Hour(timeString:any) {
  const [hourString, minute] = timeString.split(":");
  const hour = +hourString % 24;
  return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
}
export const lastdayOfMonth = (y: number, m: number)=> {
  return  new Date(y, m, 0).getDate();
  }
  export const getLastDayOfYear=(year:number) =>{
    return new Date(year, 11, 31,5,30);
  }