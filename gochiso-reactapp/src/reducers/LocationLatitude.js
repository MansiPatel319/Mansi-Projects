import * as types from '../actions/actionTypes';

const initialState = {
  locationLatitude: undefined,
};

const LocationLatitude = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOCATION_LATITUDE:
      return {
        ...state,
        locationLatitude: action.payload,
      };
    default:
      return state;
  }
};

export default LocationLatitude;
