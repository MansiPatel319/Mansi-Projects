import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as actions from '../../store/actions/index';
import { setStudentMoodDetailCount } from '../../store/actions/authActions';

import StudentJournalResponseContainer  from "../../components/Student/StudentHome/StudentJournal/StudentJournalResponse";

const mapStateToProps = state => {
    return {
        student: state.student,
        authenticate: state.authenticate,
        studentJournalResponseData:state.student.studentJournalResponseData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setStudentMoodDetailCount: (count) => dispatch(setStudentMoodDetailCount(count)),
        viewResponseJournal: (data) => dispatch(actions.viewResponseJournal(data))
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(StudentJournalResponseContainer));
