import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import withToast from "../../../hoc/Toast";

import * as actions from "../../../store/actions/index";
import InviteSomeone from "../../../components/Educator/Modal/InviteSomeone/InviteSomeone";
import { setAdminDashboardStepCount } from "../../../store/actions/authActions";

const mapStateToProps = (state) => {
  return {
    educator: state.educator,
    authenticate: state.authenticate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAdminDashboardStepCount: (count) => dispatch(setAdminDashboardStepCount(count)),
    inviteAdmin: (data) => dispatch(actions.inviteAdmin(data)),
    getClassDetails: (uuid) => dispatch(actions.getClassDetails(uuid)),
    verifiedEducatorList: () => dispatch(actions.verifiedEducatorList()),
    getSchoolData: () => dispatch(actions.getSchoolData()),
  };
};

export default withToast(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(InviteSomeone))
);
