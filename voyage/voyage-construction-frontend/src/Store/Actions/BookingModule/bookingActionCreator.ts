import ActionType from "../ActionType";

export const setBookingDetails = (data: any) => ({
  type: ActionType.SET_BOOKING_DETAILS,
  data,
});

export const setBookingType = (data: string) => ({
  type: ActionType.SET_BOOKING_TYPE,
  data,
});
export const setShowSitePlan = (data: string) => ({
  type: ActionType.SHOW_SITE_PLAN,
  data,
});
