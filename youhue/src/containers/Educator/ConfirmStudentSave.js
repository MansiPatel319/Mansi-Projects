import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ConfirmStudentSave from "../../components/Educator/Modal/CopyPasteStudent/ConfirmStudentSave";
import withToast from "../../hoc/Toast";
import * as actions from '../../store/actions/index';
import {
  setAddStudentData,
  setAdminDashboardStepCount,
} from "../../store/actions/authActions";

const mapStateToProps = (state) => {
  return {
    educator: state.educator,
    authenticate: state.authenticate,
    addStudentData: state.addStudentData,
    addStudents:state.addStudents
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addStudentData: (data) => dispatch(setAddStudentData(data)),
    addStudents: (data) => dispatch(actions.addStudents(data)),
    getClassDetails: (uuid) => dispatch(actions.getClassDetails(uuid)),
    setAdminDashboardStepCount: (count) =>
      dispatch(setAdminDashboardStepCount(count)),
    getAccountDetails: () => dispatch(actions.getAccountDetails()),
    getSchoolData: () => dispatch(actions.getSchoolData()),
  };
};

export default withToast(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(ConfirmStudentSave))
);
