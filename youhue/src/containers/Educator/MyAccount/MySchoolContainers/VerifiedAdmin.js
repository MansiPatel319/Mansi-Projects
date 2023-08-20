import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import VerifiedAdminComponent from "../../../../components/Educator/MyAccount/MySchool/MySchoolComponents/VerifiedAdmin";
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
    addSchoolAdmin: (data) => dispatch(actions.addSchoolAdmin(data)),
    revmoveEducatorFromSchool: (data) =>
      dispatch(actions.revmoveEducatorFromSchool(data)),
    replaceEductorFromSchool: (data) =>
      dispatch(actions.replaceEductorFromSchool(data)),
  };
};

export default withToast(
  withRouter(
    connect(mapStateToProps, mapDispatchToProps)(VerifiedAdminComponent)
  )
);
