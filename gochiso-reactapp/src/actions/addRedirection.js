import * as types from './actionTypes';

const setRedirectPath = (data) => ({
  type: types.SET_REDIRECTION_PATH,
  payload: data,
});

export default setRedirectPath;
