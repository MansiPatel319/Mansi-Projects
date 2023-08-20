import * as types from '../actions/actionTypes';

const initialState = {
  radiusLevel: 10,
};

const RadiusLevel = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_RADIUS_LEVEL:
      return {
        ...state,
        radiusLevel: action.payload,
      };
    default:
      return state;
  }
};

export default RadiusLevel;
