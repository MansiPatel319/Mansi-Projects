import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import withToast from '../../hoc/Toast';

import AddEducatorComponent  from "../../components/Educator/AddEducator/AddEducator";

import * as actions from "../../store/actions/index"
import { setAdminDashboardStepCount } from '../../store/actions/authActions';

const mapStateToProps = state => {
    return {
        educator: state.educator,
        authenticate: state.authenticate
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAdminDashboardStepCount: (count) => dispatch(setAdminDashboardStepCount(count)),
        inviteEducator: (data) => dispatch(actions.inviteEducator(data)),
        getClassDetails: (uuid) => dispatch(actions.getClassDetails(uuid)),
        verifiedEducatorList: () => dispatch(actions.verifiedEducatorList()),
        ClassSchoolVerifiedEducatorList: (param) => dispatch(actions.ClassSchoolVerifiedEducatorList(param)),
    }
}

export default withToast(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(AddEducatorComponent)));
