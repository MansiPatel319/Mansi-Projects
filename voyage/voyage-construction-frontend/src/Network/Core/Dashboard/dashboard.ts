import { get, patch, post } from "../../ApiService";
import { ApiUrl } from "../../ApiUrl";

export const getProjectDetail = async (ref:any) => {
    try {
      const res = await get(`${ApiUrl.profileModule.getProjectDetailsCall}?ref=${ref}/`,'true');
      return res;
    } catch (error: any) {
      return error.response;
    }
};
export const getAccountUserDetail = async (ref:any) => {
  try {
    const res = await get(`${ApiUrl.profileModule.getAccountUserDetails}?project=${ref}`,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const getProjectFieldsDetails = async (ref:any) => {
  try {
    const res = await get(
      `${ApiUrl.profileModule.getBookingDetailData}?project=${ref}`,
      "true"
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};


export const getAccountPreferenceDetail = async (ref:any) => {
  try {
    const res = await get(`${ApiUrl.profileModule.getAccountUserPreferenceDetails}?project=${ref}`,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const getLanguageList = async (ref:any) => {
  try {
    const res = await get(`${ApiUrl.profileModule.getLanguages}?project=${ref}`,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const getDateFormatList = async (ref:any) => {
  try {
    const res = await get(`${ApiUrl.profileModule.getDateFormates}?project=${ref}`,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};

export const getTimeFormatList = async (ref:any) => {
  try {
    const res = await get(`${ApiUrl.profileModule.getTimeFormates}?project=${ref}`,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};

export const getCalenderDaysList = async (ref:any) => {
  try {
    const res = await get(`${ApiUrl.profileModule.getCalenderDays}?project=${ref}`,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const doUserDetailAdd = async (body: any,ref:any) => {
  try {
    const res = await patch(`${ApiUrl.profileModule.addUserDetail}?project=${ref}`, body,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};

export const doUserPreferenceAdd = async (body: any,ref:any) => {
  try {
    const res = await patch(`${ApiUrl.profileModule.getAccountUserPreferenceDetails}?project=${ref}`, body,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const doUpdatePassword = async (body: any) => {
  try {
    const res = await post(ApiUrl.profileModule.userUpdatepassword, body,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};


