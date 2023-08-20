import * as types from '../actions/actionTypes';

const initialState = {
  lang: 'en',
};

const DefaultLanguage = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LANGUAGE:
      return {
        ...state,
        lang: action.payload,
      };
    default:
      return state;
  }
};

export default DefaultLanguage;
