import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AllLogsComponent from "../../../components/Educator/InsightDashboard/AllLogs/AllLogs";

import * as actions from "../../../store/actions/index";
import {
  doSetTimelineTag,
  setInsightDashboardStepCount,
  setInsightDateRangeData,
} from "../../../store/actions/authActions";

const mapStateToProps = (state) => {
  return {
    educator: state.educator,
    insightData: state.insightData,
    authenticate: state.authenticate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setInsightDashboardStepCount: (count) =>
      dispatch(setInsightDashboardStepCount(count)),
    setInsightDateRangeData: (data) => dispatch(setInsightDateRangeData(data)),
    getAllLogData: (data) => dispatch(actions.getAllLogData(data)),
    doGetMultipleClasses: (data) =>
      dispatch(actions.doGetMultipleClasses(data)),
    getAllLogDataMultiple: (data) =>
      dispatch(actions.getAllLogDataMultiple(data)),
    setTimelineTag: (data) => dispatch(doSetTimelineTag(data)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllLogsComponent)
);
