import { AuthAction } from "../../Actions/InviteUserModule/InviteUserAction";
import ActionType from "../../Actions/ActionType";

const intialState = {
  userdetail: {
    firstname:'',
    lastname: '',
    phonenumber: '',
    companyname:"",
    organization_id:'',
    address:'',
    email:'',
    password:'',
    project_role:'',
    project_ref:''
  },
};
const inviteuser = (state: object = intialState, action: AuthAction) => {
  switch (action.type) {
    case ActionType.SET_INVITE_USER_DETAILS:
      return {
        ...state,
        userdetail: action.data,
      };
    default:
      return state;
  }
};
export default inviteuser;
