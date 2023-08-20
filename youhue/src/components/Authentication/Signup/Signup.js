import React from "react";
import { Link } from "react-router-dom";

import {
  isValidPasswordCharacter as isValidPassword,
  isValidEmailAddress,
} from "../../../utils/validators";

import HeaderContainer from "../../../containers/Common/Header";
import FooterContainer from "../../../containers/Common/Footer";
import Spinner from "../../Spinner/Spinner";
import InputComponent from "../../UI/InputComponent";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPasswordReset: false,
      isSignUpDisabled: true,
      formData: {
        professor_name: "",
        email: "",
        confirm_email: "",
        password: "",
        is_mobile: false
        
      },
      formError: {
        professor_name_error: false,
        professor_name_focus_error: false,
        professor_name_message: "",
        email_error: false,
        email_focus_error: false,
        email_message: "",
        confirm_email_error: false,
        confirm_email_focus_error: false,
        confirm_email_message: "",
        password_error: false,
        password_focus_error: false,
        password_message: "",
      },
    };
    // this.inputClassNameRef = React.createRef();
  }
  componentDidMount() {
    localStorage.setItem("const_url","")
    // this.inputClassNameRef.current.focus();
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
    if (data.email.trim() === "") {
      formError.email_error = true;
      formError.email_message = "Please enter your email.";
      isFormValid = false;
    } else if (!isValidEmailAddress(data.email)) {
      formError.email_error = true;
      formError.email_message = "The email you entered is invalid.";
      isFormValid = false;
    } else {
      formError.email_error = false;
      formError.email_message = "";
    }
    if (data.confirm_email.trim() === "") {
      formError.confirm_email_error = true;
      formError.confirm_email_message = "Please confirm your email.";
      isFormValid = false;
    } else if (data.email !== data.confirm_email) {
      formError.confirm_email_error = true;
      formError.confirm_email_message = "The emails you entered don’t match.";
      isFormValid = false;
    } else {
      formError.confirm_email_error = false;
      formError.confirm_email_message = "";
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

  handleChangedField = (name, value) => {
    const formError = { ...this.state.formError };
    if (name === "professor_name") {
      if (value.trim() === "") {
        formError[`${name}_error`] = false;
        // formError[`${name}_error`] = true;
        // formError[`${name}_message`] = "Please enter your name.";
      } else {
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
      }
    } else if (name === "email") {
      formError[`${name}_error`] = true;
      if (value.trim() === "") {
        formError[`${name}_error`] = false;
        // formError[`${name}_message`] = "Please enter your email.";
      } else if (!isValidEmailAddress(value)) {
        formError[`${name}_message`] = "The email you entered is invalid.";
      }
     
       else {
       
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
      }
    } else if (name === "confirm_email") {
      formError[`${name}_error`] = true;
      if (value.trim() === "") {
        formError[`${name}_error`] = false;
        // formError[`${name}_message`] = "Please confirm your email.";
      } else if (this.state.formData.email !== value) {
        formError[`${name}_message`] = "The emails you entered don’t match.";
      } else {
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
      }
    } else if (name === "password") {
     
      formError[`${name}_error`] = true;
      if (value.trim() === "") {
        formError[`${name}_error`] = false;
        // formError[`${name}_message`] = "Password must be at least 8 characters";
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
    const formError = { ...this.state.formError };
    formError[`${name}_focus_error`] =false;
    formData[name] = value;
    this.setState({ formData , formError}, () => {
      this.handleChangedField(name, value);
    });
  };
  checkFiledsArenotBlank = (filed1,filed2,filed3,filed4) =>{
    const {formData} = this.state
    let flag = false
    if(formData[filed1]!=="" && formData[filed2]!=="" && formData[filed3]!=="" && filed4!=="" )
    {
      flag= true
    }
    return flag
  }

  handleErrorMessage = (event) => {
    const formError = { ...this.state.formError };
    const { name,value } = event.target;
    formError[`${name}_error`] = false;
    formError[`${name}_focus_error`] =false;
    if (name === "professor_name") {
      const testForField = this.checkFiledsArenotBlank("email","confirm_email","password", value)
      if (testForField) {
        this.setState({ isSignUpDisabled: false });
      }
      formError[`${name}_focus_error`] = true;
      formError[`${name}_message`] =
        "Please use the name by which your students know you. ";
    } else {
      formError[`professor_name_focus_error`] = false;
    }
    if (name === "email") {
      formError[`${name}_focus_error`] = true;
      formError[`${name}_message`] = "Please use your school email";
      const testForField = this.checkFiledsArenotBlank("professor_name","confirm_email","password", value)
      if (testForField) {
        this.setState({ isSignUpDisabled: false });
      }
      if (this.state.formData.confirm_email === value) {
        formError[`confirm_email_error`] = false;

        formError[`confirm_email_message`] = "";
      }
    } else {
      formError[`email_focus_error`] = false;
    }
    if (name === "confirm_email") {
      formError[`${name}_focus_error`] = true;
      formError[`${name}_message`] = "";
      const testForField = this.checkFiledsArenotBlank("professor_name","email","password", value)
      if (testForField) {
        this.setState({ isSignUpDisabled: false });
      }
    } else {
      formError[`confirm_email_focus_error`] = false;
    }
    if (name === "password") {
      formError[`${name}_focus_error`] = true;
      formError[`${name}_message`] = "Password must be at least 8 characters";
      const testForField = this.checkFiledsArenotBlank("professor_name","email","confirm_email", value)
      if (testForField) {
        this.setState({ isSignUpDisabled: false });
      }
    } else {
      formError[`password_focus_error`] = false;
    }
    this.setState({ formError });
  };

  submitForm = () => {
    let from_data = JSON.parse(JSON.stringify(this.state.formData))
    from_data.email = from_data.email.toLowerCase();
    from_data.confirm_email = from_data.confirm_email.toLowerCase();
    this.setState({formData: from_data },()=>{
      const { formData } = this.state;
      // const { authenticate } = this.props;
      const { history } = this.props;
  
      const isValid = this.validateForm(formData);
      if (isValid) {
        this.props
          .signup(formData)
          .then((res) => {
            if (res.status) {
              // this.props.addToast(res.message, {
              //   appearance: "success",
              //   autoDismiss: true,
              // });
              localStorage.setItem("email", formData.email);
              history.push(`/verify-email`);
            } else {
              // this.props.addToast(res.message, {
              //   appearance: "error",
              //   autoDismiss: true,
              // });
              if(res.code===400 && res.message==="The email you entered is already in use.")
              {
                const formError = { ...this.state.formError };
                formError[`email_error`] = true;
  
                formError[`email_message`] = res.message;
                this.setState({formError})
              }
              if(res.code===400 && res.message==="You have a pending request to join YouHue. Please check your mail or contact us at help@youhue.com")
              {
                const formError = { ...this.state.formError };
                formError[`email_error`] = true;
  
                formError[`email_message`] = res.message;
                this.setState({formError})
              }
  
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
  };
  render() {
    const { formError } = this.state;
    return (
      <div id="wrapper" className="wrapper">
        <div className="main-middle-area">
          <div className="general-account-section">
            {this.props.authenticate.loading ? <Spinner /> : null}
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
                                  Create your <br />
                                  educator account
                                </span>
                              </h2>
                            </div>

                            <div className="acc-row">
                              <p>
                                Already have an account?&nbsp;
                                <Link to="/login" className="link">
                                  <span className="text-decoration">
                                    Log in here
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
                                    inputType="text"
                                    inputClassName={`form-control ${
                                      formError.professor_name_error
                                        ? "error"
                                        : ""
                                    }`}
                                    inputPlaceholder="Name"
                                    maxLength="30"
                                    inputName="professor_name"
                                    handleInpBlur={this.handleFieldChange}
                                    onInputChange={this.handleErrorMessage}
                                    // handleRef={this.inputClassNameRef}
                                  />
                                  {formError.professor_name_error ? (
                                    <div className="info-text error-text">
                                      <p className="error-p">
                                        {formError.professor_name_message}
                                      </p>
                                    </div>
                                  ) : (
                                    formError.professor_name_focus_error && (
                                      <div
                                      className={`info-text ${
                                        formError.professor_name_focus_error ? "" : 
                                        "d-none"
                                      }`}
                                      >
                                      <p className="info-p">
                                        {formError.professor_name_message}
                                      </p>
                                    </div>
                                    )
                                    )}
                                </div>
                              </div>

                              <div className="col-lg-12 col-md-12">
                                <div className="form-group">
                                  <InputComponent
                                    inputType="email"
                                    inputClassName={`form-control ${
                                      formError.email_error ? "error" : ""
                                    }`}
                                    inputName="email"
                                    inputPlaceholder="Email"
                                    handleInpBlur={this.handleFieldChange}
                                    onInputChange={this.handleErrorMessage}
                                  />
                                  {formError.email_error ? (
                                    <div className="info-text error-text">
                                      <p className="error-p">
                                        {formError.email_message}
                                      </p>
                                    </div>
                                  ) : (
                                    <div
                                      className={`info-text ${
                                        !formError.email_focus_error && "d-none"
                                      }`}
                                    >
                                      <p className="info-p">
                                        {formError.email_message}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="col-lg-12 col-md-12">
                                <div className="form-group">
                                  <InputComponent
                                    inputType="email"
                                    inputClassName={`form-control ${
                                      formError.confirm_email_error
                                        ? "error"
                                        : ""
                                    }`}
                                    inputPlaceholder="Confirm Email"
                                    inputName="confirm_email"
                                    handleInpBlur={this.handleFieldChange}
                                    onInputChange={this.handleErrorMessage}
                                  />

                                  {formError.confirm_email_error ? (
                                    <div className="info-text error-text">
                                      <p className="error-p">
                                        {formError.confirm_email_message}
                                      </p>
                                    </div>
                                  ) : null}
                                </div>
                              </div>

                              <div className="col-lg-12 col-md-12">
                                <div className="form-group">
                                  <InputComponent
                                    inputType="password"
                                    inputClassName={`form-control ${
                                      formError.password_error ? "error" : ""
                                    }`}
                                    inputPlaceholder="Password"
                                    inputName="password"
                                    handleInpBlur={this.handleFieldChange}
                                    onInputChange={this.handleErrorMessage}
                                  />
                                  {formError.password_error ? (
                                    <div className="info-text error-text">
                                      <p className="error-p">
                                        {formError.password_message}
                                      </p>
                                    </div>
                                  ) : (
                                    <div
                                      className={`info-text ${
                                        !formError.password_focus_error &&
                                        "d-none"
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
                                <div className="link-bottom-text-row">
                                  <p>
                                    By signing up, you agree to YouHue’s&nbsp;
                                    <a href="https://youhue.com/terms/"  target="_blank" className="link-footer">
                                      Terms of Service
                                    </a>
                                    &nbsp;and&nbsp;
                                    <a href="https://youhue.com/privacy/"  target="_blank" className="link-footer">
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
                                      disabled={this.state.isSignUpDisabled}
                                    >
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
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
