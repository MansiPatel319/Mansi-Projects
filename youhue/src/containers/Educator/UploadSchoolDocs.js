import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import UploadSchoolDocs from "../../components/Educator/InviteAdmin/UploadSchoolDocs";
import withToast from "../../hoc/Toast";

import * as actions from "../../store/actions/index";

const mapStateToProps = (state) => {
  return { authenticate: state.authenticate, educator: state.educator };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAccountDetails: () => dispatch(actions.getAccountDetails()),
    getSchoolData: () => dispatch(actions.getSchoolData()),
    uploadSchoolId: (uuid) => dispatch(actions.uploadSchoolId(uuid)),
  };
};

export default withToast(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(UploadSchoolDocs))
);
