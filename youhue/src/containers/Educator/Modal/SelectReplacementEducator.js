import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import withToast from "../../../hoc/Toast";

import * as actions from "../../../store/actions/index";
import SelectReplacementEducatorModal from "../../../components/Educator/Modal/SelectReplacementEducatorModal/SelectReplacementEducatorModal";

const mapStateToProps = (state) => {
  return {
    // educator: state.educator,
    // authenticate: state.authenticate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // inviteAdmin: (data) => dispatch(actions.inviteAdmin(data)),
    // getClassDetails: (uuid) => dispatch(actions.getClassDetails(uuid)),
    // verifiedEducatorList: () => dispatch(actions.verifiedEducatorList()),
  };
};

export default withToast(
  withRouter(
    connect(mapStateToProps, mapDispatchToProps)(SelectReplacementEducatorModal)
  )
);
