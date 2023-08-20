import React from "react";
import { Link } from "react-router-dom";
import HeaderContainer from "../../../../containers/Common/Header";
import FooterContainer from "../../../../containers/Common/Footer";
import MyAccountLeftMenu from "../MyAccountLeftMenu";
import { isValidPassword } from "../../../../utils/validators";

import "./ChangePassword.scss";
import "../MyAccount.scss";
import NotificationBannerComponent from "../../../Common/NotificationBannerComponent/NotificationBannerComponent";

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPasswordReset: false,
      formData: {
        current_password: "",
        new_password: "",
      
        confirm_password: "",
      },
      formError: {
        current_password_error: false,
        current_password_message: "",
        new_password_error: false,
        new_password_message: "",
        confirm_password_error: false,
        confirm_password_message: "",
      },
      isPasswordResetDisabled: true,
    };
  }

  validateForm = (data) => {
    let isFormValid = true;
    const formError = { ...this.state.formError };
    if (data.current_password.trim() === "") {
      formError.current_password_error = true;
      formError.current_password_message =
        "Please enter your current password.";
      // isFormValid = false;
    } 
    else if (!isValidPassword(data.current_password)) {
      formError.current_password_error = true;
      formError.current_password_message = "The password you entered is incorrect";
      isFormValid = false;
    }
    else {
      formError.current_password_error = false;
      formError.current_password_message = "";
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
    if (data.confirm_password.trim() === "") {
      formError.confirm_password_error = true;
      formError.confirm_password_message = "The passwords you entered don’t match";
      isFormValid = false;
    } else if (data.new_password !== data.confirm_password) {
      formError.confirm_password_error = true;
      formError.confirm_password_message =
        "The passwords you entered don’t match";
      isFormValid = false;
    } else {
      formError.confirm_password_error = false;
      formError.confirm_password_message = "";
    }
    this.setState({ formError });
    return isFormValid;
  };
  checkFiledsArenotBlank = (filed1, filed2, filed3) => {
    const { formData } = this.state;
    let flag = false;
    if (formData[filed1] !== "" && formData[filed2] !== "" && filed3 !== "") {
      flag = true;
    }
    return flag;
  };
  handleChangedField = (name, value) => {
    const formError = { ...this.state.formError };
    const formData = { ...this.state.formData };
    if (name === "current_password") {
      if (value.trim() === "") {
        
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
       
        // isFormValid = false;
      } 
      // else if (!isValidPassword(value)) {
      //   formError[`${name}_error`] = true;
      //   formError[`${name}_message`] = "please enter valid current password";

      // }
      else {
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
      }
      const testForField = this.checkFiledsArenotBlank(
        "new_password",
        "confirm_password",
        value
      );
      
      if (testForField) {
        this.setState({ isPasswordResetDisabled: false });
      } else {
        this.setState({ isPasswordResetDisabled: true });
      }
      formError[`${name}_error`] = false;
      formError[`${name}_message`] = "";
    } else if (name === "new_password") {
      const testForField = this.checkFiledsArenotBlank(
        "current_password",
        "confirm_password",
        value
      );
      if (testForField) {
        this.setState({ isPasswordResetDisabled: false });
      } else {
        this.setState({ isPasswordResetDisabled: true });
      }
      if (value !== "") {
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
      } else {
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
      }
    } else if (name === "confirm_password") {
      const testForField = this.checkFiledsArenotBlank(
        "current_password",
        "new_password",
        value
      );
      if (testForField) {
        this.setState({ isPasswordResetDisabled: false });
      } else {
        this.setState({ isPasswordResetDisabled: true });
      }
      if(value.trim() === "")
      {
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
      }
      else{
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
      }
      // else if(value!==formData["new_password"])
      // {
      //   formError[`${name}_error`] = true;
      //   formError[`${name}_message`] = "The passwords you entered don’t match.";
      // }
      // else{

      //   formError[`${name}_error`] = false;
      //   formError[`${name}_message`] = "";
      // }
    }
    this.setState({ formError });
  };

  handleFieldChange = (event) => {
    const { name, value } = event.target;
    const formData = { ...this.state.formData };
    formData[name] = value;
    this.setState({ formData }, () => {
      this.handleChangedField(name, value);
    });
  };

  submitForm = () => {
    const { formData, formError } = this.state;
    const { history } = this.props;

    const isValid = this.validateForm(formData);
    if (isValid) {
      this.props
        .changePassword(formData)
        .then((res) => {
          this.setState({btncolor:{backgroundColor:"#652d90",color:"white"}})
          if (res.status) {
            // this.props.addToast(res.message, {
            //   appearance: "success",
            //   autoDismiss: true,
            // });
            history.replace("/educator");
          } else {
            this.setState({
              formError: {
                current_password_error: true,
                current_password_message: res.message,
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
                            <div className="change-password-card-root">
                              <div className="form-custom-div form-custom-400-div">
                                <div className="row">
                                  <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                      <input
                                        type="password"
                                        className={`form-control ${
                                          formError.current_password_error
                                            ? "error"
                                            : ""
                                        }`}
                                        id="current-password-rp"
                                        name="current_password"
                                         onChange={this.handleFieldChange}
                                        placeholder="Current Password"
                                      />
                                      {formError.current_password_error ? (
                                        <div className="info-text error-text">
                                          <p className="error-p">
                                            {formError.current_password_message}
                                          </p>
                                        </div>
                                      ) : null}
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
                                        id="new-password-rp"
                                        name="new_password"
                                        onChange={this.handleFieldChange}
                                        placeholder="New Password"
                                      />
                                      {formError.new_password_error ? (
                                        <div className="info-text error-text">
                                          <p className="error-p">
                                            {formError.new_password_message}
                                          </p>
                                        </div>
                                      ) : null}
                                    </div>
                                  </div>

                                  <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                      <input
                                        type="password"
                                        className={`form-control ${
                                          formError.confirm_password_error
                                            ? "error"
                                            : ""
                                        }`}
                                        id="confirm-password-rp"
                                        name="confirm_password"
                                        //  onBlur={this.handleFieldChange}
                                         onChange={this.handleFieldChange}
                                        placeholder="Confirm Password"
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
                                    <div className="button-row button-row-add-school">
                                      <div className="center-side-button">
                                        <button
                                          className="btn btn-common-primary btn-primary-width240"
                                          onClick={this.submitForm}
                                          disabled={
                                            this.state.isPasswordResetDisabled
                                          }
                                        >
                                          Save changes
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

export default ChangePassword;
