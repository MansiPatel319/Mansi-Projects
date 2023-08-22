import ActionType from "../ActionType";

export const setUserDeatils = (data: object) => ({
  type: ActionType.SET_USER_DETAILS,
  data,
});
export const setProjectDeatils = (data: object) => ({
  type: ActionType.SET_PROJECT_DETAILS,
  data,
});
