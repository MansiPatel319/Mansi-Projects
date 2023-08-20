import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import EditProfileComponent from "../../../components/Educator/MyAccount/EditProfile/EditProfile";
import withToast from "../../../hoc/Toast";

import * as actions from "../../../store/actions/index";

const mapStateToProps = (state) => {
  return {
    educator: state.educator.educatorData,
    authenticate: state.authenticate,
    isShowNotification: state.educator.isShowNotification,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editProfile: (data) => dispatch(actions.editProfile(data)),
    getAccountDetails: () => dispatch(actions.getAccountDetails()),
  };
};

export default withToast(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(EditProfileComponent))
);
