import React from "react";
import { useDispatch } from "react-redux";
import { setIsNotificationBanner } from "../../store/actions/authActions";
import NotificationLeftBar from "./NotificationLeftBar";
import HeaderContainer from "../../containers/Common/Header";
import FooterContainer from "../../containers/Common/Footer";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

class NotificationAlertsSettings extends React.Component {
  constructor(props) {
    super(props);
    console.log(props,"props");
    this.state = {
      isbannerShoe: true,
      manageFlag: false,
    };
  }
  handleclosebanner = () => {
    this.setState({ isbannerShoe: false });
    localStorage.setItem("isShowNotificationBanner", false);
  };

  render() {
    const { data } = this.props;
    return (
      <>
        <div className="message-text-dark-div" id="message-text-dark01">
          {localStorage.getItem("isShowNotificationBanner") !== "false" && (
            <>
              {
              !data.is_verified_admin &&
              data.role === "Admin" &&
              this.state.noSchoolAssociated === false ? (
                <div className="message-text-dark-div" id="message-text-dark01">
                  <div className="message-text-dark-row">
                    <div className="text-div">
                      <p>
                        You can continue using YouHue in your class until{" "}
                        {data.end_date} after which your account will
                        become inactive unless you are verified.
                      </p>
                    </div>
                    <div className="cancel-div">
                      <div className="cancel-icon-div">
                        <button
                          className="btn-cancel-icon"
                          id="cancel-message-row"
                          onClick={this.handleclosebanner}
                        >
                          <span className="custom-icon cancel-new-icon"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </>
          )}
        </div>

        <div className="my-account-text-div">
          <div className="my-account-text-row">
            <div className="text-div">
              <h4>My Account</h4>
            </div>
            <div className="cancel-div">
              <div className="cancel-icon-div">
                <Link to="/educator/home" className="btn-cancel-icon">
                  {" "}
                  <span className="custom-icon cancel-round-icon"></span>{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default NotificationAlertsSettings;
