import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import JoinRequestDeclineAccountLock from "../../components/Educator/Dashboard/AccountLock/JoinRequestDeclineAccountLock";
import withToast from "../../hoc/Toast";

import * as actions from "../../store/actions/index";

const mapStateToProps = (state) => {
  return { authenticate: state.authenticate };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadSchoolId: (uuid) => dispatch(actions.uploadSchoolId(uuid)),
  };
};

export default withToast(
  withRouter(
    connect(mapStateToProps, mapDispatchToProps)(JoinRequestDeclineAccountLock)
  )
);
