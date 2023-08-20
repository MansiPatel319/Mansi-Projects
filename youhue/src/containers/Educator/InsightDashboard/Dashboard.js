import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DashboardComponent from "../../../components/Educator/InsightDashboard/Dashboard/Dashboard";

import * as actions from "../../../store/actions/index";
import {
  setInsightDashboardStepCount,
  setInsightDateRangeData,
  setSelectedStudentData,
  setMultipleSelectedClass,
  doSetTimelineTag,
} from "../../../store/actions/authActions";

const mapStateToProps = (state) => {
  return {
    educator: state.educator,
    insightData: state.insightData,
    authenticate: state.authenticate,
    moodbyday:state.authenticate.moodByData,
    studentweblist:state.authenticate.studentweblist,
    askstudentweblist:state.authenticate.studentaskweblist,
    selectedClassToRemove: state.authenticate.selectedClassToRemove
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setInsightDashboardStepCount: (count) =>
      dispatch(setInsightDashboardStepCount(count)),
    setInsightDateRangeData: (data) => dispatch(setInsightDateRangeData(data)),
    getInsightAdminData: (data) => dispatch(actions.getInsightAdminData(data)),
    getinsightmoodbyday: (data) => dispatch(actions.getinsightmoodbyday(data)),
    getstudentWeblist: (data) => dispatch(actions.getstudentWeblist(data)),
    getaskstudentWeblist: (data) => dispatch(actions.getaskstudentWeblist(data)),
    getClassDetails: (uuid) => dispatch(actions.getClassDetails(uuid)),
    setSelectedStudentData:(uuid)=> dispatch(setSelectedStudentData(uuid)),
    getAllClass: () => dispatch(actions.getAllClass()),
    getAccountDetails: () => dispatch(actions.getAccountDetails()),
    doGetMultipleClasses: (param) =>
      dispatch(actions.doGetMultipleClasses(param)),
    setMultipleSelectedClass: (data) =>
      dispatch(setMultipleSelectedClass(data)),
    setTimelineTag: (data) => dispatch(doSetTimelineTag(data)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DashboardComponent)
);
