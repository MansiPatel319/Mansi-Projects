import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import withToast from '../../hoc/Toast';
import SignupFromInviteComponent  from "../../components/Authentication/Signup/SignupFromInvite/SignupFromInvite";
import * as actions from '../../store/actions/index';

const mapStateToProps = state => {
    return {
        authenticate: state.authenticate
    }
}

const mapDispatchToProps = dispatch => {
    return {
        verifyInvitationLink: (uuid) => dispatch(actions.verifyInvitationLink(uuid)),
        signupFromInvite: (uuid,data) => dispatch(actions.signupFromInvite(uuid,data))
    }
}

export default withToast(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SignupFromInviteComponent)));
