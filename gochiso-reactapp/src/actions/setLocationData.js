import * as types from './actionTypes';

export const setFormattedAddress = (data) => ({
  type: types.SET_FORMATTED_ADDRESS,
  payload: data,
});

export const setLocationLatitude = (data) => ({
  type: types.SET_LOCATION_LATITUDE,
  payload: data,
});

export const setLocationLongitude = (data) => ({
  type: types.SET_LOCATION_LONGITUDE,
  payload: data,
});

export const setSearchPinLatitude = (data) => ({
  type: types.SET_SEARCH_PIN_LATITUDE,
  payload: data,
});

export const setSearchPinLongitude = (data) => ({
  type: types.SET_SEARCH_PIN_LONGITUDE,
  payload: data,
});

export const setZoomLevel = (data) => ({
  type: types.SET_ZOOM_LEVEL,
  payload: data,
});

export const setRadiusLevel = (data) => ({
  type: types.SET_RADIUS_LEVEL,
  payload: data,
});
