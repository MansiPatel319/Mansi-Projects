import React from "react";
import { Link, withRouter } from "react-router-dom";
import youhue_logo from "../../../assets/images/mini_logo_new.svg";
import { connect } from "react-redux";
import withToast from "../../../hoc/Toast";
import * as actions from "../../../store/actions/index";
import Spinner from "../../Spinner/Spinner";

import "./MyAccount.scss";
import "../../../styles/style.css";

class MyAccountLeftMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }
  async componentDidMount() {
    localStorage.setItem("const_url","")
    this.props
      .getSchoolData()
      .then((res) => {
        if (res.status) {
          this.setState({ data: res.data });
        } else {
          // this.props.addToast(res.message, {
          //   appearance: "error",
          //   autoDismiss: true,
          // });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getSchoolData = () => {
    this.props.getSchoolData();
  };
  render() {
    const details = this.state.data;
    const educator = this.props.educator;
    const current_url = this.props.match.url;
    return (
      <div className="main-my-tab-left-div">
        {this.props.authenticate.loading ? <Spinner /> : null}
        <div className="main-my-tab-left-inner">
          <div className="main-my-tab-left-top-div">
            <ul className="my-tab-list">
              <li
                className={`item-li ${
                  current_url === "/educator/account" ? "active" : ""
                }`}
              >
                <Link to="/educator/account" className="item-link">
                  <span className="text-decoration">My School</span>
                </Link>
              </li>
              <li
                className={`item-li ${
                  current_url === "/educator/edit-profile" ? "active" : ""
                }`}
              >
                <Link to="/educator/edit-profile" className="item-link">
                  <span className="text-decoration">Edit Profile</span>
                </Link>
              </li>
              <li
                className={`item-li ${
                  current_url === "/change-password" ? "active" : ""
                }`}
              >
                <Link to="/change-password" className="item-link">
                  <span className="text-decoration">Change Password</span>
                </Link>
              </li>
              <li
                className={`item-li ${
                  current_url === "/educator/contact-us" ? "active" : ""
                }`}
              >
                <Link to="/educator/contact-us" className="item-link">
                  <span className="text-decoration">Contact Us</span>
                </Link>
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
                  <Link to="/educator" className="link">
                    {educator.educatorData.professor_name}
                  </Link>
                </h4>
                <p>{details.school_name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
  };
};

export default withToast(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(MyAccountLeftMenu))
);
