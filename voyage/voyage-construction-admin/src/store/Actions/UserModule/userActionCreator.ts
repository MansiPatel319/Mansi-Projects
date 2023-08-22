import ActionType from "../ActionType";

export const setUserFilter = (data: object) => ({
  type: ActionType.SET_USER_FILTER,
  data,
});