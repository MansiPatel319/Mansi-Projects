import { useReducer } from 'react';
import * as types from '../ActionTypes';

const initialState = {
  memos: [],
  lang: 'en',
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.INITIAL_VALUE:
      return {};
    case types.ADD_NEW_MEMO:
      return { ...state, memos: action.payload };
    case types.SET_LANGUAGE:
      return { ...state, lang: action.payload };
    default:
      return state;
  }
};

const useIEReducer = () => useReducer(reducer, initialState);

export default useIEReducer;
