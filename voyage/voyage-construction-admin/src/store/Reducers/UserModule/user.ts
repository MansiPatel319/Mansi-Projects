import ActionType from "../../Actions/ActionType";
import { userAction } from "../../Actions/UserModule/userAction";

const intialState = {
  filterData: {},
 
};

const user = (state: object = intialState, action: userAction) => {
  switch (action.type) {
    case ActionType.SET_USER_FILTER:
      return {
        ...state,
        filterData: action.data,
      };
    default:
      return state;
  }
};
export default user;
