/* eslint-disable no-undef */
export const isAuthenticated = () => {
  const permissions = localStorage.getItem('token');
  if (permissions) {
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const tokenExpire = (errorData, history) => {
  let status;
  if (errorData === undefined) {
    status = 500;
  } else {
    status = errorData;
  }

  switch (status) {
    case 400:
      logout();
      history.push('/');
      // history.push(`/${lang}/login`);
      break;
    default:
      break;
  }
};
