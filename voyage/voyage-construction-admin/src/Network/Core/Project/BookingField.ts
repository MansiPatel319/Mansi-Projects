import { get, post } from "../../ApiService";
import { ApiUrl } from "../../ApiUrl";

export const getBookingDetail = async (ref: any) => {
  try {
    const res = await get(
      `${ApiUrl.project.getBookingDetailData}?project=${ref}`,
      "true"
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const getVehicleTypeList = async (ref: any) => {
  try {
    const res = await get(
      `${ApiUrl.project.getVehicleTypes}?project=${ref}`,
      "true"
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const saveCorefieldDetail = async (body:any,ref: any) => {
  try {
    const res = await post(
      `${ApiUrl.project.saveCoreFieldData}?project=${ref}`,body.saveData,
      "true"
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const saveFlexiblefieldDetail = async (body:any,ref: any) => {
  try {
    const res = await post(
      `${ApiUrl.project.saveFlexibleFieldData}?project=${ref}`,body.saveData,
      "true"
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const AddflexibleField = async (ref: any,body:any) => {
  try {
    const res = await post(
      `${ApiUrl.project.addFlexibleData}?project=${ref}`,body,
      "true"
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};