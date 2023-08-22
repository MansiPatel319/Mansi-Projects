import ActionType from "../ActionType";

export const setProjectFilter = (data: object) => ({
  type: ActionType.SET_PROJECT_FILTER,
  data,
});
export const handleOpenEditProjectModal = (data: Boolean) => ({
  type: ActionType.SHOW_PROJECT_EDIT_MODAL,
  data,
});
export const handleOpenCreateProjectModal = (data: Boolean) => ({
  type: ActionType.SHOW_PROJECT_ADD_MODAL,
  data,
});
export const handleEditDurationModal = (data: Boolean) => ({
  type: ActionType.SHOW_EDIT_DURATION_MODAL,
  data,
});
export const setBookingField = (data: Boolean) => ({
  type: ActionType.SET_BOOKING_FILED,
  data,
});

export const handleADDFlexibleModal = (data: any) => ({
  type: ActionType.SHOW_ADD_FLEXIBLE_MODEL,
  data,
});
export const handleShowVehicleTypeModal = (data: Boolean) => ({
  type: ActionType.SHOW_VEHICLE_TYPE_MODEL,
  data,
});
export const handleSetCoreFiledData = (data: any) => ({
  type: ActionType.SET_CORE_FILED,
  data,
});
export const setShortCodeAddress = (data: any) => ({
  type: ActionType.SET_SHORT_CODE_ADDRESS,
  data,
});
export const setTimeZone = (data: any) => ({
  type: ActionType.SET_TIME_ZONE,
  data,
});
export const setLoader = (data: boolean) => ({
  type: ActionType.SET_LOADER,
  data,
});
export const setSearch = (data: string) => ({
  type: ActionType.SET_SEARCH,
  data,
});
export const setActiveTab = (data: string) => ({
  type: ActionType.SET_ACTIVE_TAB,
  data,
});
