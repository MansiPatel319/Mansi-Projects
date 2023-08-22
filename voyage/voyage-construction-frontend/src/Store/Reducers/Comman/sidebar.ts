import { setSidebarDetailsAction } from "../../Actions/comman/sidebarAction";
import ActionType from "../../Actions/ActionType";

const intialState = {
    isSiteDetailMenueOpen:false
};

const sidebarDetail = (state: object = intialState, action: setSidebarDetailsAction) => {
  switch (action.type) {
    case ActionType.SET_SIDEBAR_DETAILS:
      return {
        ...state,
        isSiteDetailMenueOpen: action.data,
      };
    default:
      return state;
  }
};
export default sidebarDetail;
