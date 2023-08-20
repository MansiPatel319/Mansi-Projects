import React, { Component } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../../Spinner/Spinner";

import { isValidPasswordCharacter as isValidPassword } from "../../../../utils/validators";

import HeaderContainer from "../../../../containers/Common/Header";
import FooterContainer from "../../../../containers/Common/Footer";

class SignupFromInviteAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignUpDisabled: true,
      formData: {
        professor_name: "",
        new_password: "",
      },
      formError: {
        professor_name_error: false,
        professor_name_focus_error: false,
        professor_name_message: "",
        new_password_error: false,
        new_password_focus_error: false,
        new_password_message: "",
      },
    };
    this.inputClassNameRef = React.createRef();
  }
  componentDidMount() {
    localStorage.setItem("const_url","")
    this.inputClassNameRef.current.focus();
    localStorage.setItem("noRedirect", true);
    const { match } = this.props;
    const formData = { ...this.state.formData };
    const uuid = match.params.uuid;
    this.props
      .verifyAdminInvitationLink(uuid)
      .then((res) => {
        if (res.code !== 200) {
          // this.props.addToast(res.message, {
          //   appearance: "error",
          //   autoDismiss: true,
          // });
          //   history.replace("/login");
        } else {
          formData["professor_name"] = res.data.professor_name;
          this.setState({ formData });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  validateForm = (data) => {
    let isFormValid = true;
    const formError = { ...this.state.formError };
    if (data.professor_name.trim() === "") {
      formError.professor_name_error = true;
      formError.professor_name_message = "Please enter your name.";
      isFormValid = false;
    } else {
      formError.professor_name_error = false;
      formError.professor_name_message = "";
    }
    if (data.new_password.trim() === "") {
      formError.new_password_error = true;
      formError.new_password_message = "Password must be at least 8 characters";
      isFormValid = false;
    } else if (!isValidPassword(data.new_password)) {
      formError.new_password_error = true;
      formError.new_password_message = "Password must be at least 8 characters";
      isFormValid = false;
    } else {
      formError.new_password_error = false;
      formError.new_password_message = "";
    }
    this.setState({ formError });
    return isFormValid;
  };

  handleChangedField = (name, value) => {
    this.setState({ isSignUpDisabled: false });
    // const { name, value } = event.target;
    const formError = { ...this.state.formError };
    if (name === "professor_name") {
      formError[`${name}_error`] = true;
      if (value.trim() === "") {
        formError[`${name}_message`] = "Please enter your name.";
      } else {
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
      }
    } else if (name === "new_password") {
      formError[`${name}_error`] = true;
      if (value.trim() === "") {
        formError[`${name}_message`] = "Password must be at least 8 characters";
      } else if (!isValidPassword(value)) {
        formError[`${name}_message`] = "Password must be at least 8 characters";
      } else {
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
      }
    }
    this.setState({ formError });
  };
  handleFieldChange = (event) => {
    this.setState({ isSignUpDisabled: false });
    const { name, value } = event.target;
    const formData = { ...this.state.formData };
    formData[name] = value;
    // this.setState({ formData });
    this.setState({ formData }, () => {
      this.handleChangedField(name, value);
    });
  };

  handleErrorMessage = (event) => {
    const formError = { ...this.state.formError };
    const { name } = event.target;
    formError[`${name}_error`] = false;
    if (name === "professor_name") {
      formError[`${name}_focus_error`] = true;
      formError[`${name}_message`] =
        "Please use the name by which your students know you";
    } else {
      formError[`professor_name_focus_error`] = false;
    }
    if (name === "new_password") {
      formError[`${name}_focus_error`] = true;
      formError[`${name}_message`] = "Password must be at least 8 characters";
    } else {
      formError[`new_password_focus_error`] = false;
    }
    this.setState({ formError });
  };

  submitForm = () => {
    const { formData } = this.state;
    const { history, authenticate, match } = this.props;
    const isValid = this.validateForm(formData);
    const sid = match.params.id;
    if (isValid) {
      const uuid = authenticate.invitedUserData.data["id"];
      this.props
        .signupFromAdminInvite(uuid, sid, formData)
        .then((res) => {
          if (res.status) {
            // this.props.addToast(res.message, {
            //   appearance: "success",
            //   autoDismiss: true,
            // });
            history.replace("/login");
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
  };
  render() {
    const { formError } = this.state;
    const { authenticate } = this.props;
    return (
      <>
        <div id="wrapper" className="wrapper">
          <div className="main-middle-area">
            <section className="general-account-section">
            {this.props.authenticate.loading ? <Spinner /> : null}
              <div className="general-account-div bg-image-common2">
                <HeaderContainer />

                <div className="main-page-root">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <div className="general-account-root">
                          <div className="full-account-div full-account-border-div">
                            <div className="general-title mb-0">
                              <div className="center-text-block">
                                <h2>
                                  <span className="block">
                                    Create your school <br /> admin account
                                  </span>
                                </h2>
                              </div>
                            </div>

                            <div className="form-custom-div form-custom-400-div">
                              <div className="row">
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className={`form-control ${
                                        formError.professor_name_error
                                          ? "error"
                                          : ""
                                      }`}
                                      placeholder="Name"
                                      id="your-name-acc"
                                      name="professor_name"
                                      // onChange={this.handleFieldChange}
                                      onBlur={this.handleFieldChange}
                                      onFocus={this.handleErrorMessage}
                                      defaultValue={
                                        authenticate.invitedUserData &&
                                        authenticate.invitedUserData.data
                                          ? authenticate.invitedUserData.data[
                                              "professor_name"
                                            ]
                                          : ""
                                      }
                                    />
                                    {formError.professor_name_error ? (
                                      <div className="info-text error-text">
                                        <p className="error-p">
                                          {formError.professor_name_message}
                                        </p>
                                      </div>
                                    ) : (
                                      <div
                                        className={`info-text ${
                                          !formError.professor_name_focus_error &&
                                          "d-none"
                                        }`}>
                                        <p className="info-p">
                                          Please use the name by which your
                                          students know you.
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <input
                                      type="email"
                                      className="form-control disabled-02"
                                      id="email-acc"
                                      placeholder="Email"
                                      defaultValue={
                                        authenticate.invitedUserData &&
                                        authenticate.invitedUserData.data
                                          ? authenticate.invitedUserData.data[
                                              "email"
                                            ]
                                          : ""
                                      }
                                    />
                                    <div className="info-text d-none">
                                      <p className="info-p">
                                        Please use your school email
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <input
                                      type="password"
                                      className={`form-control ${
                                        formError.new_password_error
                                          ? "error"
                                          : ""
                                      }`}
                                      id="password-acc"
                                      placeholder="Password"
                                      name="new_password"
                                      // onChange={this.handleFieldChange}
                                      onBlur={this.handleFieldChange}
                                      onFocus={this.handleErrorMessage}
                                      ref={this.inputClassNameRef}
                                    />
                                    {formError.new_password_error ? (
                                      <div className="info-text error-text">
                                        <p className="error-p">
                                          {formError.new_password_message}
                                        </p>
                                      </div>
                                    ) : (
                                      <div
                                        className={`info-text ${
                                          !formError.new_password_focus_error &&
                                          "d-none"
                                        }`}>
                                        <p className="info-p">
                                          {formError.new_password_message}
                                        </p>
                                      </div>
                                    )}
                                    <div className="info-text d-none">
                                      <p className="info-p">
                                        Password must be at least 8 characters
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-lg-12 col-md-12">
                                  <div className="link-bottom-text-row">
                                    <p>
                                      By signing up, you agree to YouHue’s{" "}
                                      <a
                                        href="https://youhue.com/terms/"
                                        target="_blank"
                                        className="link">
                                        Terms of Service
                                      </a>
                                      &nbsp;and&nbsp;{" "}
                                      <a
                                        href="https://youhue.com/privacy/"
                                        target="_blank"
                                        className="link">
                                        Privacy Policy
                                      </a>
                                    </p>
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
                                        disabled={this.state.isSignUpDisabled}>
                                        Sign up
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

                <FooterContainer />
              </div>
            </section>
          </div>
        </div>
      </>
    );
  }
}

export default SignupFromInviteAdmin;
