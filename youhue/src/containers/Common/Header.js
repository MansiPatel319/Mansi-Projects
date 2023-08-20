import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import HeaderComponent from "../../components/Common/Header/Header";
import * as actions from "../../store/actions/index";
import {
   setClassDetailData,
  setClassList, setClassListAdmin, setRemoveSelectedClass
} from "../../store/actions/authActions";
import withToast from "../../hoc/Toast";

const mapStateToProps = (state) => {
  return {
    educator: state.educator,
    notification: state.educator.notification,
  };
};




const mapDispatchToProps = (dispatch) => {
  return {
    getNotification: () => dispatch(actions.getAllNotification()),
    handleReadNotification: (data) =>
      dispatch(actions.handleReadNotification(data)),
    handleMarkAllReadNotification: () =>
      dispatch(actions.handleMarkAllReadNotification()),
    getAccountDetails: () => dispatch(actions.getAccountDetails()),
    setClassDetailData: (data) => dispatch(setClassDetailData(data)),
    setClassList: (data) => dispatch(setClassList(data)),
    setClassListAdmin: (data) => dispatch(setClassListAdmin(data)),
    selectedClassId: (uuid) => dispatch(actions.selectedClassId(uuid)),
    getClassDetails: (uuid) => dispatch(actions.getClassDetails(uuid)),
    setRemoveSelectedClass: (data) => dispatch(setRemoveSelectedClass(data)),
  };
};

export default withToast(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderComponent))
);
