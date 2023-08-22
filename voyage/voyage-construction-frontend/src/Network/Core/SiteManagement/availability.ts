import { post, get, put, remove } from "../../ApiService";
import { ApiUrl, getUrl } from "../../ApiUrl";

export const getResources = async (project:any,site:any) => {
  try {
    const res = await get(`${ApiUrl.Availability.getResourceList}?project=${project}&site_id=${site}`,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const getTimeList = async (ref:any) => {
  try {
    const res = await get(`${ApiUrl.Availability.getTimes}?project=${ref}`, "true");
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const getResourcesDetails = async (project:any,site:any) => {
    try {
      const res = await get(`${getUrl(ApiUrl.Availability.getAvailablity,'/resource/',site)}?project=${project}&site_id=${site}`,'true');
      return res;
    } catch (error: any) {
      return error.response;
    }
  };
  export const updateResourceAvailablity = async (body:any,project:any,site:any) => {
    try {
      const res = await post(`${getUrl(ApiUrl.Availability.getAvailablity,'/resource/',site)}?project=${project}&site_id=${site}`,body,'true');
      return res;
    } catch (error: any) {
      return error.response;
    }
  };
  // export const AddClosureResource = async (body:any,project:any,site:any) => {
  //   try {
  //     const res = await post(`${getUrl(ApiUrl.Availability.getAvailablity,'/resource/',site)}?project=${project}&site_id=${site}`,body,'true');
  //     return res;
  //   } catch (error: any) {
  //     return error.response;
  //   }
  // };
  export const getSiteAvailablityList = async (ref:any,id:any) => {
    try {
      const res = await get(`${getUrl(ApiUrl.Availability.getAvailablity,'/site/',id)}`+"?project="+ref, "true");
      return res;
    } catch (error: any) {
      return error.response;
    }
  };
  export const updateSiteAvailablityList = async (ref:any,data:any,id:any) => {
    try {
      const res = await put(`${getUrl(ApiUrl.Availability.getAvailablity,'/site/',id)}`+"?project="+ref,data, "true");
      return res;
    } catch (error: any) {
      return error.response;
    }
  };
  export const addSiteAvailablityList = async (ref:any,data:any) => {
    try {
      const res = await post(ApiUrl.siteManagement.getSiteAvailablity+"?project="+ref,data, "true");
      return res;
    } catch (error: any) {
      return error.response;
    }
  };
  export const AddBreakSiteDetail = async (body:any,project:any) => {
    try {
      const res = await post(`${ApiUrl.Availability.addSiteBreak}?project=${project}`,body,'true');
      return res;
    } catch (error: any) {
      return error.response;
    }
  };
  export const getSiteDetail = async (project:any,site:any) => {
    try {
      const res = await get(`${ApiUrl.siteManagement.getSiteList}${site}/?project=${project}`,'true');
      return res;
    } catch (error: any) {
      return error.response;
    }
  };
  export const updateSiteDetail = async (project:any,updatedData:any,site:any) => {
    try {
      const res = await put(`${ApiUrl.siteManagement.getSiteList}${site}/?project=${project}`,updatedData,'true');
      return res;
    } catch (error: any) {
      return error.response;
    }
  };
  