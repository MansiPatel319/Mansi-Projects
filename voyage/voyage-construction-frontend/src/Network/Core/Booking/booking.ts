import { get , post } from "../../ApiService";
import { ApiUrl } from "../../ApiUrl";

export const getVehicleTypeList = async (ref: any) => {
  try {
    const res = await get(
      `${ApiUrl.booking.getVehicleTypes}?project=${ref}`,
      "true"
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};

export const reserveBookingSlot = async (ref: any,siteId:any,data:any) => {
  try {
    const res = await post(
      `${ApiUrl.booking.reserveSlots}?project=${ref}&site_id=${siteId}`,data,
      "true"
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const createBooking = async (ref: any, siteId: any, data: any) => {
  try {
    const res = await post(
      `${ApiUrl.booking.createBookingcall}?project=${ref}&site_id=${siteId}`, data,
      "true"
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
}
export const getSlots = async (ref: any,params:any,data:any) => {
  try {
    const res = await get(
      `${ApiUrl.booking.slots}?${params}`,
      "true"
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const getProjectSettingList = async (ref: any) => {
  try {
    const res = await get(
      `${ApiUrl.booking.getProjectSetting}?project=${ref}`,
      "true"
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};