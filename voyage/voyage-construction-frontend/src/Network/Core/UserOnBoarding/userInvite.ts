import { post, get, put, patch } from "../../ApiService";
import { ApiUrl } from "../../ApiUrl";

export const getUserRoles = async ({project}:any) => {
  try {
    const res = await get(`${ApiUrl.authModule.projectRoles}?project=${project}`,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const doUserInvite = async (project:any,data:any) => {
  try {
    const res = await post(`${ApiUrl.authModule.userInvite}?project=${project}`,data,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const getJoinCompanyList = async (email:any,ref:any) => {
  try {
    const res = await get(`${ApiUrl.authModule.companylist}?email=${email}&project=${ref}`);
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const doUserSignup = async (body: any,project_ref:any) => {
  try {
    const res = await post(`${ApiUrl.authModule.userSignup}?project=${project_ref}`, body.passUserDetails);
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const postOrganizationData = async (body: any,userRef:any,project:any) => {
  try {
    const res = await patch(`${ ApiUrl.authModule.organizationdata }${userRef}/?project=${project}`, body);
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const getUserList = async ( status: any,
  projects: any,
  organization: any,
  search: string,
  ref: any) => {
  try {
    const res = await get(`${ApiUrl.UserManagement.getUserList}?project_refs=${ref}&project=${ref}&organization_ids=${organization}&project_roles=${projects}&user_statuses=${status}&search=${search}`,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const getUserDetailById = async (prject:any,ref:any) => {
  try {
    const res = await get(`${ApiUrl.UserManagement.getUserdetailbyid}${ref}/?project=${prject}`,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const AddUserDetail = async (data:any,prject:any,ref:any) => {
  try {
    const res = await patch(`${ApiUrl.UserManagement.postUserdetail}${ref}/?project=${prject}`,data,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};
