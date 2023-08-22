import { post, get, put } from "../../ApiService";
import { ApiUrl } from "../../ApiUrl";

export const doGetOrganizationDetails = async (ref:any) => {
  try {
    const res = await get(`${ApiUrl.profileModule.getOrganizationDetails}?project=${ref}`,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const doGetUserList = async (ref:any,projectFilter:boolean,serachUser:String) => {
  try {
    const res = await get(`${ApiUrl.profileModule.getUserList}?project=${ref}&project_filter=${projectFilter}&search=${serachUser}`,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const doGetOrganizationRoleList = async (ref:any) => {
  try {
    const res = await get(`${ApiUrl.profileModule.getOrganizationRoleList}?project=${ref}`,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const doPostOrganizationDetails = async (ref:any,data:any,id:any) => {
  try {
    const res = await put(`${ApiUrl.profileModule.updateOrganizationDetails}${id}/?project=${ref}`,data,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const doPostUpdateOrgRole = async (ref:any,data:any) => {
  try {
    const res = await post(`${ApiUrl.profileModule.updateOrgRole}?project=${ref}`,data,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const doPostRemoveUserFromOrg = async (ref:any,data:any) => {
  try {
    const res = await post(`${ApiUrl.profileModule.removeUserFromOrg}?project=${ref}`,data,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};