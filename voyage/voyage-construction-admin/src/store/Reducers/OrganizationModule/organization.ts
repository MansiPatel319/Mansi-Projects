import ActionType from "../../Actions/ActionType";
import { organizatinAction } from "../../Actions/OrganizationModule/organizationAction";

const intialState = {
  filterData: {},
 
};

const organization = (state: object = intialState, action: organizatinAction) => {
  switch (action.type) {
    case ActionType.SET_ORG_FILTER:
      return {
        ...state,
        filterData: action.data,
      };
    default:
      return state;
  }
};
export default organization;
