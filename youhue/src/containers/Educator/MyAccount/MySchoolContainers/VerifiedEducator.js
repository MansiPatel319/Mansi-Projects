import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import VerifiedEducator from "../../../../components/Educator/MyAccount/MySchool/MySchoolComponents/VerifiedEducator";
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
    verifiedEducatorList: () => dispatch(actions.verifiedEducatorList()),
    joinSchoolRequest: () => dispatch(actions.joinSchoolRequest()),
    verifyJoinRequest: (data) => dispatch(actions.verifyJoinRequest(data)),
    declineJoinRequets: (data) => dispatch(actions.declineJoinRequest(data)),
  };
};

export default withToast(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(VerifiedEducator))
);
