import React from "react";

import { isValidPassword } from "../../../utils/validators";

import HeaderContainer from "../../../containers/Common/Header";
import FooterContainer from "../../../containers/Common/Footer";

import "./ResetPassword.scss";
import InputComponent from "../../UI/InputComponent";

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPasswordReset: false,
      isPasswordResetDisabled: true,
      formData: {
        password: "",
        confirm_password: "",
      },
      formError: {
        password_error: false,
        password_focus_error: false,
        password_message: "",
        confirm_password_error: false,
        confirm_password_message: "",
      },
    };
  }

  componentDidMount() {
    localStorage.setItem("noRedirect", true);
    localStorage.setItem("const_url","")
    this.getUser();
  }

  getUser = () => {
    const { match, history } = this.props;
    const uuid = match.params.uuid;
    this.props
      .verifyResetPasswordLink(uuid)
      .then((res) => {
        if (res.code !== 200) {
          // this.props.addToast(res.message, {
          //   appearance: "error",
          //   autoDismiss: true,
          // });
          history.replace("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  validateForm = (data) => {
    let isFormValid = true;
    const formError = { ...this.state.formError };
    if (data.password.trim() === "") {
      formError.password_error = true;
      formError.password_message = "Please enter password!";
      isFormValid = false;
    } else if (!isValidPassword(data.password)) {
      formError.password_error = true;
      formError.password_message = "Password must be at least 8 characters";
      isFormValid = false;
    } else {
      formError.password_error = false;
      formError.password_message = "";
    }
    if (data.confirm_password.trim() === "") {
      formError.confirm_password_error = true;
      formError.confirm_password_message = "Please enter confirm password!";
      isFormValid = false;
    } else if (data.password !== data.confirm_password) {
      formError.confirm_password_error = true;
      formError.confirm_password_message =
        "The passwords you entered don’t match.";
      isFormValid = false;
    } else {
      formError.confirm_password_error = false;
      formError.confirm_password_message = "";
    }
    this.setState({ formError });
    return isFormValid;
  };

  handleChangedField = (name, value) => {
    const formError = { ...this.state.formError };
   
    if (name === "password") {
      formError[`${name}_error`] = true;
      if (value.trim() === "") {
        formError[`${name}_error`] = false;
        // formError[`${name}_message`] = "Please enter Password!";
      } else if (!isValidPassword(value)) {
        formError[`${name}_message`] = "Password must be at least 8 character";
      } else {
      
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
      }
    } else if (name === "confirm_password") {
      formError[`${name}_error`] = true;
      if (value.trim() === "") {
        formError[`${name}_error`] = false;
        // formError[`${name}_message`] = "Please enter confirm password!";
      } else {
      
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
      }
    }
    this.setState({ formError });
  };

  handleFieldChange = (event) => {
    // this.setState({ isPasswordResetDisabled: false });
    const { name, value } = event.target;
    const formData = { ...this.state.formData };
    formData[name] = value;
    this.setState({ formData }, () => {
      this.handleChangedField(name, value);
    });
  };
  checkFiledsArenotBlank = (filed1,filed2) =>{
    const {formData} = this.state
    let flag = false
    if(formData[filed1]!=="" && filed2!=="" )
    {
      flag= true
    }
    return flag
  }
  handleErrorMessage = (event) => {
    const formError = { ...this.state.formError };
    const { name,value } = event.target;
    formError[`${name}_error`] = false;
    formError[`${name}_focus_error`] = false;
    if (name === "password") {
      formError[`password_focus_error`] = true;
      formError[`password_message`] = "Password must be at least 8 character ";
      const testForField = this.checkFiledsArenotBlank(
        "confirm_password",
        value
      );
      if (testForField) {
        this.setState({ isPasswordResetDisabled: false });
      } else {
        this.setState({ isPasswordResetDisabled: true });
      }
    } else if (name === "confirm_password") {
      const testForField = this.checkFiledsArenotBlank("password", value);
      if (testForField) {
        this.setState({ isPasswordResetDisabled: false });
      } else {
        this.setState({ isPasswordResetDisabled: true });
      }
    } else {
      formError[`password_focus_error`] = false;
    }
    this.setState({ formError });
  }

  submitForm = () => {
    const { formData } = this.state;
    const { authenticate, history } = this.props;
    const uuid = authenticate.resetPasswordData.data["id"];
    const isValid = this.validateForm(formData);
    if (isValid) {
      this.props
        .resetPassword(uuid, formData)
        .then((res) => {
          if (res.status) {
            // this.props.addToast(res.message, {
            //   appearance: "success",
            //   autoDismiss: true,
            // });
            this.setState({ isPasswordReset: true });
            history.push("/login");
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
      <div id="wrapper" className="wrapper">
        <div className="main-middle-area">
          <section className="general-account-section">
            <div className="general-account-div bg-image-common2">
              <HeaderContainer />
              <div className="main-page-root">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <div className="general-account-root">
                        <div className="full-account-div full-account-border-div">
                          <div className="general-title">
                            <div className="center-text-block">
                              <h2>Reset Password</h2>
                            </div>

                            <div className="acc-row">
                              {authenticate.resetPasswordData.data &&
                              authenticate.resetPasswordData.data["id"] ? (
                                <p>
                                  <span className="span-block">
                                    Enter a new password for&nbsp;
                                  </span>
                                  <span className="span-block">
                                    {authenticate.resetPasswordData.data &&
                                    authenticate.resetPasswordData.data["id"]
                                      ? authenticate.resetPasswordData.data[
                                          "email"
                                        ]
                                        ? authenticate.resetPasswordData.data[
                                            "email"
                                          ]
                                        : authenticate.resetPasswordData.data[
                                            "id"
                                          ]
                                      : ""}
                                  </span>
                                </p>
                              ) : (
                                <p>
                                  <span className="span-block">
                                    You can not reset password
                                  </span>
                                  <span className="span-block">
                                    {authenticate.resetPasswordData["message"]}
                                  </span>
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="form-custom-div form-custom-400-div">
                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <div className="form-group">
                                  <InputComponent
                                    inputType="password"
                                    inputClassName={`form-control ${
                                      formError.password_error ? "error" : ""
                                    }`}
                                    inputID="new-password-rp"
                                    inputName="password"
                                    handleInpBlur={this.handleFieldChange}
                                    onInputChange={this.handleErrorMessage}
                                    inputPlaceholder="New password"
                                  />
                                
                                  {formError.password_error ? (
                                    <div className="info-text error-text">
                                      <p className="error-p">
                                        {formError.password_message}
                                      </p>
                                    </div>
                                  ) :  (
                                    <div
                                      className={`info-text ${
                                        !formError.password_focus_error && "d-none"
                                      }`}
                                    >
                                      <p className="info-p">
                                        {formError.password_message}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="col-lg-12 col-md-12">
                                <div className="form-group">
                                  <InputComponent
                                    inputType="password"
                                    inputClassName={`form-control ${
                                      formError.confirm_password_error
                                        ? "error"
                                        : ""
                                    }`}
                                    inputID="confirm-password-rp"
                                    inputName="confirm_password"
                                    handleInpBlur={this.handleFieldChange}
                                    inputPlaceholder="Confirm password"
                                    onInputChange={this.handleErrorMessage}
                                  />
                                  
                                  {formError.confirm_password_error ? (
                                    <div className="info-text error-text">
                                      <p className="error-p">
                                        {formError.confirm_password_message}
                                      </p>
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <div className="button-row">
                                  <div className="center-side-button">
                                    <button
                                      className={`btn btn-common-primary btn-primary-width240 ${
                                        this.state.isPasswordResetDisabled
                                          ? "disabled"
                                          : ""
                                      }`}
                                      disabled={
                                        this.state.isPasswordResetDisabled
                                      }
                                      onClick={this.submitForm}
                                    >
                                      Reset password
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
    );
  }
}

export default ResetPassword;
