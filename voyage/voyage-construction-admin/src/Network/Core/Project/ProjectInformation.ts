import { get, put, post, remove, patch } from "../../ApiService";
import { ApiUrl } from "../../ApiUrl";

export const getProjectDetail = async (ref: any) => {
  try {
    const res = await get(
      `${ApiUrl.project.getProjectDetailsCall}/${ref}/?project=${ref}`,
      "true"
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const getdataASiteList = async (project:any,status:any) => {
  try {
    const res = await get(`${ApiUrl.project.getSiteList}?project=${project}`,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const getAccountManager = async (ref:any) => {
  try {
    const res = await get(`${ApiUrl.project.getAccountManagerList}?project=${ref}`, "true");
    return res;
  } catch (error: any) {
    return error.response;
  }
};

export const getOwnerListData = async (ref:any) => {
  try {
    const res = await get(`${ApiUrl.project.getOwner}?project=${ref}`, "true");
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const getOrganization = async (ref:any) => {
  try {
    const res = await get(`${ApiUrl.project.getOrganization}?project=${ref}`, "true");
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const postProjectDetail = async (ref: any, data: any) => {
  try {
    const res = await post(
      `${ApiUrl.project.getProjectDetailsCall}/${ref}`,
      data,
      "true"
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const EditProjectDetail = async (ref: any, data: any) => {
  try {
    const res = await patch(
      `${ApiUrl.project.editProjectDetail}/${ref}/?project=${ref}`,
      data,
      "true"
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const AddProjectDetail = async (data: any,region: any) => {
  try {
    const res = await post(
      `${ApiUrl.project.getProjectDetailsCall}/?region=${region}`,
      data,
      "true"
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const updateProjectDetail = async (ref: any, data: any) => {
  try {
    const res = await patch(
      `${ApiUrl.project.getProjectDetailsCall}/${ref}/?project=${ref}`,
      data,
      "true"
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};

export const getAddContactList = async (project: any,siteId:any,status: true) => {
  try {
    const res = await get(
      `${ApiUrl.project.getContactList}?is_active=${status}&project=${project}&site_id=${siteId}`,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const addContact = async (data: any,siteId:any, project: any, status: any) => {
  try {
    const res = await post(
      `${ApiUrl.project.getContactList}?is_active=${status}&project=${project}&site_id=${siteId}`,data,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const editContact = async (data: any, project: any,siteId:any, id: any) => {
  try {
    const res = await put(
      `${ApiUrl.project.getContactList}${id}/?project=${project}&site_id=${siteId}`,data,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const removeContact = async (project: any,siteId:any, id: any) => {
  try {
    const res = await remove(
      `${ApiUrl.project.getContactList}${id}/?project=${project}&site_id=${siteId}`,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};
