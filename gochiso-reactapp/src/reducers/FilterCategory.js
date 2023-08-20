import * as types from '../actions/actionTypes';

const initialState = {
  activeKeywords: [],
};

const FilterCategory = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_FILTER_DATA:
      return {
        ...state,
        activeKeywords: action.payload,
      };
    default:
      return state;
  }
};

export default FilterCategory;
