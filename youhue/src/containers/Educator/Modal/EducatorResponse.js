import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import EducatorResponseView from "../../../components/Educator/Modal/EducatoResponseViewInsight/EducatorResponseView";
import withToast from "../../../hoc/Toast";

import * as actions from "../../../store/actions/index";

const mapStateToProps = (state) => {
  return {
    educator: state.educator,
    authenticate: state.authenticate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    statusResponseGetData: (statusId) =>
      dispatch(actions.statusResponseGetData(statusId)),
    statusResponsePostData: (statusId, data) =>
      dispatch(actions.statusResponsePostData(statusId, data)),
  };
};

export default withToast(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(EducatorResponseView))
);
