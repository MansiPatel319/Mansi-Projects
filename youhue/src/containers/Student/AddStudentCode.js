import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import withToast from '../../hoc/Toast';

import * as actions from '../../store/actions/index';
import { setStudentMoodDetailCount } from '../../store/actions/authActions';

import AddStudentCodeComponent  from "../../components/Student/AddStudentCode/AddStudentCode";

const mapStateToProps = state => {
    return {
        student: state.student
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setStudentMoodDetailCount: (count) => dispatch(setStudentMoodDetailCount(count)),
        checkPassCode: (data) => dispatch(actions.checkPassCode(data))
    }
}

export default withToast(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(AddStudentCodeComponent)));
