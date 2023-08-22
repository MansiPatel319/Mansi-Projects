import { AuthAction } from "../../Actions/AuthModule/authAction";
import ActionType from "../../Actions/ActionType";

const intialState = {
  user: {
    username: "",
    email: "mansi@yopmail.com",
    password: "Mansi@123",
  },
  project: {}
};

const auth = (state: object = intialState, action: AuthAction) => {
  switch (action.type) {
    case ActionType.SET_USER_DETAILS:
      return {
        ...state,
        user: action.data,
      };
    case ActionType.SET_PROJECT_DETAILS:
      return {
        ...state,
        project: action.data,
      };
    default:
      return state;
  }
};
export default auth;
