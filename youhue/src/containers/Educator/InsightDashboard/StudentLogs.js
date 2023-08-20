import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import StudentLogsComponent from "../../../components/Educator/InsightDashboard/StudentLogs/StudentLogs";

import * as actions from "../../../store/actions/index";
import {
  setInsightDashboardStepCount,
  setInsightDateRangeData,
  setSelectedStudentData,
  setAdminDashboardStepCount,
  doSetTimelineTag,
} from "../../../store/actions/authActions";

const mapStateToProps = (state) => {
  return {
    educator: state.educator,
    insightData: state.insightData,
    authenticate: state.authenticate,
    studentweblist:state.authenticate.studentweblist,
    studentweblistlink:state.studentweblistlink
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setInsightDashboardStepCount: (count) =>
      dispatch(setInsightDashboardStepCount(count)),
    setInsightDateRangeData: (data) => dispatch(setInsightDateRangeData(data)),
    getstudentWeblist: (data) => dispatch(actions.getstudentWeblist(data)),
    getIndividualStudentData: (data) =>
      dispatch(actions.getIndividualStudentData(data)),
    setSelectedStudentData: (uuid) => dispatch(setSelectedStudentData(uuid)),
    setAdminDashboardStepCount: (count) =>
      dispatch(setAdminDashboardStepCount(count)),
    setTimelineTag: (data) => dispatch(doSetTimelineTag(data)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(StudentLogsComponent)
);
