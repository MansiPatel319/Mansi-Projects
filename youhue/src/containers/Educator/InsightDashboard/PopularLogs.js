import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PopularLogsComponent from "../../../components/Educator/InsightDashboard/PopularLogs/PopularLogs";

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
    getPopularTopicData: (data) => dispatch(actions.getPopularTopicData(data)),
    doGetMultipleClasses: (data) =>
      dispatch(actions.doGetMultipleClasses(data)),
    getPopularTopicDataMultiple: (data) =>
      dispatch(actions.getPopularTopicDataMultiple(data)),
    setTimelineTag: (data) => dispatch(doSetTimelineTag(data)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PopularLogsComponent)
);
