import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import VerifyEmailComponent from "../../components/Authentication/ActivateAccount//VerifiedEmail";
import * as actions from "../../store/actions/index";
import withToast from "../../hoc/Toast";

const mapStateToProps = (state) => {
  return {
    authenticate: state.authenticate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    activateAccount: (uuid) => dispatch(actions.activateAccount(uuid)),
  };
};

export default withToast(
  withRouter(
    connect(mapStateToProps, mapDispatchToProps)(VerifyEmailComponent)
  )
);
