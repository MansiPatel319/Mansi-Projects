import ActionType from "../ActionType";

export const setUserFilter = (data: object) => ({
  type: ActionType.SET_USER_FILTER,
  data,
});
export const setSearch = (data: string) => ({
  type: ActionType.SET_SEARCH,
  data,
});
export const updateUser = (data: boolean) => ({
  type: ActionType.UPDATE_USER,
  data,
});
