import React from "react";
import { Link } from "react-router-dom";
import HeaderContainer from "../../../../containers/Common/Header";
import FooterContainer from "../../../../containers/Common/Footer";
import MyAccountLeftMenu from "../MyAccountLeftMenu";

import "./ContactUs.scss";
import "../MyAccount.scss";
import "../../../../styles/style.css";
import NotificationBannerComponent from "../../../Common/NotificationBannerComponent/NotificationBannerComponent";

class ContactUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sendMessageBtn: true,
      formData: {
        message: "",
      },
      formError: {
        message_error: false,
        message_message: "",
      },
    };
  }

  validateForm = (data) => {
    let isFormValid = true;
    const formError = { ...this.state.formError };
    if (data.message.trim() === "") {
      formError.message_error = true;
      formError.message_message = "Please enter some text.";
      isFormValid = false;
    } else {
      formError.message_error = false;
      formError.message_message = "";
    }
    this.setState({ formError });
    return isFormValid;
  };

  handleChangedField = (name, value) => {
    const formError = { ...this.state.formError };
    if (name === "message") {
      formError[`${name}_error`] = true;
      if (value.trim() === "") {
        formError[`${name}_message`] = "Please enter some text.";
        this.setState({ sendMessageBtn: true });
      } else {
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
      }
    }
    this.setState({ formError });
  };

  handleFieldChange = (event) => {
    this.setState({ sendMessageBtn: false });
    const { name, value } = event.target;
    const formData = { ...this.state.formData };
    formData[name] = value;
    this.setState({ formData }, () => {
      this.handleChangedField(name, value);
    });
  };

  submitForm = () => {
    const { formData } = this.state;
    const { history } = this.props;

    const isValid = this.validateForm(formData);
    if (isValid) {
      this.props
        .contactUs(formData)
        .then((res) => {
          if (res.status) {
            history.replace("/educator");
            this.setState({
              formData: {
                message: "",
              },
            });
          } else {
            this.setState({
              formData: {
                message: "",
              },
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  render() {
    const { formError } = this.state;
    return (
      <div id="wrapper" className="wrapper">
        <div className="main-middle-area dashboard-middle-area">
          <section className="general-dashboard-section bg-image-common">
            <div className="general-dashboard-div background-color-main">
              <HeaderContainer isLoggedIn={true} />
              <div className="body-main-new my-account-main-div">
                <div className="container-main-root">
                  <div className="container-inner-root">
                    {!this.props.educator.educatorData.verifiy_educator &&
                    this.props.educator.educatorData.role === "Educator" &&
                    localStorage.getItem("isShowNotificationBanner")&&
                    this.props.educator.isShowNotification ? (
                      <NotificationBannerComponent
                        date={this.props.educator.educatorData.end_date}
                      />
                    ) : null}
                    <div className="my-account-text-div">
                      <div className="my-account-text-row">
                        <div className="text-div">
                          <h4>My Account</h4>
                        </div>
                        <div className="cancel-div">
                          <div className="cancel-icon-div">
                            <Link
                              to="/educator/home"
                              className="btn-cancel-icon"
                            >
                              <span className="custom-icon cancel-round-icon"></span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="main-my-tab-area-div">
                      <div className="main-my-tab-area-row">
                        <MyAccountLeftMenu />

                        <div className="main-my-tab-right-div">
                          <div className="main-my-tab-right-inner">
                            <div className="contact-us-card-root">
                              <div className="form-custom-div form-custom-770-div">
                                <div className="row">
                                  <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                      <label for="">
                                        For any product related inquiries,
                                        please send us a message and we will get
                                        back to you.
                                      </label>
                                      <div className="textarea-div">
                                        <textarea
                                          className="form-control"
                                          placeholder="Type your message"
                                          onChange={this.handleFieldChange}
                                          cols="30"
                                          name="message"
                                          rows="10"
                                          value={this.state.formData.message}
                                        />
                                        {/* {formError.message_error ? (
                                          <div className="info-text error-text">
                                            <p className="error-p">
                                              {formError.message_message}
                                            </p>
                                          </div>
                                        ) : null} */}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-lg-12 col-md-12">
                                    <div className="button-row button-row-add-school">
                                      <div className="center-side-button">
                                        <button
                                          className="btn btn-common-primary btn-primary-width240"
                                          disabled={this.state.sendMessageBtn}
                                          onClick={this.submitForm}
                                        >
                                          Send message to YouHue
                                        </button>
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
                </div>
              </div>
              <FooterContainer isLoggedIn={true} />
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default ContactUs;
