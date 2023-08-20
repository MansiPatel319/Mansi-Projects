import * as types from '../actions/actionTypes';
import placeTypeData from '../constants/placeTypeData';

const initialState = {
  placeTypekeyword: placeTypeData,
};

const PlaceKeyword = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_PLACETYPE_KEYWORD:
      return {
        ...state,
        placeTypekeyword: action.payload,
      };
    default:
      return state;
  }
};

export default PlaceKeyword;
