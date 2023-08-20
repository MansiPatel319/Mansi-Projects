import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AddClassComponent  from "../../components/Educator/AddClass/AddClass";
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
        addClass: (data) => dispatch(actions.addClass(data)),
        getAllClass: () => dispatch(actions.getAllClass()),
        getClassDetails: (uuid) => dispatch(actions.getClassDetails(uuid))
    }
}

export default withToast(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(AddClassComponent)));
