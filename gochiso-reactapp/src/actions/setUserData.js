import * as types from './actionTypes';

const setUserProfile = (data) => ({
  type: types.SET_USER_PROFILE_DATA,
  payload: data,
});

export default setUserProfile;
