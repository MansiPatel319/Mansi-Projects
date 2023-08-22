import { combineReducers } from "redux";
import language from "./langauge";
import auth from "./AuthModule/auth";
import inviteuser from "./InviteUserModule/inviteUser";
import sidebarDetail from "./Comman/sidebar";
import loader from "./Loader/loader";
import user from "./UserManagment/user";
import booking from "./BookingModule/booking" 
import bookinglist from "./BookingListModule/BookingList";

const rootReducer = combineReducers({
  language,
  auth,
  inviteuser,
  sidebarDetail,
  loader,
  user,
  booking,
  bookinglist
});

export default rootReducer;

export type State = ReturnType<typeof rootReducer>;
