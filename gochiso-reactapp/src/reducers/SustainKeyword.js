import * as types from '../actions/actionTypes';

const initialState = {
  sustainKeyword: [],
};

const SustainKeyword = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SUSTAIN_KEYWORD:
      return {
        ...state,
        sustainKeyword: action.payload,
      };
    default:
      return state;
  }
};

export default SustainKeyword;
