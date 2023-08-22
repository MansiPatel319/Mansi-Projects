import * as types from '../actions/actionTypes';
const initialState = {
  type: '',
};

const JoiningType = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_JOINING_TYPE:
      return {
        ...state,
        type: action.payload,
      };

    default:
      return state;
  }
};

export default JoiningType;