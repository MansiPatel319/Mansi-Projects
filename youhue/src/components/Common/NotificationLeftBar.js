import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as actions from "../../store/actions/index";
import youhue_logo from "../../assets/images/logo-icon.svg";
import { Link } from "react-router-dom";

class NotificationLeftBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      noSchoolAssociated: false,
      data: "",
    };
  }

  getSchoolData = () => {
    this.setState({ loading: true });
    this.props
      .getSchoolData()
      .then((res) => {
        if (res.status) {
          this.setState({ loading: false });
          if (res.code === 202) {
            this.setState({ noSchoolAssociated: true });
          } else if (res.data.join_request === "declined") {
            this.setState({ noSchoolAssociated: true });
          }
          this.setState({ data: res.data });
        }
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log(err);
      });
  };

  getAccountDetails = () => {
    this.props.getAccountDetails();
  };

  async componentDidMount() {
    localStorage.setItem("const_url", "");
    await this.getSchoolData();
    await this.getAccountDetails();
  }

  render() {
    const { data } = this.state;
    const { educatorData } = this.props.educator;
    const current_url = this.props.match.url;
    return (
      <>
        <div className="main-my-tab-left-div">
          <div className="main-my-tab-left-inner">
            <div className="main-my-tab-left-top-div">
              <ul className="my-tab-list">
                <li
                  className={`item-li ${
                    current_url === "/notification-settings" ? "active" : ""
                  }`}
                >
                  <Link to="/notification-settings" className="item-link">
                    {" "}
                    Classes{" "}
                  </Link>{" "}
                </li>
                <li
                  className={`item-li ${
                    current_url === "/notification-alerts" ? "active" : ""
                  }`}
                >
                  {" "}
                  <Link to="/notification-alerts" className="item-link">
                    {" "}
                    Alerts
                  </Link>{" "}
                </li>
                <li
                  className={`item-li ${
                    current_url === "/notification-account-updates"
                      ? "active"
                      : ""
                  }`}
                >
                  {" "}
                  <Link
                    to="/notification-account-updates"
                    className="item-link"
                  >
                    Account Updates{" "}
                  </Link>{" "}
                </li>
              </ul>
            </div>

            <div className="main-my-tab-left-bottom-div">
              <div className="user-div">
                <div className="user-left-div">
                  <div className="thumb-image">
                    <img src={youhue_logo} className="img-fluid" alt="img" />
                  </div>
                </div>
                <div className="user-right-div">
                  <h4 className="text-h4">
                    {" "}
                    <Link to="#" className="link">
                      {educatorData?.professor_name}
                    </Link>
                  </h4>
                  <p>{data?.school_name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    educator: state.educator,
    authenticate: state.authenticate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSchoolData: () => dispatch(actions.getSchoolData()),
    getAccountDetails: () => dispatch(actions.getAccountDetails()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NotificationLeftBar)
);
