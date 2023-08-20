import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import EducatorComponent from "../../components/Educator/Educator";

import { setAdminDashboardStepCount, setInsightDashboardStepCount, setRemoveSelectedClass, setClassDetailData, setClassList, setClassListAdmin } from "../../store/actions/authActions";
import * as actions from "../../store/actions/index";

const mapStateToProps = (state) => {
  return {
    educator: state.educator,
    authenticate: state.authenticate,
    selectedClassToRemove: state.authenticate.selectedClassToRemove
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAdminDashboardStepCount: (count) =>
      dispatch(setAdminDashboardStepCount(count)),
    getAccountDetails: () => dispatch(actions.getAccountDetails()),
    getAllClass: () => dispatch(actions.getAllClass()),
    getAdminClasses: () => dispatch(actions.getAdminClasses()),
    getSchoolData: () => dispatch(actions.getSchoolData()),
    getClassDetails: (uuid) => dispatch(actions.getClassDetails(uuid)),
    setInsightDashboardStepCount: (step) => dispatch(setInsightDashboardStepCount(step)),
    getClassCodePdf: (uuid) => dispatch(actions.getClassCodePdf(uuid)),
    setRemoveSelectedClass: (data) => dispatch(setRemoveSelectedClass(data)),
    setClassDetailData: (data) => dispatch(setClassDetailData(data)),
    setClassList: (data) => dispatch(setClassList(data)),
    setClassListAdmin: (data) => dispatch(setClassListAdmin(data)),


  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EducatorComponent)
);