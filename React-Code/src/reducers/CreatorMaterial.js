import * as types from '../actions/actionTypes';
const initialState = {
  currentStep: 1,
  materialStep1: {
    id: null,
  },
  materialStep2: {
    id: null,
  },
};
const CreatorMaterial = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_MATERIAL_STEP_1:
      return {
        ...state,
        materialStep1: action.data,
      };
    case types.SET_MATERIAL_STEP_2:
      return {
        ...state,
        materialStep2: action.data,
      };
    case types.SET_MATERIAL_STEPS:
      return {
        ...state,
        currentStep: action.value,
      };
    default:
      return state;
  }
};

export default CreatorMaterial;
