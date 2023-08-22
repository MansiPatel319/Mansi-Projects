import ActionType from "../ActionType";

interface setprojectFiler {
  type: ActionType.SET_PROJECT_FILTER;
  data: object;
}
interface handleOpenEditProjectModal {
  type: ActionType.SHOW_PROJECT_EDIT_MODAL;
  data: boolean;
}
interface handleEditDurationModal {
  type: ActionType.SHOW_EDIT_DURATION_MODAL;
  data: boolean;
}
interface setBookingField {
  type: ActionType.SET_BOOKING_FILED;
  data: object;
}

interface handleADDFlexibleModal {
  type: ActionType.SHOW_ADD_FLEXIBLE_MODEL;
  data: any;
}
interface handleOpenCreateProjectModal {
  type: ActionType.SHOW_PROJECT_ADD_MODAL;
  data: boolean;
}
interface setShortCodeAddress {
  type: ActionType.SET_SHORT_CODE_ADDRESS;
  data: object;
}
interface setTimeZone {
  type: ActionType.SET_TIME_ZONE;
  data: String;
}
interface setLoader {
  type: ActionType.SET_LOADER;
  data: String;
}


interface setSearch {
  type: ActionType.SET_SEARCH;
  data: String;
}


interface setActiveTab {
  type: ActionType.SET_ACTIVE_TAB;
  data: String;
}
interface handleShowVehicleTypeModal {
  type: ActionType.SHOW_VEHICLE_TYPE_MODEL;
  data: Boolean;
}
interface handleSetCoreFiledData {
  type: ActionType.SET_CORE_FILED;
  data: any;
}
export type projectAction =
  | setprojectFiler
  | handleOpenEditProjectModal
  | handleEditDurationModal
  | setBookingField
  | handleADDFlexibleModal
  | handleOpenCreateProjectModal
  | setShortCodeAddress
  | setTimeZone
  | setLoader
  | setSearch
  | setActiveTab
  | handleShowVehicleTypeModal
  | handleSetCoreFiledData;
