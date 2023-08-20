import React from "react";
import NotificationLeftBar from "./NotificationLeftBar";
import HeaderContainer from "../../containers/Common/Header";
import FooterContainer from "../../containers/Common/Footer";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import NotificationCommonComponent from "./NotificationCommonComponent";

class NotificationAccountUpdates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isbannerShoe: true,
      is_admin_notification:
        this.props.educator?.educatorData?.is_admin_notification,
    };
  }
  handleclosebanner = () => {
    this.setState({ isbannerShoe: false });
    localStorage.setItem("isShowNotificationBanner", false);
  };

  getEducatorClassNotificationSetting() {
    this.props
      .notificationClassListing()
      .then((res) => {
        if (res.status && res.code === 200) {
          this.setState({
            is_admin_notification: res.data.is_admin_notification,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getAccountDetail();
  }

  getAccountDetail() {
    this.props
      .getAccountDetails()
      .then((res) => {
        if (res.status && res.code === 200) {
          this.setState({
            is_admin_notification: res.data.is_admin_notification,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onChange(e) {
    let formData = new FormData();
    formData.append("is_admin", e.target.checked);
    this.props.updateAdminNotificationFlag(formData).then(() => {
      this.getAccountDetail();
    });
  }

  render() {
    const { educatorData } = this.props.educator;
    const { is_admin_notification } = this.state;
    return (
      <>
        <div id="wrapper" className="wrapper">
          <div className="main-middle-area dashboard-middle-area">
            {this.props.authenticate.loading ? <Spinner /> : null}
            <section className="general-dashboard-section bg-image-common">
              <div className="general-dashboard-div background-color-main">
                <HeaderContainer isLoggedIn={true} />

                <div className="body-main-new my-account-main-div">
                  <div className="container-main-root">
                    <div className="container-inner-root">
                      <NotificationCommonComponent data={this.props?.educator?.educatorData} /> 

                      <div className="main-my-tab-area-div">
                        <div className="main-my-tab-area-row">
                          <NotificationLeftBar />

                          <div className="main-my-tab-right-div">
                            <div className="main-my-tab-right-inner notific_wrapper">
                              <div className="form-custom-div custom-school-div">
                                <div className="yh_notification_setting">
                                  <p className="prag-text">
                                    You will receive account related updates.
                                  </p>
                                  <div className="notify_grade account_updates">
                                    <div className="notific_checkbox">
                                      <label for="admin">
                                        I want to get notified about admin
                                        tasks.
                                      </label>
                                      <input
                                        type="checkbox"
                                        id="admin"
                                        checked={is_admin_notification}
                                        onChange={(e) => this.onChange(e)}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <FooterContainer isLoggedIn={true} />
              </div>
            </section>
          </div>
        </div>
      </>
    );
  }
}

export default NotificationAccountUpdates;
