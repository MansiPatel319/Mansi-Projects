import * as types from './actionTypes';

const setFilterCategoryData = (data) => ({
  type: types.SET_FILTER_DATA,
  payload: data,
});

export default setFilterCategoryData;
