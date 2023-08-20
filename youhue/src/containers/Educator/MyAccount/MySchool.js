import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MySchoolComponent from "../../../components/Educator/MyAccount/MySchool/MySchool";
import withToast from "../../../hoc/Toast";

import * as actions from "../../../store/actions/index";

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
    becomeSchoolAdmin: () => dispatch(actions.becomeSchoolAdmin()),
    editSchoolDetails: (data, id) =>
      dispatch(actions.editSchoolDetails(data, id)),
  };
};

export default withToast(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(MySchoolComponent))
);
