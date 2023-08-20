import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SignupComponent  from "../../components/Authentication/Signup/Signup";
import withToast from '../../hoc/Toast';

import * as actions from '../../store/actions/index';


const mapStateToProps = state => {
    return {
        authenticate: state.authenticate
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signup: (data) => dispatch(actions.signup(data)),
    }
}

export default withToast(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SignupComponent)));
