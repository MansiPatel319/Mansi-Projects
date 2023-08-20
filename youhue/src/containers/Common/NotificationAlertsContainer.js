import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import NotificationAlertsSettings from "../../components/Common/NotificationAlertsSettings";

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
    updateAlertNotificationFlag: (data) => dispatch(actions.updateAlertNotificationFlag(data)),
  };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(NotificationAlertsSettings)
  );