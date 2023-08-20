import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import NotificationSettingComponent from "../../components/Common/NotificationSettingComponent";

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
    notificationClassListing: () => dispatch(actions.notificationClassListing()),
    updateClassNotificationFlag: (data) => dispatch(actions.updateClassNotificationFlag(data)),
    
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NotificationSettingComponent)
);