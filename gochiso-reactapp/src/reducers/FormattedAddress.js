import * as types from '../actions/actionTypes';

const initialState = {
  formattedAddress: undefined,
};

const FormattedAddress = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_FORMATTED_ADDRESS:
      return {
        ...state,
        formattedAddress: action.payload,
      };
    default:
      return state;
  }
};

export default FormattedAddress;
