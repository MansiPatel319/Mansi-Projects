import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import InsightDashboardComponent from "../../../components/Educator/InsightDashboard/InsightDashboard";
import { getClassDetails } from "../../../store/actions";

import { setInsightDashboardStepCount } from "../../../store/actions/authActions";

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
      getClassDetails: (uuid) =>
      dispatch(getClassDetails(uuid)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InsightDashboardComponent)
);
