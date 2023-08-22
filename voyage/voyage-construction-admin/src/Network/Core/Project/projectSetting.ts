import { get, patch, post, put } from "../../ApiService";
import { ApiUrl } from "../../ApiUrl";

export const getLanguageList = async (ref:any) => {
  try {
    
    const res = await get(`${ApiUrl.project.getLanguages}?project=${ref}`, "true");
    return res;
  } catch (error: any) {
    return error.response;
  }
};

export const getDateFormatList = async (ref:any) => {
  try {
    const res = await get(`${ApiUrl.project.getDateFormates}?project=${ref}`, "true");
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const getTimeFormatList = async (ref:any) => {
  try {
    const res = await get(`${ApiUrl.project.getTimeFormates}?project=${ref}`, "true");
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const getCalenderDaysList = async (ref:any) => {
  try {
    const res = await get(`${ApiUrl.project.getCalenderDays}?project=${ref}`, "true");
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const getProjectSettingList = async (ref: any) => {
  try {
    const res = await get(
      `${ApiUrl.project.getProjectSetting}?project=${ref}`,
      "true"
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};

export const updateProjectSettingList = async (ref: any, data: any) => {
  try {
    const res = await post(
      `${ApiUrl.project.getProjectSetting}?project=${ref}`,
      data,
      "true"
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const updateProjectStatusData = async (ref: any, data: any) => {
  try {
    const res = await put(
      `${ApiUrl.project.updateProjectStatus}?project=${ref}`,
      data,
      "true"
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const updateBookingField = async (ref: any, data: any) => {
  try {
    const res = await post(
      `${ApiUrl.project.getBookingDetailData}?project=${ref}`,
      data,
      "true"
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const getTimeList = async (ref:any) => {
  try {
    const res = await get(`${ApiUrl.project.getTimes}?project=${ref}`, "true");
    return res;
  } catch (error: any) {
    return error.response;
  }
};
