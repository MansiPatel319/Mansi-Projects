import { get, post } from "../../ApiService";
import { ApiUrl } from "../../ApiUrl";

export const doUserLogin = async (body: any) => {
  try {
    const res = await post(ApiUrl.authModule.userLogin, body);
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const doForgotPassword = async (body: any) => {
  try {
    const res = await post(ApiUrl.authModule.userForgotpassword, body);
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const doResetPassword = async (body: any) => {
  try {
    const res = await post(ApiUrl.authModule.userResetpassword, body);
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const getUserProjectList = async (region:number) => {
  try {
    const res = await get(
      `${ApiUrl.authModule.userProjectList}?region=${region}`,
      "true"
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const getUserProjectListwithFilter = async (
  status: any,
  accountmanager: any,
  organization: any,
  search: string,
  region: string,
  page: number,
  pageSize:number
) => {
  try {
    const res = await get(
      `${ApiUrl.authModule.userProjectList}?manager=${accountmanager}&organization=${organization}&status=${status}&name=${search}&region=${region}&page=${page}&pageSize=${pageSize}`,
      "true"
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const getUserListwithFilter = async (
  status: any,
  projects: any,
  organization: any,
  search: string,
  region: string,
  page:number,
  pageSize:number
) => {
  try {
    // &organization_id=${Number(organization)}
    const res = await get(
      `${ApiUrl.authModule.userList}?project_refs=${projects}&organization_ids=${organization}&user_statuses=${status}&search=${search}&region=${region}&page=${page}&pageSize=${pageSize}`,
      "true"
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const getOrganizationwithFilter = async (

  projects: any,
  search: string,
  region: string,
  page: number,
  pageSize: number
) => {
  try {
    const res = await get(
      `${ApiUrl.authModule.userOrganizeList}?project_refs=${projects}&search=${search}&region=${region}&page=${page}&pageSize=${pageSize}`,
      "true"
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const getRegionsList = async () => {
  try {
    const res = await get(ApiUrl.authModule.regionsList,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const authApiUser = async () => {
  try {
    const res = await get(ApiUrl.authModule.authUserApi,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};
