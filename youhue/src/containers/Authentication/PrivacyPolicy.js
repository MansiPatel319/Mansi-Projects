import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PrivacyPolicyComponent  from "../../components/Authentication/PrivacyPolicy/PrivacyPolicy";

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PrivacyPolicyComponent));
