import { get, put, post, remove, patch } from "../../ApiService";
import { ApiUrl } from "../../ApiUrl";

export const getUserAsssociatedProjectsData = async (page:number,pageSize:number,ref: any,region:any) => {
  try {
    const res = await get(
      `${ApiUrl.authModule.userList}${ref}/projects/?region=${region}&page=${page}&pageSize=${pageSize}`,
      "true"
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};



