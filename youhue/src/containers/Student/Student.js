import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { setStudentMoodDetailCount } from '../../store/actions/authActions';

import StudentComponent  from "../../components/Student/Student";

const mapStateToProps = state => {
    return {
        student: state.student
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setStudentMoodDetailCount: (count) => dispatch(setStudentMoodDetailCount(count))
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(StudentComponent));
