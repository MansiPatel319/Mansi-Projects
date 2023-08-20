import * as types from './actionTypes';

const setSearchKeyword = (data) => ({
  type: types.SET_SEARCH_KEYWORD,
  payload: data,
});

export default setSearchKeyword;
