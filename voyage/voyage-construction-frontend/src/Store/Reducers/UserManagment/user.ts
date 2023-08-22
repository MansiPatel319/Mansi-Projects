import ActionType from "../../Actions/ActionType";
import { userAction } from "../../Actions/UserManagment/userAction";

const intialState = {
  filterData: {},
  search: '',
  updateUser:false,
};
const user = (state: object = intialState, action: userAction) => {
  switch (action.type) {
    case ActionType.SET_USER_FILTER:
      return {
        ...state,
        filterData: action.data,
      };
      case ActionType.SET_SEARCH:
        return {
          ...state,
          search: action.data,
      };
      case ActionType.UPDATE_USER:
        return {
          ...state,
          updateUser: action.data,
        };
    default:
      return state;
  }
};
export default user;