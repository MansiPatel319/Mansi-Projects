import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ViewLogininstruction from "../../components/Educator/ViewLogininstruction/ViewLogininstruction";
import { setAdminDashboardStepCount } from "../../store/actions/authActions";
import * as actions from "../../store/actions/index";
import withToast from "../../hoc/Toast";

const mapStateToProps = (state) => {
  return {
    educator: state.educator,
    authenticate: state.authenticate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAdminDashboardStepCount: (count) =>
      dispatch(setAdminDashboardStepCount(count)),
    shareLoginInstructions: (data) =>
      dispatch(actions.shareLoginInstructions(data)),
    shareLoginInstructionsgetapi: (classid, studentid) =>
      dispatch(actions.shareLoginInstructionsgetapi(classid, studentid)),
  };
};

export default withToast(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewLogininstruction))
);
