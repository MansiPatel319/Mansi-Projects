import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import StudentData from "../../../../components/Educator/MyAccount/MySchool/MySchoolComponents/StudentData";
import withToast from "../../../../hoc/Toast";

import * as actions from "../../../../store/actions/index";

const mapStateToProps = (state) => {
  return {
    educator: state.educator,
    authenticate: state.authenticate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSchoolData: () => dispatch(actions.getSchoolData()),
  };
};

export default withToast(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentData))
);
