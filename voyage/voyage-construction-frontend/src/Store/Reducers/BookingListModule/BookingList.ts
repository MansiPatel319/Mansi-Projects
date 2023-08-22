import ActionType from "../../Actions/ActionType";
import { bookingListAction } from "../../Actions/BookingList/BookingListAction";
const intialState = {
    filterData: {},
    search: '',
    updateUser:false,
  };

const bookinglist = (state:object = intialState, action:bookingListAction) => {
    switch (action.type){
        case ActionType.SET_BOOKING_LIST_FILTER:
            console.warn(state);
            return {
                ...state,
                filterData:action.data
            }
        default:
            return intialState
    }
}

export default bookinglist