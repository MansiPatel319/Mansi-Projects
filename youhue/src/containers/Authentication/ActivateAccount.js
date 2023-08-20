import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ActiveAccountComponent from "../../components/Authentication/ActivateAccount/ActivateAccount";
import withToast from "../../hoc/Toast";

import * as actions from "../../store/actions/index";

const mapStateToProps = (state) => {
  return { authenticate: state.authenticate };
};

const mapDispatchToProps = (dispatch) => {
  return {
    activateAccount: (uuid) => dispatch(actions.activateAccount(uuid)),
    uploadSchoolId: (uuid) => dispatch(actions.uploadSchoolId(uuid)),
  };
};

export default withToast(
  withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ActiveAccountComponent)
  )
);
