import * as types from '../actions/actionTypes';

const initialState = {
  searchPinLatitude: 34.70440749999999,
};

const SearchPinLatitude = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SEARCH_PIN_LATITUDE:
      return {
        ...state,
        searchPinLatitude: action.payload,
      };
    default:
      return state;
  }
};

export default SearchPinLatitude;
