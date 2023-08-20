import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as actions from '../../store/actions/index';
import { setStudentMoodDetailCount, setMoodDescriptionData } from '../../store/actions/authActions';

import MoodListComponent  from "../../components/Student/StudentHome/StudentMoods/MoodList";
import withToast from '../../hoc/Toast';

const mapStateToProps = state => {
    return {
        student: state.student
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setStudentMoodDetailCount: (count) => dispatch(setStudentMoodDetailCount(count)),
        getMoodList: () => dispatch(actions.getMoodList()),
        getBotResponse: (uuid) => dispatch(actions.getBotResponse(uuid)),
        setMoodDescriptionData: (data) => dispatch(setMoodDescriptionData(data))
    }
}

export default withToast(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(MoodListComponent)));
