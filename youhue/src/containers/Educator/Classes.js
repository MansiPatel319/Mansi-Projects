import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AddClassNewComponent  from "../../components/Educator/AddClass/AddClassNew";
import withToast from '../../hoc/Toast';
import { setClassDetailData } from "../../store/actions/authActions";

import * as actions from '../../store/actions/index';

const mapStateToProps = state => {
    return {
        educator: state.educator,
        authenticate: state.authenticate,
        isDemoClass: state.educator.isDemoClass
    }
}

const mapDispatchToProps = dispatch => {
    console.log();
    return {
        addClass: (data) => dispatch(actions.addClass(data)),
        getAllClass: () => dispatch(actions.getAllClass()),
        getAdminClasses: () => dispatch(actions.getAdminClasses()),
        getClassDetails: (uuid) => dispatch(actions.getClassDetails(uuid)),
        getAccountDetails: () => dispatch(actions.getAccountDetails()),
        getSchoolData: () => dispatch(actions.getSchoolData()),
        handleRemoveDemoClass:() => dispatch(actions.handleRemoveDemoClass()),
        selectedClassId:(uuid) => dispatch(actions.selectedClassId(uuid)),
        setClassDetailData: (data) => dispatch(setClassDetailData(data)),
        // setAdminDashboardStepCount: (count) => dispatch(setAdminDashboardStepCount(count)),
    }
}

export default withToast(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(AddClassNewComponent)));



        
