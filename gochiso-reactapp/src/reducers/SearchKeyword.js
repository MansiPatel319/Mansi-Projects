import * as types from '../actions/actionTypes';

const initialState = {
  query: '',
};

const SearchKeyword = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SEARCH_KEYWORD:
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

export default SearchKeyword;
