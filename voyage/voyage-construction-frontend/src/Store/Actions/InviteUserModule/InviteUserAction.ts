import ActionType from "../ActionType";

interface setInviteUserDetails {
  type: ActionType.SET_INVITE_USER_DETAILS;
  data: object;
}

export type AuthAction = setInviteUserDetails;
