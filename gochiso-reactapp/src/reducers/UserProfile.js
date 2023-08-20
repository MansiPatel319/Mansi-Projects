import * as types from '../actions/actionTypes';

const initialState = {
  profileData: undefined,
};

const UserProfile = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER_PROFILE_DATA:
      return {
        ...state,
        profileData: action.payload,
      };
    default:
      return state;
  }
};

export default UserProfile;
