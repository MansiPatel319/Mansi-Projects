import React from "react";
import { Link } from "react-router-dom";

import {
  isValidEmailAddress,
  isValidPasswordCharacter as isValidPassword,
} from "../../../utils/validators";

import HeaderContainer from "../../../containers/Common/Header";
import FooterContainer from "../../../containers/Common/Footer";
import Spinner from "../../Spinner/Spinner";

import "./Login.scss";
import InputComponent from "../../UI/InputComponent";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginFailedMessage: "",
      isLoginButtonDisabled: true,
      formData: {
        email: "",
        password: "",
      },
      formError: {
        email_error: false,
        email_message: "",
        password_error: false,
        password_message: "",
      },
      isEmailSubmit: false,
      isPasswordSubmit: false,
    };
    this.inputEmailRef = React.createRef();
  }
  componentDidMount() {
    localStorage.setItem("const_url","")
    this.inputEmailRef.current.focus();
  }

  validateForm = (data) => {
    let isFormValid = true;
    const formError = { ...this.state.formError };
    if (data.email.trim() === "") {
      formError.email_error = true;
      formError.email_message = "Please Enter Email!";
      isFormValid = false;
    } else if (!isValidEmailAddress(data.email)) {
      formError.email_error = true;
      formError.email_message = "Please Enter Valid Email!";
      isFormValid = false;
    } else {
      formError.email_error = false;
      formError.email_message = "";
    }
    if (data.password.trim() === "") {
      formError.password_error = true;
      formError.password_message = "Password must be at least 8 characters";
      isFormValid = false;
    } else if (!isValidPassword(data.password)) {
      formError.password_error = true;
      formError.password_message = "Password must be at least 8 characters";
      isFormValid = false;
    } else {
      formError.password_error = false;
      formError.password_message = "";
    }
    this.setState({ formError });
    return isFormValid;
  };
  handleOnchangeInput = (e) => {
    const { name, value } = e.target;
    const formError = { ...this.state.formError };
    if (name === "email") {
      if (value.trim() === "") {
        this.setState({ isLoginButtonDisabled: true });
      } 
      // else if (!isValidEmailAddress(value)) {
      //   this.setState({ isLoginButtonDisabled: true });
      // } 
      else {
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
        this.setState({ isLoginButtonDisabled: false, isEmailSubmit: true });
        if (!this.state.isPasswordSubmit) {
          this.setState({ isLoginButtonDisabled: true });
        }
      }
    } else if (name === "password") {
      if (value.trim() === "") {
        this.setState({ isLoginButtonDisabled: true });
      }
      //  else if (!isValidPassword(value)) {
      //   this.setState({ isLoginButtonDisabled: true });
      // } 
      else {
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
        this.setState({ isLoginButtonDisabled: false, isPasswordSubmit: true });
        if (!this.state.isEmailSubmit) {
          this.setState({ isLoginButtonDisabled: true });
        }
      }
    }
    const formData = { ...this.state.formData };
    formData[name] = value;
    this.setState({ formError, formData });
  };
  handleChangedField = (name, value) => {
    const formError = { ...this.state.formError };
    if (name === "email") {
      formError[`${name}_error`] = true;
      if (value.trim() === "") {
        formError[`${name}_message`] = "Please Enter Email";
      } else if (!isValidEmailAddress(value)) {
        formError[`${name}_message`] = "Please Enter Valid Email!";
      } else {
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
      }
    } else if (name === "password") {
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
    const { name, value } = event.target;
    const formData = { ...this.state.formData };
    formData[name] = value;
    this.setState({ formData }, () => {
      this.handleChangedField(name, value);
    });
    // this.setState({ isLoginButtonDisabled: false });
  };

  handleErrorMessage = (event) => {
    const formError = { ...this.state.formError };
    const { name } = event.target;
    if (name === "email") {
      formError[`${name}_error`] = false;
      formError[`${name}_message`] = "";
    }
    if (name === "password") {
      formError[`${name}_error`] = false;
      formError[`${name}_message`] = "";
    } else {
      formError[`password_focus_error`] = false;
    }
    this.setState({ formError });
  };

  submitForm = () => {
    let from_data = JSON.parse(JSON.stringify(this.state.formData))
    from_data.email = from_data.email.toLowerCase();
    localStorage.setItem("email", from_data.email.toLowerCase());
    this.setState({formData: from_data },()=>{
    const { formData } = this.state;
    const { history } = this.props;
    // const isValid = this.validateForm(formData);
    // if (isValid) {
      if(formData.email!==""&&formData.password!==""){
        this.props
        .login(formData)
        .then((res) => {
          if (res.status&& res.code===200) {
            // this.props.addToast(res.message, {
            //   appearance: "success",
            //   autoDismiss: true,
            // });
            localStorage.setItem("token", res.data["token"]);
            localStorage.setItem("educatorId", res.data["id"]);
            if(res.data["is_demo_class"])
            {

              localStorage.setItem("isDemoClass",res.data["is_demo_class"])
            }
            else{
              localStorage.removeItem("isDemoClass")
            }
            if(res.is_first_login){
              history.replace(`/find-school/${res.data.email}`);
            }
            else{
              history.replace("/educator/home");
            }
           
          } else {
            // this.props.addToast(res.message, { appearance: 'error', autoDismiss: true });
            if(res.code === 400)
            {
              if(res.verify===false)
              {

                history.push("/verify-email")
              }
            }
            this.setState({ loginFailedMessage: res.message });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      }
     
    // }
    })
    
  };

  handleKeyUp = (e) => {
    if (parseInt(e.keyCode) === parseInt(13)) {
      this.submitForm();
    }
  };
  render() {
    const { formError } = this.state;
    return (
      <div id="wrapper" className="wrapper">
        {this.props.authenticate.loading ? <Spinner /> : null}
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
                              <h2>
                                <span className="block">
                                  Log in to your
                                  <br />
                                  educator account
                                </span>
                              </h2>
                            </div>

                            <div className="acc-row">
                              <p>
                                New to YouHue?&nbsp;
                                <Link to="/signup" className="link">
                                  <span className="text-decoration">
                                    Sign up for free
                                  </span>
                                </Link>
                              </p>
                            </div>
                          </div>

                          <div className="form-custom-div form-custom-400-div">
                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <div className="form-group">
                                  <InputComponent
                                    inputType="email"
                                    inputPlaceholder="Email address"
                                    inputID="email"
                                    inputName="email"
                                    inputClassName="form-control"
                                    // handleInpBlur={this.handleFieldChange}
                                    handleInpfocus={this.handleErrorMessage}
                                    handleKeyUp={this.handleKeyUp}
                                    handleRef={this.inputEmailRef}
                                    onInputChange={this.handleOnchangeInput}
                                  />
                                  {/* {formError.email_error ? (
                                    <div className="error-box active">
                                      <p
                                        className="error-text"
                                        style={{ textAlign: "left" }}
                                      >
                                        {formError.email_message}
                                      </p>
                                    </div>
                                  ) : null} */}
                                </div>
                              </div>

                              <div className="col-lg-12 col-md-12">
                                <div className="form-group">
                                  <div className="input-group-box">
                                    <InputComponent
                                      inputType="password"
                                      inputPlaceholder="Password"
                                      inputID="password"
                                      inputName="password"
                                      inputClassName={`form-control ${
                                        formError.password_error ? "error" : ""
                                      } `}
                                      inputClassName="form-control"                                       
                                      // handleInpBlur={this.handleFieldChange}
                                      handleInpfocus={this.handleErrorMessage}
                                      handleKeyUp={this.handleKeyUp}
                                      onInputChange={this.handleOnchangeInput}
                                    />
                                    {/* {formError.password_error ? (
                                      <div className="error-box active">
                                        <p
                                          className="error-text"
                                          style={{ textAlign: "left" }}
                                        >
                                          {formError.password_message}
                                        </p>
                                      </div>
                                    ) : null} */}
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-12 col-md-12">
                                <div className="form-group">
                                  <div className="forgot-row">
                                    <Link
                                      to="/reset-password-link"
                                      className="link forgot-link"
                                    >
                                      Forgot Password?
                                    </Link>
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-12 col-md-12">
                                {this.state.loginFailedMessage !== "" ? (
                                  <div className="error-box active">
                                    <p className="error-text">
                                      {this.state.loginFailedMessage}
                                    </p>
                                  </div>
                                ) : null}
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <div className="button-row">
                                  <div className="center-side-button">
                                    <button
                                      className="btn btn-common-primary btn-primary-width240"
                                      id="loginButton"
                                      onClick={this.submitForm}
                                      disabled={
                                        this.state.isLoginButtonDisabled
                                      }
                                    >
                                      Log in
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
              <FooterContainer isLogin={true} />
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default Login;
