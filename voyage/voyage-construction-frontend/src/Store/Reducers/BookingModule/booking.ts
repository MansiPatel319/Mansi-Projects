import ActionType from "../../Actions/ActionType";
import { setBookingAction } from "../../Actions/BookingModule/bookingAction";
import bookingSteps from "../../../StaticData/BookingForm/steps";

const intialState = {
  bookingSteps: bookingSteps,
  bookingType: '',
  showSitePlan:false,
};

const booking = (state: object = intialState, action: setBookingAction) => {
  switch (action.type) {
    case ActionType.SET_BOOKING_DETAILS:
      return {
        ...state,
        bookingSteps: action.data,
      };
    case ActionType.SET_BOOKING_TYPE:
      return {
        ...state,
        bookingType: action.data,
      };
      case ActionType.SHOW_SITE_PLAN:
        return {
          ...state,
          showSitePlan: action.data,
        };
    default:
      return state;
  }
};
export default booking;
