import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MainComponent from "../../components/Main/Main";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainComponent)
);
