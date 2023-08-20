import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DashboardComponent from "../../components/Educator/Dashboard/Dashboard";
import * as actions from "../../store/actions/index";
import withToast from "../../hoc/Toast";
import {
  setAdminDashboardStepCount,
  setStudentDetailData,
  setSelectedStudentData,
  setInsightDashboardStepCount,
  setRemoveSelectedClass
} from "../../store/actions/authActions";

const mapStateToProps = (state) => {
  return {
    educator: state.educator,
    selectedClassId: state.authenticate.selectedClassId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAdminDashboardStepCount: (count) =>
      dispatch(setAdminDashboardStepCount(count)),
    setStudentDetailData: (data) => dispatch(setStudentDetailData(data)),
    deleteEducator: (uuid) => dispatch(actions.deleteEducator(uuid)),
    getClassDetails: (uuid) => dispatch(actions.getClassDetails(uuid)),
    updateClassName: (uuid, param) =>
      dispatch(actions.updateClassName(uuid, param)),
    getAllClass: () => dispatch(actions.getAllClass()),
    printPasscodes: (data) => dispatch(actions.printPasscodes(data)),
    removeEducatorFromClass: (data) =>
      dispatch(actions.removeEducatorFromClass(data)),
    getSchoolData: () => dispatch(actions.getSchoolData()),
    becomeSchoolAdmin: () => dispatch(actions.becomeSchoolAdmin()),
    setSelectedStudentData: (uuid) => dispatch(setSelectedStudentData(uuid)),
    resendInviteEmail: (data) => dispatch(actions.resendInviteEmail(data)),
    setInsightDashboardStepCount: (count) =>
      dispatch(setInsightDashboardStepCount(count)),
    setRemoveSelectedClass: (data) => dispatch(setRemoveSelectedClass(data))

  };
};

export default withToast(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardComponent))
);
