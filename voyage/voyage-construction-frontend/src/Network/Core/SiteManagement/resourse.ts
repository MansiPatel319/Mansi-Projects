import { post, get, put, remove } from "../../ApiService";
import { ApiUrl, getUrl } from "../../ApiUrl";

export const getALLResourceList = async (project:any,site:any,status:any) => {
  try {
    const res = await get(`${getUrl(ApiUrl.siteManagement.getSite,'/resources/',site)}?project=${project}`,status);
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const getAceesspointOfResourceList = async (project:any,site:any,accessPoint_id:any,status:any) => {
  try {
    const res = await get(`${getUrl(ApiUrl.siteManagement.getSite,'/resources/',site)}?access_point_id=${accessPoint_id}&project=${project}`,status);
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const addResource = async (data:any,project:any,site:any,status:any) => {
  try {
    const res = await post(`${getUrl(ApiUrl.siteManagement.getSite,'/resources/',site)}?project=${project}`,data,status);
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const editResource = async (data:any,id:any,project:any,site:any,status:any) => {
  try {
    const res = await put(`${getUrl(ApiUrl.siteManagement.getSite,'/resources/',site)}${id}/?project=${project}`,data,status);
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const removeResource = async (id:any,project:any,site:any,status:any) => {
  try {
    const res = await remove(`${getUrl(ApiUrl.siteManagement.getSite,'/resources/',site)}${id}/?project=${project}`,status);
    return res;
  } catch (error: any) {
    return error.response;
  }
};