import * as types from '../actions/actionTypes';
const initialState = {
  addDetailsData: {
    id: null,
  },
  visible:false,
  creatorClassId :null,
  
};
const AddDetails = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ADD_DETAILS_DATA:
      return {
        ...state,
        addDetailsData: action.data,
      };
    case types.SET_OPEN_SIDEBAR:
      return {
        ...state,
        visible: action.visible,
      };
      case types.SET_CREATOR_CLASS_ID:
        return {
          ...state,
          creatorClassId: action.data,
        };

    default:
      return state;
  }
};

export default AddDetails;
