import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as actions from '../../store/actions/index';
import { setStudentMoodDetailCount, setEditEnable } from '../../store/actions/authActions';

import MoodDetailComponent  from "../../components/Student/StudentHome/StudentMoods/MoodDetail";


const mapStateToProps = state => {
    return {
        student: state.student
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setStudentMoodDetailCount: (count) => dispatch(setStudentMoodDetailCount(count)),
        setEditEnable: (isEditable) => dispatch(setEditEnable(isEditable)),
        latestEmotion: () => dispatch(actions.latestEmotion()),
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(MoodDetailComponent));
