import * as types from './actionTypes';
export const setMaterialSteps = (value) => ({
  type: types.SET_MATERIAL_STEPS,
  value,
});
export const setMaterialStep1 = (data) => ({
  type: types.SET_MATERIAL_STEP_1,
  data,
});
export const setMaterialStep2 = (data) => ({
  type: types.SET_MATERIAL_STEP_2,
  data,
});
