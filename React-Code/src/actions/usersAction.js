import * as types from './actionTypes';
export const setCreatorData = (value) => ({
  type: types.SET_CREATOR_DATA,
  value,
});
export const setSignupData = (payload) => ({
  type: types.SET_SIGNUP_DATA,
  payload,
});
