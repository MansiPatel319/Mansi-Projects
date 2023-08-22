import { get, put, post, remove, patch } from "../../ApiService";
import { ApiUrl } from "../../ApiUrl";

export const getOrganizationdetail = async (id: any,regions:any) => {
  try {
    const res = await get(
      `${ApiUrl.Organization.getOrganizationDetailsCall}/${id}/?region=${regions}`,
      "true"
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};

export const AddOrganizationInformation = async (body: any,regions:any,id:any) => {
    try {
      const res = await patch(`${ApiUrl.Organization.addOrgDetail}/${id}/?region=${regions}`,body,
      "true"
      );
      return res;
    } catch (error: any) {
      return error.response;
    }
  };
  export const getOrganizationUser = async (organizationId:number,page:number,pageSize:number,regions:any) => {
    try {
      const res = await get(
        `${ApiUrl.Organization.getOrganizationusersCall}/?organization_id=${organizationId}&region=${regions}&page=${page}&pageSize=${pageSize}`,
        "true"
      );
      return res;
    } catch (error: any) {
      return error.response;
    }
  };
  export const getOrganizationActivityDetail = async (id :any,region:any,firstDate:any,lastDate:any,search:string,page:number,pageSize:number) => {
    try {
      const res = await get(
        `${ApiUrl.Organization.getOrganizationActivityCall}/?organization_id=${id}&region=${region}&start_date=${firstDate}&end_date=${lastDate}&search=${search}&page=${page}&pageSize=${pageSize}`,
        "true"
      );
      return res;
    } catch (error: any) {
      return error.response;
    }
  };