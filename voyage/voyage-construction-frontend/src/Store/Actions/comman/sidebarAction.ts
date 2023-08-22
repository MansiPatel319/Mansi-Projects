import ActionType from "../ActionType";

interface setSidebarDetails{
  type: ActionType.SET_SIDEBAR_DETAILS;
  data: Boolean
}

export type setSidebarDetailsAction = setSidebarDetails;
