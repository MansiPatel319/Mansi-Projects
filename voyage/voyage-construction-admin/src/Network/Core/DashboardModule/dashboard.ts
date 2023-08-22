import { get, post } from "../../ApiService";
import { ApiUrl } from "../../ApiUrl";

export const getAccoutManager = async (region:any) => {
  try {
    const res = await get(`${ApiUrl.dashboardModule.accountManager}?region=${region}`, "true");
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const getOrganization = async (region:any) => {
  try {
    const res = await get(`${ApiUrl.dashboardModule.organization}?region=${region}`, "true");
    return res;
  } catch (error: any) {
    return error.response;
  }
};
