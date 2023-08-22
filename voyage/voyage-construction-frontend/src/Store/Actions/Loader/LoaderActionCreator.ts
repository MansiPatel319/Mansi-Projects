import ActionType from "../ActionType";

export const setLoader = (data: boolean) => ({
  type: ActionType.SET_LOADER,
  data,
});
