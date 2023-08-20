import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AddStudentComponent from "../../components/Educator/AddStudent/AddStudent";

import * as actions from "../../store/actions/index";
import withToast from "../../hoc/Toast";
import {
  setAdminDashboardStepCount,
  setAddStudentData,
} from "../../store/actions/authActions";

const mapStateToProps = (state) => {
  return {
    educator: state.educator,
    authenticate: state.authenticate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAdminDashboardStepCount: (count) =>
      dispatch(setAdminDashboardStepCount(count)),
    addStudents: (data) => dispatch(actions.addStudents(data)),
    getSchoolData: () => dispatch(actions.getSchoolData()),
    getClassDetails: (uuid) => dispatch(actions.getClassDetails(uuid)),
    addStudentsUsingCsv: (data) => dispatch(actions.addStudentsUsingCsv(data)),
    addStudentData: (data) => dispatch(setAddStudentData(data)),
  };
};

export default withToast(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(AddStudentComponent))
);
