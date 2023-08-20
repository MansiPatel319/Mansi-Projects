import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DownloadStudentPasscodeListComponent   from "../../../components/pdf/DownloadStudentPasscodeListComponent";
import withToast from '../../../hoc/Toast';
import * as actions from '../../../store/actions/index';

const mapStateToProps = state => {
    return {
        educator: state.educator,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        printPasscodes: (data) => dispatch(actions.printPasscodes(data)),
        getClassDetails: (uuid) => dispatch(actions.getClassDetails(uuid)),
    }
}

export default withToast(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(DownloadStudentPasscodeListComponent)));
