import ActionType from "../ActionType";

export const setInviteUserDeatils = (data: object) => ({
  type: ActionType.SET_INVITE_USER_DETAILS,
  data,
});
