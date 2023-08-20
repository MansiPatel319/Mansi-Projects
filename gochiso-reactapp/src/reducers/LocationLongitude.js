import * as types from '../actions/actionTypes';

const initialState = {
  locationLongitude: undefined,
};

const LocationLongitude = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOCATION_LONGITUDE:
      return {
        ...state,
        locationLongitude: action.payload,
      };
    default:
      return state;
  }
};

export default LocationLongitude;
