import React from "react";
import { Link } from "react-router-dom";

import { isValidEmailAddress } from "../../../../utils/validators";

import HeaderContainer from "../../../../containers/Common/Header";
import FooterContainer from "../../../../containers/Common/Footer";
import Spinner from "../../../Spinner/Spinner";

import "./ResetPasswordLink.scss";
import InputComponent from "../../../UI/InputComponent";

class ResetPasswordLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLinkSent: false,
      isSendLinkButtonDisabled: true,
      formData: {
        email: "",
      },
      formError: {
        email_error: false,
        email_message: "",
      },
    };
  }

  validateForm = (data) => {
    let isFormValid = true;
    const formError = { ...this.state.formError };
    if (data.email.trim() === "") {
      formError.email_error = true;
      formError.email_message = "Please enter email!";
      isFormValid = false;
    } else if (!isValidEmailAddress(data.email)) {
      formError.email_error = true;
      formError.email_message = "The email you entered is invalid.";
      isFormValid = false;
    } else {
      formError.email_error = false;
      formError.email_message = "";
    }
    this.setState({ formError });
    return isFormValid;
  };

  handleChangedField = (name, value) => {
    const formError = { ...this.state.formError };
    if (name === "email") {
      formError[`${name}_error`] = true;
      if (value.trim() === "") {
        this.setState({ isSendLinkButtonDisabled: true });
        formError[`${name}_message`] = "Please enter your email";
      } 
      // else if (!isValidEmailAddress(value)) {
      //   formError[`${name}_message`] = "The email you entered is invalid.";
      // } 
      
      else {
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
      }
    }
    this.setState({ formError });
  };

  handleFieldChange = (event) => {
    this.setState({ isSendLinkButtonDisabled: false });
    const { name, value } = event.target;
    const formData = { ...this.state.formData };
    formData[name] = value;
    this.setState({ formData }, () => {
      this.handleChangedField(name, value);
    });
  };

  submitForm = () => {
    const { formData } = this.state;
    // const isValid = this.validateForm(formData);
    // if (isValid) {
      this.props
        .sendResetPasswordLink(formData)
        .then((res) => {
          this.setState({ isLinkSent: true });
          // if (res.status) {
          //   this.setState({ isLinkSent: true });
          // } else {
          //   this.props.addToast(res.message, {
          //     appearance: "error",
          //     autoDismiss: true,
          //   });
          // }
        })
        .catch((err) => {
          console.log(err);
        });
    // }
  };

  render() {
    const { formError } = this.state;
    return (
      <div id="wrapper" className="wrapper">
        <div className="main-middle-area">
          {this.props.authenticate.loading ? <Spinner /> : null}
          <section className="general-account-section">
            <div className="general-account-div bg-image-common2">
              <HeaderContainer />
              {this.state.isLinkSent ? (
                <div className="main-page-root">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <div className="general-account-root reset-password-link-div">
                          <div className="full-account-div full-account-border-div">
                            <div className="general-title">
                              <div className="center-text-block">
                                <h2>Thank you</h2>
                              </div>

                              <div className="text-reset-group">
                                <div className="text-reset-group-box-inner">
                                  <p>
                                    If there is an account associated with this
                                    email you will receive a link to reset your
                                    password.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="form-custom-div form-custom-400-div">
                              <div className="row">
                                <div className="col-lg-12 col-md-12">
                                  <div className="button-row pt-0">
                                    <div className="center-side-button">
                                      <Link
                                        to="/login"
                                        className="btn btn-common-primary btn-common-primary-link btn-primary-width240"
                                      >
                                        Back to login
                                      </Link>
                                    </div>
                                  </div>

                                  <div className="tc-content-general-box">
                                    <p>
                                      Didn’t receive an email?&nbsp;
                                      <Link to="#" className="link-a">
                                        Contact us
                                      </Link>
                                      &nbsp;for help!
                                    </p>
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
              ) : (
                <section className="general-account-section">
                  <div className="general-account-div bg-image-common2">
                    <div className="main-page-root">
                      <div className="container">
                        <div className="row">
                          <div className="col-lg-12 col-md-12">
                            <div className="general-account-root reset-password-link-div">
                              <div className="full-account-div full-account-border-div">
                                <div className="general-title">
                                  <div className="center-text-block">
                                    <h2>Reset Password</h2>
                                  </div>

                                  <div className="col-lg-12 col-md-12">
                                    <div className="text-reset-group">
                                      <div className="text-reset-group-box-inner">
                                        <p>
                                          Please verify your email for us. Once
                                          you do, we'll send instructions to
                                          reset your password.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="form-custom-div form-custom-400-div">
                                  <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                      <div className="form-group">
                                        <InputComponent
                                          inputType="email"
                                          inputPlaceholder="Email"
                                          // inputClassName={`form-control ${
                                          //   formError.email_error ? "error" : ""
                                          // } `}
                                          inputClassName="form-control"
                                          inputID="email"
                                          inputName="email"
                                          onInputChange={this.handleFieldChange}
                                        />
                                        {/* {formError.email_error ? (
                                          <div className="info-text error-text">
                                            <p className="error-p">
                                              {formError.email_message}
                                            </p>
                                          </div>
                                        ) : null} */}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                      <div className="button-row">
                                        <div className="center-side-button">
                                          <button
                                            className="btn btn-common-primary btn-primary-width240"
                                            onClick={this.submitForm}
                                            disabled={
                                              this.state
                                                .isSendLinkButtonDisabled
                                            }
                                          >
                                            Send reset link
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
                </section>
              )}
              <FooterContainer />
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default ResetPasswordLink;
