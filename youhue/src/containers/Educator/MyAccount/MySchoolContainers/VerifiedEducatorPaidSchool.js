import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import VerifiedEducatorPaidSchool from "../../../../components/Educator/MyAccount/MySchool/MySchoolComponents/VerifiedEducatorPaidSchool";
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
    getAccountDetails: () => dispatch(actions.getAccountDetails()),
    becomeSchoolAdmin: () => dispatch(actions.becomeSchoolAdmin()),
  };
};

export default withToast(
  withRouter(
    connect(mapStateToProps, mapDispatchToProps)(VerifiedEducatorPaidSchool)
  )
);
