import ActionType from "../ActionType";

export const setBookingListFilter = (data: object) => ({
  type: ActionType.SET_BOOKING_LIST_FILTER,
  data,
});