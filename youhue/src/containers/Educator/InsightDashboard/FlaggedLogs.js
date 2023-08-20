import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import FlaggedLogsComponent from "../../../components/Educator/InsightDashboard/FlaggedLogs/FlaggedLogs";

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
    getFlaggedLogData: (data) => dispatch(actions.getFlaggedLogData(data)),
    doGetMultipleClasses: (data) =>
      dispatch(actions.doGetMultipleClasses(data)),
    getFlaggedLogDataMultiple: (data) =>
      dispatch(actions.getFlaggedLogDataMultiple(data)),
    setTimelineTag: (data) => dispatch(doSetTimelineTag(data)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FlaggedLogsComponent)
);
