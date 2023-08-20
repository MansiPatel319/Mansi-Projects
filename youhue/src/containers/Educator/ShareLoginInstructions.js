import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ShareLoginInstructions from "../../components/Educator/Modal/ShareLoginInstructions/ShareLoginInstructions";
import * as actions from "../../store/actions/index";

const mapStateToProps = (state) => {
  return {
    educator: state.educator,
    authenticate: state.authenticate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    shareLoginInstructions: (data) =>
      dispatch(actions.shareLoginInstructions(data)),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ShareLoginInstructions)
);
