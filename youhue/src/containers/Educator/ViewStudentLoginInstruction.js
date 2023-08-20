import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ViewStudentLoginInstrusctionComponent from "../../components/Educator/ViewStudentLoginInstructions/ViewStudentLoginInstruction";
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
  };
};

export default withToast(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(ViewStudentLoginInstrusctionComponent)
  )
);
