import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import FindSchoolComponent from "../../../components/Authentication/School/FindSchool/FindSchool";

import * as actions from "../../../store/actions/index";

const mapStateToProps = (state) => {
  return {
    educator:state.educator
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    findSchool: (data) => dispatch(actions.findSchool(data)),
    activateAccount: (uuid) => dispatch(actions.activateAccount(uuid)),
    getAccountDetails: () => dispatch(actions.getAccountDetails()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FindSchoolComponent)
);
