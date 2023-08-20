import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ContactUsComponent from "../../../components/Educator/MyAccount/ContactUs/ContactUs";
import withToast from "../../../hoc/Toast";

import * as actions from "../../../store/actions/index";

const mapStateToProps = (state) => {
  return { educator: state.educator };
};

const mapDispatchToProps = (dispatch) => {
  return {
    contactUs: (data) => dispatch(actions.contactUs(data)),
  };
};

export default withToast(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(ContactUsComponent))
);
