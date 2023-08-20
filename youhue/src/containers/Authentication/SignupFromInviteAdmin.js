import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import withToast from '../../hoc/Toast';
import SignupFromInviteAdmin  from "../../components/Authentication/Signup/SignupFromInviteAdmin/SignupFromInviteAdmin";
import * as actions from '../../store/actions/index';

const mapStateToProps = state => {
    return {
        authenticate: state.authenticate
    }
}

const mapDispatchToProps = dispatch => {
    return {
        verifyAdminInvitationLink: (uuid) => dispatch(actions.verifyAdminInvitationLink(uuid)),
        signupFromAdminInvite: (uuid, sid, data) => dispatch(actions.signupFromAdminInvite(uuid,sid,data))
    }
}

export default withToast(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SignupFromInviteAdmin)));
