import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { setStudentMoodDetailCount, setStudentSelectedClass } from '../../store/actions/authActions';

import * as actions from '../../store/actions/index';
import StudentClassListComponent  from "../../components/Student/StudentClassList/StudentClassList";

const mapStateToProps = state => {
    return {
        student: state.student
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setStudentMoodDetailCount: (count) => dispatch(setStudentMoodDetailCount(count)),
        checkClassCode: (data) => dispatch(actions.checkClassCode(data)),
        setStudentSelectedClass: (uuid) => dispatch(setStudentSelectedClass(uuid))
    }
}
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(StudentClassListComponent));
