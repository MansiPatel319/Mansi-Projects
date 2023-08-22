import ActionType from "../../Actions/ActionType";
import { loaderAction } from "../../Actions/Loader/LoaderAction";

const intialState = {
  loading:false
};
const loader = (state: object = intialState, action: loaderAction) => {
  switch (action.type) {
    case ActionType.SET_LOADER:
      return {
        ...state,
        loading: action.data,
      };
    default:
      return state;
  }
};
export default loader;
