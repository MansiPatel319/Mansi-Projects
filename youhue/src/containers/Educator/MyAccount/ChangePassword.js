import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ChangePasswordComponent from "../../../components/Educator/MyAccount/ChangePassword/ChangePassword";
import withToast from "../../../hoc/Toast";

import * as actions from "../../../store/actions/index";

const mapStateToProps = (state) => {
  return {
    educator: state.educator,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePassword: (data) => dispatch(actions.changePassword(data)),
  };
};

export default withToast(
  withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ChangePasswordComponent)
  )
);
