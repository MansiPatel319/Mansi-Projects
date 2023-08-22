import ActionType from "../../Actions/ActionType";
import { projectAction } from "../../Actions/ProjectModule/projectAction";

const intialState = {
  filterData: {},
  showFilterModal: false,
  showDurationModal: false,
  showAddFlexibleField: false,
  flexibleFieldData: null,
  bookingField: {},
  showAddProjectModal:false,
  shorCodeAddress:'',
  timezone: '',
  loading: false,
  search: "",
  activeTab:"/home",
  showVehicleTypeModal: false,
  bookingCoreFileds:{}
};

const project = (state: object = intialState, action: projectAction) => {
  switch (action.type) {
    case ActionType.SET_PROJECT_FILTER:
      return {
        ...state,
        filterData: action.data,
      };
    case ActionType.SHOW_PROJECT_EDIT_MODAL:
      return {
        ...state,
        showFilterModal: action.data,
      };
    case ActionType.SHOW_EDIT_DURATION_MODAL:
      return {
        ...state,
        showDurationModal: action.data,
      };
    case ActionType.SHOW_PROJECT_ADD_MODAL:
      return {
        ...state,
        showAddProjectModal: action.data,
      };
    case ActionType.SET_BOOKING_FILED:
      return {
        ...state,
        bookingField: action.data,
      };
    case ActionType.SHOW_ADD_FLEXIBLE_MODEL:
      return {
        ...state,
        showAddFlexibleField: action.data.isshow,
        flexibleFieldData: action.data.id,
      };
      case ActionType.SET_SHORT_CODE_ADDRESS:
        return {
          ...state,
          shorCodeAddress: action.data,
        };
      case ActionType.SET_TIME_ZONE:
        return {
          ...state,
          timezone: action.data,
        };
      case ActionType.SET_LOADER:
        return {
          ...state,
          loading: action.data,
        };
      case ActionType.SET_SEARCH:
        return {
          ...state,
          search: action.data,
        };
      case ActionType.SET_ACTIVE_TAB:
        return {
          ...state,
          activeTab: action.data,
        };
      case ActionType.SHOW_VEHICLE_TYPE_MODEL:
        return {
          ...state,
          showVehicleTypeModal: action.data,
        };
    case ActionType.SET_CORE_FILED:
      return {
        ...state,
        bookingCoreFileds: action.data,
      };
    default:
      return state;
  }
};
export default project;
