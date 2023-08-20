import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import JoinSchoolComponent from "../../../components/Authentication/School/JoinSchool/JoinSchool";
import withToast from "../../../hoc/Toast";

import * as actions from "../../../store/actions/index";

const mapStateToProps = (state) => {
  return {
    educator: state.educator
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    joinSchool: (data) => dispatch(actions.joinSchool(data)),
    joinSchoolWithPut: (data) => dispatch(actions.joinSchoolWithPut(data)),
    getSchoolDetails: (data) => dispatch(actions.getSchoolDetails(data)),
    getAccountDetails: () => dispatch(actions.getAccountDetails()),
  };
};

export default withToast(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(JoinSchoolComponent))
);
