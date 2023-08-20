import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import VerifyEmailComponent from "../../../components/Authentication/School/VerifyEmail/VerifyEmail";

import * as actions from '../../../store/actions/index';
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendResendemailLink: (data) => dispatch(actions.sendResendemailLink(data)),
}
};





export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VerifyEmailComponent)
);
