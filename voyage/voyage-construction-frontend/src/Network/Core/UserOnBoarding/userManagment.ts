import { post, get, put, patch, remove } from "../../ApiService";
import { ApiUrl } from "../../ApiUrl";

export const getOrganization = async (project:any) => {
  try {
    const res = await get(`${ApiUrl.UserManagement.organization}?project=${project}`, "true");
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const updateProjectRole = async (ref:any,data:any) => {
  try {
    const res = await patch(`${ApiUrl.UserManagement.updateProjectRole}?project=${ref}`,data,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const removeUserFromProject = async (ref:any,userRef:any) => {
  try {
    const res = await remove(`${ApiUrl.UserManagement.removeUserFromProject}?project=${ref}&user_ref=${userRef}`,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};