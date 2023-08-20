import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ResetPasswordComponent  from "../../components/Authentication/ResetPassword/ResetPassword";

import withToast from '../../hoc/Toast';

import * as actions from '../../store/actions/index';

const mapStateToProps = state => {
    return {
        authenticate: state.authenticate
    }
}

const mapDispatchToProps = dispatch => {
    return {
        verifyResetPasswordLink: (uuid) => dispatch(actions.verifyResetPasswordLink(uuid)),
        resetPassword: (uuid, data) => dispatch(actions.resetPassword(uuid, data))
    }
}

export default withToast(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPasswordComponent)));
