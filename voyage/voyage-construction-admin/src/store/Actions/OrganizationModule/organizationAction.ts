import ActionType from "../ActionType";

interface setOrganizationFilter {
  type: ActionType.SET_ORG_FILTER;
  data: object;
}

export type organizatinAction =
  | setOrganizationFilter