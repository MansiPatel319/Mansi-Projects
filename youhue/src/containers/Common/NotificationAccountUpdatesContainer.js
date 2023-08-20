import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import NotificationAccountUpdatesContainer from "../../components/Common/NotificationAccountUpdates";

import * as actions from "../../store/actions/index";

const mapStateToProps = (state) => {
  return {
    educator: state.educator,
    authenticate: state.authenticate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSchoolData: () => dispatch(actions.getSchoolData()),
    getAccountDetails: () => dispatch(actions.getAccountDetails()),
    updateAdminNotificationFlag: (data) => dispatch(actions.updateAdminNotificationFlag(data)),
  };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(NotificationAccountUpdatesContainer)
  );