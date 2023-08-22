import { get, put, post, remove, patch } from "../../ApiService";
import { ApiUrl } from "../../ApiUrl";

export const getUserAsssociatedOrganiztionData = async (id: any,region:any) => {
  try {
    const res = await get(
      `${ApiUrl.authModule.userOrganizeList}${id}/?region=${region}`,
      "true"
    );
    return res;
  } catch (error: any) {
    return error.response;
  }
};



