
export function validateEmail(email) {
  const emailRegx = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
  return emailRegx.test(email) !== false;
}