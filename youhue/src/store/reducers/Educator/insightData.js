import * as actionType from "../../actions/actionTypes";

const initialState = {
  insightAdminData: [],
  individualStudentData: [],
  allLogsData: [],
  flaggedLogsData: [],
  popularTopicsData: [],
  insightDateRangeData: {},
  selectedStudentData: "",
  multipleClass: [],
};

const setInsightAdminData = (state, action) => {
  action.insightAdminData["log_result"] =
    state.insightAdminData.hasOwnProperty("log_result") &&
    action.insightAdminData.hasOwnProperty("current_page") &&
    action.insightAdminData.current_page !== 1
      ? state.insightAdminData.log_result.concat(
          action.insightAdminData.log_result
        )
      : action.insightAdminData.log_result;
  return {
    ...state,
    insightAdminData: action.insightAdminData,
  };
};

// const setIndividualStudentData = (state, action) => ({
//   ...state,
//   individualStudentData: action.individualStudentData
// });

const setIndividualStudentData = (state, action) => {
  action.individualStudentData["log_result"] =
    state.individualStudentData.hasOwnProperty("log_result") &&
    action.individualStudentData.hasOwnProperty("current_page") &&
    action.individualStudentData.current_page !== 1
      ? state.individualStudentData.log_result.concat(
          action.individualStudentData.log_result
        )
      : action.individualStudentData.log_result;
  action.individualStudentData["per_page"] =
    state.individualStudentData.hasOwnProperty("per_page") &&
    action.individualStudentData.hasOwnProperty("per_page") &&
    action.individualStudentData.current_page !== 1
      ? state.individualStudentData.per_page +
        action.individualStudentData.per_page
      : action.individualStudentData.per_page;
  let hash = Object.create(null);
  let result = action.individualStudentData["log_result"].filter(function (o) {
    if (!hash[o.date]) {
      hash[o.date] = o.log;
      return true;
    }
    Array.prototype.push.apply(hash[o.date], o.log);
    return false;
  });
  action.individualStudentData["log_result"] = result;
  return {
    ...state,
    individualStudentData: action.individualStudentData,
  };
};

const setAllLogsData = (state, action) => {
  action.allLogsData["log_result"] =
    state.allLogsData.hasOwnProperty("log_result") &&
    action.allLogsData.hasOwnProperty("current_page") &&
    action.allLogsData.current_page !== 1
      ? state.allLogsData.log_result.concat(action.allLogsData.log_result)
      : action.allLogsData.log_result;
  action.allLogsData["per_page"] =
    state.allLogsData.hasOwnProperty("per_page") &&
    action.allLogsData.hasOwnProperty("per_page") &&
    action.allLogsData.current_page !== 1
      ? state.allLogsData.per_page + action.allLogsData.per_page
      : action.allLogsData.per_page;
  let hash = Object.create(null);
  let result = action.allLogsData["log_result"].filter(function (o) {
    if (!hash[o.date]) {
      hash[o.date] = o.log;
      return true;
    }
    Array.prototype.push.apply(hash[o.date], o.log);
    return false;
  });
  action.allLogsData["log_result"] = result;
  return {
    ...state,
    allLogsData: action.allLogsData,
  };
};

const setFlaggedLogsData = (state, action) => {
  action.flaggedLogsData["log_result"] =
    state.flaggedLogsData.hasOwnProperty("log_result") &&
    action.flaggedLogsData.hasOwnProperty("current_page") &&
    action.flaggedLogsData.current_page !== 1
      ? state.flaggedLogsData.log_result.concat(
          action.flaggedLogsData.log_result
        )
      : action.flaggedLogsData.log_result;
  action.flaggedLogsData["per_page"] =
    state.flaggedLogsData.hasOwnProperty("per_page") &&
    action.flaggedLogsData.hasOwnProperty("per_page") &&
    action.flaggedLogsData.current_page !== 1
      ? state.flaggedLogsData.per_page + action.flaggedLogsData.per_page
      : action.flaggedLogsData.per_page;
  return {
    ...state,
    flaggedLogsData: action.flaggedLogsData,
  };
};

// const setFlaggedLogsData = (state, action) => ({
//   ...state,
//   flaggedLogsData: action.flaggedLogsData
// });

const setPopularTopicsData = (state, action) => {
  action.popularTopicsData["log_result"] =
    state.popularTopicsData.hasOwnProperty("log_result") &&
    action.popularTopicsData.hasOwnProperty("current_page") &&
    action.popularTopicsData.current_page !== 1
      ? state.popularTopicsData.log_result.concat(
          action.popularTopicsData.log_result
        )
      : action.popularTopicsData.log_result;
  action.popularTopicsData["per_page"] =
    state.popularTopicsData.hasOwnProperty("per_page") &&
    action.popularTopicsData.hasOwnProperty("per_page") &&
    action.popularTopicsData.current_page !== 1
      ? state.popularTopicsData.per_page + action.popularTopicsData.per_page
      : action.popularTopicsData.per_page;
  return {
    ...state,
    popularTopicsData: action.popularTopicsData,
  };
};

// const setPopularTopicsData = (state, action) => ({
//   ...state,
//   popularTopicsData: action.popularTopicsData
// });

const setInsightDateRangeData = (state, action) => ({
  ...state,
  insightDateRangeData: {...state.insightDateRangeData,...action.insightDateRangeData}
});

const setSelectedStudentData = (state, action) => ({
  ...state,
  selectedStudentData: action.selectedStudentData,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_INSIGHT_ADMIN_DATA:
      return setInsightAdminData(state, action);
    case actionType.SET_INDIVIDUAL_STUDENT_DATA:
      return setIndividualStudentData(state, action);
    case actionType.SET_ALL_LOGS_DATA:
      return setAllLogsData(state, action);
    case actionType.SET_FLAGGED_LOGS_DATA:
      return setFlaggedLogsData(state, action);
    case actionType.SET_POPULAR_TOPICS_DATA:
      return setPopularTopicsData(state, action);
    case actionType.SET_INSIGHT_DATE_RANGE_DATA:
      console.log(action,"action")
      console.log(state,"state")
      const test = {...state.insightDateRangeData,...action.insightDateRangeData}
      console.log(test,"test")
      return setInsightDateRangeData(state, action);
    case actionType.SET_SELECTED_STUDENT_DATA:
      return setSelectedStudentData(state, action);
    case actionType.MULTIPLE_SELECTED_CLASS:
      return {...state, multipleClass: action.multipleClass};
    default:
      return state;
  }
};

export default reducer;
