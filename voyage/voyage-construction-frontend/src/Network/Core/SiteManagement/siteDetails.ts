import { post, get, put, patch,remove } from "../../ApiService";
import { ApiUrl, getUrl } from "../../ApiUrl";



export const getdataASiteList = async (project:any,status:any) => {
  try {
    const res = await get(`${ApiUrl.siteManagement.getSiteList}?project=${project}`,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};

export const getdataAccespointList = async (project:any,site:any,status:any) => {
  try {
    const res = await get(`${getUrl(ApiUrl.siteManagement.getSite,'/access-points/',site)}?is_active=${status}&project=${project}`,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const getAddContactList = async (project:any,site:any,status:true) => {
  try {
    const res = await get(`${getUrl(ApiUrl.siteManagement.getSite,'/contacts/',site)}?is_active=${status}&project=${project}`,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const addaccesspoint = async (data:any,project:any,site:any) => {
  try {
    const res = await post(`${getUrl(ApiUrl.siteManagement.getSite,'/access-points/',site)}?project=${project}`,data,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const addContact = async (data:any,project:any,site:any,status:any) => {
  try {
    const res = await post(`${getUrl(ApiUrl.siteManagement.getSite,'/contacts/',site)}?is_active=${status}&project=${project}`,data,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const editContact = async (data:any,project:any,id:any,site:any) => {
  try {
    const res = await put(`${getUrl(ApiUrl.siteManagement.getSite,'/contacts/',site)}${id}/?project=${project}`,data,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const editaccesspoint = async (data:any,project:any,site:any,id:any) => {
  try {
    const res = await put(`${getUrl(ApiUrl.siteManagement.getSite,'/access-points/',site)}${id}/?project=${project}`,data,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const removeContact = async (project:any,site:any,id:any) => {
  try {
    const res = await remove(`${getUrl(ApiUrl.siteManagement.getSite,'/contacts/',site)}${id}/?project=${project}`,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const removeaccesspoint = async (project:any,site:any,id:any) => {
  try {
    const res = await remove(`${getUrl(ApiUrl.siteManagement.getSite,'/access-points/',site)}${id}/?project=${project}&site_id=${site}`,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};
  export const getSiteDetailData = async (ref:any) => {
    try {
      const res = await get(`${ApiUrl.siteManagement.getSiteDetail}?project=${ref}`,'true');
      return res;
    } catch (error: any) {
      return error.response;
    }
};

export const addPrijectDetail = async (body: any,ref:any) => {
  try {
    const res = await patch(`${ApiUrl.siteManagement.getSiteDetail}?project=${ref}`,body,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};