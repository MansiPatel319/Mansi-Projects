import * as types from './ActionTypes';

export const setMemoData = (dispatch, data) => {
  dispatch({ type: types.ADD_NEW_MEMO, payload: data });
};
export const setLanguage = (dispatch, data) => {
  dispatch({ type: types.SET_LANGUAGE, payload: data });
};
