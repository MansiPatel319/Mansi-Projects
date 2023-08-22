import ActionType from "../ActionType";

interface setBookingListFilter {
    type:ActionType.SET_BOOKING_LIST_FILTER,
    data:any
}

export type bookingListAction = setBookingListFilter