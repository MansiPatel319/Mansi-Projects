import * as types from './actionTypes';

const setLanguage = (data) => ({
  type: types.SET_LANGUAGE,
  payload: data,
});

export default setLanguage;
