import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DownloadClassReportComponent  from "../../../components/pdf/DownloadClassReportComponent";
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
)(DownloadClassReportComponent)));
