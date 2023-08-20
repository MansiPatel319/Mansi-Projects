import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DownloadReportComponent  from "../../../components/Common/Models/DownloadReport";
import * as actions from '../../../store/actions/index';

const mapStateToProps = state => {
    return {
        classes: state.classes,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllClass: () => dispatch(actions.getAllClass()),
        getClassDetails: (uuid) => dispatch(actions.getClassDetails(uuid)),
        downloadClassReport:(params) => dispatch(actions.downloadClassReport(params)),
        getStudentList:(params) => dispatch(actions.getStudentList(params)),
        downloadStudentReport:(params) => dispatch(actions.downloadStudentReport(params))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DownloadReportComponent);
