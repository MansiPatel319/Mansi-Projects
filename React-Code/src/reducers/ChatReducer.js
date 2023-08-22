import * as types from '../actions/actionTypes';
const initialState = {
  messages: [],
};

const AddDetails = (state = initialState, action) => {

  switch (action.type) {
    case types.SET_CHAT_MESSAGE:
      return {
        ...state,
        messages: action.payload,
      };

    default:
      return state;
  }
};

export default AddDetails;
