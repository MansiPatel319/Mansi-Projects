import * as actionType from "../../actions/actionTypes";

const initialState = {
  adminDashboardStepCount: -1,
  insightDashboardStepCount: 0,
  educatorData: {},
  classData: {},
  classDetailData: {},
  studentDetailData: {},
  classList: [],
  classListAdmin: [],
  addStudentData: [],
  notification: [],
  isDemoClass: true,
  selectedTimelineTag: "This Week",
  isShowNotification: false,
};

const setAdminDashboardStepCount = (state, action) => ({
  ...state,
  adminDashboardStepCount: action.adminDashboardStepCount,
});

const setInsightDashboardStepCount = (state, action) => ({
  ...state,
  insightDashboardStepCount: action.insightDashboardStepCount,
});

const setEducatorData = (state, action) => ({
  ...state,
  educatorData: action.educatorData,
});

const setClassData = (state, action) => ({
  ...state,
  classData: action.classData,
});

const setClassDetailData = (state, action) => ({
  ...state,
  classDetailData: action.classDetailData,
});

const setStudentDetailData = (state, action) => ({
  ...state,
  studentDetailData: action.studentDetailData,
});

const setClassList = (state, action) => ({
  ...state,
  classList: action.classList,
});

const setClassListAdmin = (state, action) => ({
  ...state,
  classListAdmin: action.classListAdmin,
});

const setAddStudentData = (state, action) => ({
  ...state,
  addStudentData: action.addStudentData,
});
export const setNotification = (state, action) => ({
  ...state,
  notification: action.notification,
});
export const setRemoveDemoClass = (state, action) => ({
  ...state,
  isDemoClass: false,
});
export const setTimeLineTag = (state, action) => ({
  ...state,
  selectedTimelineTag: action.data,
});

export const doSetIsShowNotificationBanner = (state, action) => ({
  ...state,
  isShowNotification: action.data,
});

export const doSetIsSwitchSchool = (state, action) => ({
  ...state,
  switchSchoolData: action.switchSchoolData,
});
export const dosetSwitchSchoolTimeStamp = (state, action) => (console.log(action,"action"),{
  ...state,
  switchSchoolTimeStamp: action.switchSchoolTimeStamp,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_ADMIN_DASHBOARD_STEP_COUNT:
      return setAdminDashboardStepCount(state, action);
    case actionType.SET_INSIGHT_DASHBOARD_STEP_COUNT:
      return setInsightDashboardStepCount(state, action);
    case actionType.SET_EDUCATOR_DATA:
      return setEducatorData(state, action);
    case actionType.SET_CLASS_DATA:
      return setClassData(state, action);
    case actionType.SET_CLASS_DETAIL_DATA:
      return setClassDetailData(state, action);
    case actionType.SET_STUDENT_DETAIL_DATA:
      return setStudentDetailData(state, action);
    case actionType.SET_CLASS_LIST:
      return setClassList(state, action);
    case actionType.SET_CLASS_LIST_ADMIN:
      return setClassListAdmin(state, action);
    case actionType.SET_ADD_STUDENT_DATA:
      return setAddStudentData(state, action);
    case actionType.GET_NOTIFICATION_LISTING:
      return setNotification(state, action);
    case actionType.REMOVE_DEMO_CLASS:
      return setRemoveDemoClass(state);
    case actionType.DO_SET_TIME_LINE_TAG:
      return setTimeLineTag(state, action);
    case actionType.IS_SHOW_NOTIFICATION_BANNER:
      return doSetIsShowNotificationBanner(state, action);
    case actionType.SET_SWITCH_SCHOOL_DATA:
      return doSetIsSwitchSchool(state, action);
    case actionType.SET_SWITCH_SCHOOL_TIME_STAMP:
      return dosetSwitchSchoolTimeStamp(state, action);

    default:
      return state;
  }
};

export default reducer;
