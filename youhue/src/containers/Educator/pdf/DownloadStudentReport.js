import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DownloadStudentReportComponent  from "../../../components/pdf/DownloadStudentReportComponent";
import withToast from '../../../hoc/Toast';
import * as actions from '../../../store/actions/index';

const mapStateToProps = state => {
    return {
        educator: state.educator,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getClassDetails: (uuid) => dispatch(actions.getClassDetails(uuid))
    }
}

export default withToast(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(DownloadStudentReportComponent)));
