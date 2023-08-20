import * as types from '../actions/actionTypes';

const initialState = {
  searchPinLongitude: 135.49747990000003,
};

const SearchPinLongitude = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SEARCH_PIN_LONGITUDE:
      return {
        ...state,
        searchPinLongitude: action.payload,
      };
    default:
      return state;
  }
};

export default SearchPinLongitude;
