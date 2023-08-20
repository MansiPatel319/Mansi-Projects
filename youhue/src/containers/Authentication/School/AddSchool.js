import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AddSchoolComponent from "../../../components/Authentication/School/AddSchool/AddSchool";
import withToast from "../../../hoc/Toast";

import * as actions from "../../../store/actions/index";

const mapStateToProps = (state) => {
  return {
    authenticate: state.authenticate
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addSchool: (data) => dispatch(actions.addSchool(data)),
  };
};

export default withToast(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(AddSchoolComponent))
);
