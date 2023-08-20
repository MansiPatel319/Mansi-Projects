import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import FreeLimitReachedInvite from "../../../components/Educator/Modal/FreeLimitReachedInvite/FreeLimitReachedInvite";
import withToast from "../../../hoc/Toast";

import * as actions from "../../../store/actions/index";

const mapStateToProps = (state) => {
  return {
    educator: state.educator,
    authenticate: state.authenticate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    becomeSchoolAdmin: () => dispatch(actions.becomeSchoolAdmin()),
  };
};

export default withToast(
  withRouter(
    connect(mapStateToProps, mapDispatchToProps)(FreeLimitReachedInvite)
  )
);
