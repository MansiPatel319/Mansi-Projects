import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import withToast from '../../hoc/Toast';

import * as actions from '../../store/actions/index';
import { setStudentMoodDetailCount } from '../../store/actions/authActions';

import AddClassCodeComponent  from "../../components/Student/AddClassCode/AddClassCode";

const mapStateToProps = state => {
    return {
        student: state.student
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setStudentMoodDetailCount: (count) => dispatch(setStudentMoodDetailCount(count)),
        checkClassCode: (data) => dispatch(actions.checkClassCode(data))
    }
}

export default withToast(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(AddClassCodeComponent)));
