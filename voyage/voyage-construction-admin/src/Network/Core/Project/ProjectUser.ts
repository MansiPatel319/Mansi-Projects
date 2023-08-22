import { post, get, put, patch } from "../../ApiService";
import { ApiUrl } from "../../ApiUrl";

export const doGetUserList = async (
  ref: any 
) => {
  try {
    const res = await get(
      `${ApiUrl.project.getUserList}?project_ref=${ref}&project=${ref}`,
      "true"
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const doGetOrganizationRoleList = async (ref: any) => {
  try {
    const res = await get(
      `${ApiUrl.project.getOrganizationRoleList}?project=${ref}`,
      "true"
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};

export const doPostUpdateOrgRole = async (ref: any, data: any) => {
  try {
    const res = await patch(
      `${ApiUrl.project.updateOrgRole}?project=${ref}`,
      data,
      "true"
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const doPostRemoveUserFromOrg = async (ref: any, data: any) => {
  try {
    const res = await post(
      `${ApiUrl.project.removeUserFromOrg}?project=${ref}`,
      data,
      "true"
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};
