import React from "react";
import NotificationLeftBar from "./NotificationLeftBar";
import HeaderContainer from "../../containers/Common/Header";
import FooterContainer from "../../containers/Common/Footer";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import NotificationCommonComponent from "./NotificationCommonComponent";

class NotificationAlertsSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isbannerShoe: true,
      manageFlag: false,
      value: [],
      is_flag_notification: this.props.educator?.educatorData?.is_flag_notification,
      is_alert_notification: this.props.educator?.educatorData?.is_alert_notification,
    };
  }
  handleclosebanner = () => {
    this.setState({ isbannerShoe: false });
    localStorage.setItem("isShowNotificationBanner", false);
  };

  componentDidMount() {
    this.getAccountDetail();
  }

  getAccountDetail() {
    this.props
      .getAccountDetails()
      .then((res) => {
        if (res.status && res.code === 200) {
          this.setState({
            is_flag_notification: res.data.is_flag_notification,
            is_alert_notification: res.data.is_alert_notification,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onChange(e) {
    let formData = new FormData();
    if(e.target.id == "flag"){
      formData.append("is_flag", e.target.checked);
      formData.append("is_nagetive", this.state.is_alert_notification);
    }
    if(e.target.id == "alert"){
      formData.append("is_flag", this.state.is_flag_notification);
      formData.append("is_nagetive", e.target.checked);
    }
    this.props.updateAlertNotificationFlag(formData).then(()=>{
      this.getAccountDetail()
    });
  }

  render() {
    const { educatorData } = this.props.educator;
    const { is_flag_notification, is_alert_notification } = this.state;
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
                                    You will receive notifications of all the
                                    flagged words & phrases, and students’
                                    negative trend.
                                  </p>
                                  <div className="notify_grade notify_alert">
                                    <div className="notific_checkbox">
                                      <label for="flag">Flagged Logs</label>
                                      <input
                                        type="checkbox"
                                        id="flag"
                                        checked={is_flag_notification}
                                        onChange={(e) =>
                                          this.onChange(e)
                                        }
                                      />
                                    </div>
                                    <div className="notific_checkbox">
                                      <label for="alert">Negative trend</label>
                                      <input
                                        type="checkbox"
                                        id="alert"
                                        checked={is_alert_notification}
                                        onChange={(e) =>
                                          this.onChange(e)
                                        }
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

export default NotificationAlertsSettings;
