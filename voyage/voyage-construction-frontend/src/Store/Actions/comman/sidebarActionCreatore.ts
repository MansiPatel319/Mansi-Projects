import ActionType from "../ActionType";

export const setSidebarDetails = (data: boolean) => ({
  type: ActionType.SET_SIDEBAR_DETAILS,
  data,
});
