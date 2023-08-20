import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import FooterComponent  from "../../components/Common/Footer/Footer";

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
)(FooterComponent));
