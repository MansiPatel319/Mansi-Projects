import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CopyPasteStudent from "../../components/Educator/Modal/CopyPasteStudent/CopyPasteStudent";
import * as actions from '../../store/actions/index';
import withToast from "../../hoc/Toast";
import { setAddStudentData } from "../../store/actions/authActions";

const mapStateToProps = (state) => {
  return {
    educator: state.educator,
    authenticate: state.authenticate,
    addStudentData: state.educator.addStudentData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addStudentData: (data) => dispatch(setAddStudentData(data)),
    getSchoolData: () => dispatch(actions.getSchoolData()),
    getAccountDetails: () => dispatch(actions.getAccountDetails()),
  };
};

export default withToast(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(CopyPasteStudent))
);
