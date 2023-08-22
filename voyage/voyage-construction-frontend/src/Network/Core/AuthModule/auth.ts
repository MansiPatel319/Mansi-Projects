import { post, get } from "../../ApiService";
import { ApiUrl } from "../../ApiUrl";

export const doUserLogin = async (body: any) => {
  try {
    const res = await post(ApiUrl.authModule.userLogin, body);
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
export const getUserProjectList= async (region:any) => {
  try {
    const res = await get(`${ApiUrl.authModule.userProjectList}?region=${region}&status=active`,'true');
    return res;
  } catch (error: any) {
    return error.response;
  }
};

