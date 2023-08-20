import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SchoolIdSentComponent from "../../components/Authentication/ActivateAccount/SchoolIdSent";

import withToast from "../../hoc/Toast";

const mapStateToProps = (state) => {
  return {
    authenticate: state.authenticate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withToast(
  withRouter(
    connect(mapStateToProps, mapDispatchToProps)(SchoolIdSentComponent)
  )
);
