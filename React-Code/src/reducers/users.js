import * as types from '../actions/actionTypes';

const initialState = {
  signupData: '',
  creatoruser: '',
};

const authUser = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SIGNUP_DATA:
      return {
        ...state,
        signupData: action.payload,
      };
    case types.SET_CREATOR_DATA:
      return {
        ...state,
        creatoruser: action.value,
      };
    default:
      return state;
  }
};

export default authUser;
