import { get, put, post, remove, patch } from "../../ApiService";
import { ApiUrl } from "../../ApiUrl";

export const getUserDetailData = async (ref: any,region:any) => {
  try {
    const res = await get(
      `${ApiUrl.authModule.userList}${ref}/?region=${region}`,
      "true"
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const getUserDetailDataFromAuth = async (ref: any,region:any) => {
  try {
    const res = await get(
      `${ApiUrl.authModule.userListAuth}${ref}/?region=${region}`,
      "true"
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const updateUserDetailData = async (userData:any,ref: any,region:any) => {
  try {
    const res = await patch(
      `${ApiUrl.authModule.userList}${ref}/?region=${region}`,userData,
      "true"
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const getUserOrganizationRoles = async (orgId:any,region:any) => {
  try {
    const res = await get(
      `${ApiUrl.users.organizationRoles}?organization_id=${orgId}&region=${region}`,
      "true"
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};

export const getUserActivityDetail = async (ref :any,region:any,firstDate:any,lastDate:any,search:string,page:number,pageSize:number) => {
  try {
    const res = await get(
      `${ApiUrl.users.getUserActivityCall}/?user_ref=${ref}&region=${region}&start_date=${firstDate}&end_date=${lastDate}&search=${search}&page=${page}&pageSize=${pageSize}`,
      "true"
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};