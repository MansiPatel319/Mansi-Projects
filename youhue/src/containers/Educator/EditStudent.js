import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import EditStudentComponent  from "../../components/Educator/EditStudent/EditStudent";
import * as actions from '../../store/actions/index';
import withToast  from '../../hoc/Toast';
import { setAdminDashboardStepCount, setStudentDetailData } from '../../store/actions/authActions';

const mapStateToProps = state => {
    return {
        educator: state.educator
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAdminDashboardStepCount: (count) => dispatch(setAdminDashboardStepCount(count)),
        setStudentDetailData: (data) => dispatch(setStudentDetailData(data)),
        getClassDetails: (uuid) => dispatch(actions.getClassDetails(uuid)),
        generatePasscode: (uuid) => dispatch(actions.generatePasscode(uuid)),
        updatePasscode: (uuid, data) => dispatch(actions.updatePasscode(uuid, data)),
        updateStudentName: (uuid, data) => dispatch(actions.updateStudentName(uuid, data)),
        removeStudentFromClass: (data) => dispatch(actions.removeStudentFromClass(data)),
        deleteStudent: (uuid) => dispatch(actions.deleteStudent(uuid)),
        getSchoolData: () => dispatch(actions.getSchoolData()),
        getAccountDetails: () => dispatch(actions.getAccountDetails()),
    }
}

export default withToast(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(EditStudentComponent)));
