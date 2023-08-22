import { useDispatch } from "react-redux";
import { getLocalStorage } from "../../Network/ApiService";
import { setUserDeatils } from "../../Store/Actions/AuthModule/authActionCreator";
import { constants } from "../Constants";

export const isAuth = () => {
  const permissions = getLocalStorage(constants.LOGIN_TOKEN);
  const isEmpty = Object.keys(permissions).length === 0;

  if (!isEmpty) {
    return true;
  }
  return false;
};
export const handleLogout = () => {
  const dispatch = useDispatch();
  localStorage.removeItem(constants.LOGIN_TOKEN);
  localStorage.removeItem(constants.PROJECT);
  localStorage.removeItem(constants.USER);
  dispatch(setUserDeatils([]));
};
