import ActionType from "../ActionType";

export const setOrganizationFilter = (data: object) => ({
  type: ActionType.SET_ORG_FILTER,
  data,
});