import * as types from '../actions/actionTypes';

const initialState = {
  zoomLevel: 12,
};

const ZoomLevel = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ZOOM_LEVEL:
      return {
        ...state,
        zoomLevel: action.payload,
      };
    default:
      return state;
  }
};

export default ZoomLevel;
