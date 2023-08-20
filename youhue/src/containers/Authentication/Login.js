import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import LoginComponent  from "../../components/Authentication/Login/Login";
import withToast from '../../hoc/Toast';

import * as actions from '../../store/actions/index';

const mapStateToProps = state => {
    return {
        authenticate: state.authenticate
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login:(data) => dispatch(actions.login(data)),
    }
}

export default withToast(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginComponent)));
