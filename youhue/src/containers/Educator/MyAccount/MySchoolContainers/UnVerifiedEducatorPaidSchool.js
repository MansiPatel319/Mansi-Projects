import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import UnVerifiedEducatorPaidSchool from "../../../../components/Educator/MyAccount/MySchool/MySchoolComponents/UnVerifiedEducatorPaidSchool";
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
    uploadSchoolId: (uuid) => dispatch(actions.uploadSchoolId(uuid)),
  };
};

export default withToast(
  withRouter(
    connect(mapStateToProps, mapDispatchToProps)(UnVerifiedEducatorPaidSchool)
  )
);
