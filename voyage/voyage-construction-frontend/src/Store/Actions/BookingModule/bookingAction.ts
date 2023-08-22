import ActionType from "../ActionType";

interface setBookingDetails{
  type: ActionType.SET_BOOKING_DETAILS;
  data: any
}
interface setBookingType{
  type: ActionType.SET_BOOKING_TYPE;
  data: string
}
interface showSitePlan{
  type: ActionType.SHOW_SITE_PLAN;
  data: string
}


export type setBookingAction = setBookingDetails | setBookingType |showSitePlan;
