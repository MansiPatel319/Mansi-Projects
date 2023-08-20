import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import withToast from '../../hoc/Toast';

import * as actions from '../../store/actions/index';
import { setStudentMoodDetailCount } from '../../store/actions/authActions';

import DescribeMoodComponent  from "../../components/Student/StudentHome/StudentMoods/DescribeMood";


const mapStateToProps = state => {
    return {
        student: state.student,
        loading:state.authenticate.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setStudentMoodDetailCount: (count) => dispatch(setStudentMoodDetailCount(count)),
        addEmotion: (data) => dispatch(actions.addEmotion(data)),
        editEmotion: (uuid, data) => dispatch(actions.editEmotion(uuid,data))
    }
}
export default withToast(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(DescribeMoodComponent)));
