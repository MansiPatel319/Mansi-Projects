import * as types from '../actions/actionTypes';

const initialState = {
  path: null,
};

const addRedirection = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_REDIRECTION_PATH:
      return {
        ...state,
        path: action.payload,
      };
    default:
      return state;
  }
};

export default addRedirection;
