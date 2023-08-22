import * as types from '../actions/actionTypes';
const initialState = {
  creatorClassFileObject: {},
  creatorClassFileUrl: '',
};
const CreatorFileStore = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CREATOR_CLASS_FILE_OBJECT:
      return {
        ...state,
        creatorClassFileObject: action.data,
      };
    case types.SET_CREATOR_CLASS_FILE_URL:
      return {
        ...state,
        creatorClassFileUrl: action.data,
      };
    default:
      return state;
  }
};

export default CreatorFileStore;
