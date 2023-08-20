import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ResetPasswordLinkComponent  from "../../components/Authentication/ResetPassword/ResetPasswordLink/ResetPasswordLink";

import withToast from '../../hoc/Toast';

import * as actions from '../../store/actions/index';

const mapStateToProps = state => {
    return {
        authenticate: state.authenticate
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendResetPasswordLink: (data) => dispatch(actions.sendResetPasswordLink(data)),
    }
}

export default withToast(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPasswordLinkComponent)));
