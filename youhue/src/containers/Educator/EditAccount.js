import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import EditAccountComponent  from "../../components/Educator/EditAccount/EditAccount";
import withToast from '../../hoc/Toast';

import * as actions from '../../store/actions/index';

const mapStateToProps = state => {
    return {
        educator: state.educator,
        authenticate: state.authenticate
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAccountDetails: () => dispatch(actions.getAccountDetails()),
        updateAccountDetails: (data) => dispatch(actions.updateAccountDetails(data))
    }
}

export default withToast(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(EditAccountComponent)));
