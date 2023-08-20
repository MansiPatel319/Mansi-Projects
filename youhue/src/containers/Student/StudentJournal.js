import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as actions from '../../store/actions/index';
import { setStudentMoodDetailCount } from '../../store/actions/authActions';

import StudentJournalComponent  from "../../components/Student/StudentHome/StudentJournal/StudentJournal";

const mapStateToProps = state => {
    return {
        student: state.student,
        authenticate: state.authenticate
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setStudentMoodDetailCount: (count) => dispatch(setStudentMoodDetailCount(count)),
        viewJournal: () => dispatch(actions.viewJournal()),
        viewResponseJournal: (data) => dispatch(actions.viewResponseJournal(data)),
        ReadResponse: (data) => dispatch(actions.ReadResponse(data))
        
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(StudentJournalComponent));
