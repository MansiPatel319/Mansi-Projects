import * as types from "./actionTypes";

export const setAdminDashboardStepCount = (data) => ({
  type: types.SET_ADMIN_DASHBOARD_STEP_COUNT,
  adminDashboardStepCount: data,
});

export const setInsightDashboardStepCount = (data) => ({
  type: types.SET_INSIGHT_DASHBOARD_STEP_COUNT,
  insightDashboardStepCount: data,
});

export const setLoader = (data) => ({
  type: types.SET_LOADER,
  loading: data,
});

export const setEducatorData = (data) => ({
  type: types.SET_EDUCATOR_DATA,
  educatorData: data,
});

export const setResetPasswordData = (data) => ({
  type: types.SET_RESET_PASSWORD_DATA,
  resetPasswordData: data,
});

export const setClassData = (data) => ({
  type: types.SET_CLASS_DATA,
  classData: data,
});

export const setClassDetailData = (data) => ({
  type: types.SET_CLASS_DETAIL_DATA,
  classDetailData: data,
});

export const setStudentDetailData = (data) => ({
  type: types.SET_STUDENT_DETAIL_DATA,
  studentDetailData: data,
});

export const setInvitedUserData = (data) => ({
  type: types.SET_INVITED_USER_DATA,
  invitedUserData: data,
});

export const setClassList = (data) => ({
  type: types.SET_CLASS_LIST,
  classList: data,
});
export const setClassListAdmin = (data) => ({
  type: types.SET_CLASS_LIST_ADMIN,
  classListAdmin: data,
});

export const setAddStudentData = (data) => ({
  type: types.SET_ADD_STUDENT_DATA,
  addStudentData: data,
});

export const setInsightAdminData = (data) => ({
  type: types.SET_INSIGHT_ADMIN_DATA,
  insightAdminData: data,
});

export const setinsightmoodbyday = (data) => ({
  type: types.SET_MOODBYDAY_DATA,
  moodbydaydata: data,
});
export const setstudentWeblist = (data) =>
({
  type: types.SET_STUDENT_ALL_DATA,
  studentweblistdata: data,
});
export const setstudentWeblistLinkData = (data) =>
({
  type: types.SET_STUDENT_WEBLIST_LINK_DATA,
  studentweblistlinkdata: data,
});
export const setaskstudentWeblistLinkData = (data) =>
({
  type: types.SET_ASKSTUDENT_WEBLIST_LINK_DATA,
  askstudentweblistlinkdata: data,
});
export const setaskstudentWeblist = (data) => 
({
  type: types.SET_ASK_STUDENT_ALL_DATA,
  studentaskweblistdata: data,
});
export const setIndividualStudentData = (data) => ({
  type: types.SET_INDIVIDUAL_STUDENT_DATA,
  individualStudentData: data,
});
export const setAllLogsData = (data) => ({
  type: types.SET_ALL_LOGS_DATA,
  allLogsData: data,
});

export const setFlaggedLogsData = (data) => ({
  type: types.SET_FLAGGED_LOGS_DATA,
  flaggedLogsData: data,
});

export const setPopularTopicsData = (data) => ({
  type: types.SET_POPULAR_TOPICS_DATA,
  popularTopicsData: data,
});

export const setStudentMoodDetailCount = (data) => ({
  type: types.SET_STUDENT_MOOD_DETAIL_COUNT,
  studentMoodDetailCount: data,
});

export const setStudentClassData = (data) => ({
  type: types.SET_STUDENT_CLASS_DATA,
  studentClassData: data,
});

export const setStudentJournalData = (data) => ({
  type: types.SET_STUDENT_JOURNAL_DATA,
  studentJournalData: data,
});
export const setStudentJournalResponseData = (data) => ({
  type: types.SET_STUDENT_JOURNAL_RESPONSE_DATA,
  studentJournalResponseData: data,
});
export const setMoodListData = (data) => ({
  type: types.SET_MOOD_LIST_DATA,
  moodListData: data,
});

export const setBotResponseData = (data) => ({
  type: types.SET_BOT_RESPONSE_DATA,
  botResponseData: data,
});

export const setMoodDescriptionData = (data) => ({
  type: types.SET_MOOD_DESCRIPTION_DATA,
  moodDescriptionData: data,
});

export const setEditEnable = (data) => ({
  type: types.SET_EDIT_MOOD_ENABLE_DATA,
  isEditEnable: data,
});

export const setInsightDateRangeData = (data) => ({
  type: types.SET_INSIGHT_DATE_RANGE_DATA,
  insightDateRangeData: data,
});

export const setStudentSelectedClass = (data) => ({
  type: types.SET_STUDENT_SELECTED_CLASS,
  studentSelectedClass: data,
});

export const setStudentData = (data) => ({
  type: types.SET_STUDENT_DATA,
  studentData: data,
});

export const setSelectedStudentData = (data) => ({
  type: types.SET_SELECTED_STUDENT_DATA,
  selectedStudentData: data,
});

export const setLatestMoodData = (data) => ({
  type: types.SET_LATEST_MOOD_DATA,
  latestMoodData: data,
});

export const setMultipleSelectedClass = (data) => ({
  type: types.MULTIPLE_SELECTED_CLASS,
  multipleClass: data,
});
export const setNotificationListing = (data) => ({
  type: types.GET_NOTIFICATION_LISTING,
  notification: data,
});
export const setRemoveDemo = (data) => ({
  type: types.REMOVE_DEMO_CLASS,
  isDemoClass: data,
});

export const doSetTimelineTag = (data) => ({
  type: types.DO_SET_TIME_LINE_TAG,
  data: data,
});
export const setIsNotificationBanner = (data) => ({
  type: types.IS_SHOW_NOTIFICATION_BANNER,
  data,
});

export const selectedClassId = (data) => ({
  type: types.SELECTED_CLASS_ID,
  selectedClassId: data,
});

export const setRemoveSelectedClass = (data) => ({
  type: types.SET_REMOVE_SELECTED_NAME,
  selectedClassToRemove: data,
});

export const setSwitchSchoolData = (data) => ({
  type: types.SET_SWITCH_SCHOOL_DATA,
  switchSchoolData: data.data,
});

export const switchSchoolTimeStamp = (data) => (console.log(data),{
  type: types.SET_SWITCH_SCHOOL_TIME_STAMP,
  switchSchoolTimeStamp: data,
});