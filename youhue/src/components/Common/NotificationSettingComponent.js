import React from "react";
import NotificationLeftBar from "./NotificationLeftBar";
import HeaderContainer from "../../containers/Common/Header";
import FooterContainer from "../../containers/Common/Footer";
import Spinner from "../Spinner/Spinner";
import NotificationCommonComponent from "./NotificationCommonComponent";

class NotificationSettingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isbannerShoe: true,
      classes: "",
      manageFlag: false,
      value: [],
    };
  }
  handleclosebanner = () => {
    this.setState({ isbannerShoe: false });
    localStorage.setItem("isShowNotificationBanner", false);
  };
  componentDidMount() {
    this.getEducatorClassNotificationSetting();
  }

  getEducatorClassNotificationSetting() {
    let values = [];
    this.props
      .notificationClassListing()
      .then((res) => {
        if (res.status && res.code === 200) {
          this.setState({ classes: res.data });
        }
      })
      .then(() => {
        this.state.classes.map((class_data) => {
          values.push(class_data.is_notification);
        });
        this.setState({ value: values });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onChange(e, i, class_id) {
    let value = this.state.value.slice();
    value[i] = e.target.checked;
    this.setState({ value });
    let formData = new FormData();
    formData.append("grp_id", class_id);
    formData.append("is_notification", e.target.checked);
    this.props.updateClassNotificationFlag(formData);
  }

  render() {
    const { classes } = this.state;
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
                                    You will receive all mood log notifications
                                    from all the students.
                                  </p>

                                  {this.state.classes.length === 0
                                    ? "You don't have any classes"
                                    : classes.map((class_name, i) => {
                                        return (
                                          <div className="notify_grade">
                                            <div
                                              className="notific_checkbox"
                                              key={class_name.id}
                                            >
                                              <label for={class_name.id}>
                                                {class_name.name}
                                              </label>
                                              <input
                                                type="checkbox"
                                                id={class_name.id}
                                                // onClick={this.setState({manageFlag:!this.state.manageFlag})}
                                                // checked={class_name.is_notification ? "checked" : ""}
                                                checked={this.state.value[i]}
                                                onChange={(e) =>
                                                  this.onChange(
                                                    e,
                                                    i,
                                                    class_name.id
                                                  )
                                                }
                                              />
                                            </div>
                                          </div>
                                        );
                                      })}
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

        {/* <div className="message-text-dark-div" id="message-text-dark01">
          <div className="message-text-dark-row">
            <div className="text-div">
              <p>
                You can continue using YouHue in your className until 28 March
                2021 after which your account will become inactive unless you
                are verified.
              </p>
            </div>
            <div className="cancel-div">
              <div className="cancel-icon-div">
                <button className="btn-cancel-icon" id="cancel-message-row">
                  {" "}
                  <span className="custom-icon cancel-new-icon"></span>{" "}
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </>
    );
  }
}

export default NotificationSettingComponent;
