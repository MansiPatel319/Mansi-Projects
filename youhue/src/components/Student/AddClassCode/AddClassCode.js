import React from "react";
import { Link } from "react-router-dom";
import InputComponent from "../../UI/InputComponent";

import Logo from "../../../assets/images/Student/youhue.svg";
import "../Student.scss";

class AddclassNameCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forwardButtonEnable: false,
      isBackwardButton: false,
      formData: {
        code: "",
      },
      formError: {
        code_error: false,
        code_message: "",
      },
    };
  }

  componentDidMount() {
    // localStorage.setItem('noRedirect', true)
    localStorage.setItem("const_url","")
    this.checkClassDetail();
  }

  checkClassDetail = () => {
    let classCodes = JSON.parse(localStorage.getItem("classCodes")) || [];
    if (classCodes.length > 0) {
      this.setState({ isBackwardButton: true });
    }
  };

  handleSteps = (step) => {
    this.props.setStudentMoodDetailCount(step);
  };

  validateForm = (data) => {
    let isFormValid = true;
    const formError = { ...this.state.formError };
    const classCodes = JSON.parse(localStorage.getItem("classCodes")) || [];
    if (data.code.trim() === "") {
      formError.code_error = true;
      formError.code_message = "Please enter class code!";
      isFormValid = false;
    } else if (classCodes.indexOf(data.code) !== -1) {
      formError.code_error = true;
      formError.code_message = "This class already exists on your device";
      isFormValid = false;
    } else {
      formError.code_error = false;
      formError.code_message = "";
    }
    this.setState({ formError });
    return isFormValid;
  };

  handleChangedField = (name, value) => {
    const formError = { ...this.state.formError };
    const classCodes = JSON.parse(localStorage.getItem("classCodes")) || [];
    if (name === "code") {
      formError[`${name}_error`] = true;
      if (value.trim() === "") {
        formError[`${name}_message`] = "";
      } else if (classCodes.indexOf(value) !== -1) {
        formError[`${name}_message`] =
          "This class already exists on your device";
      } else {
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
      }
    }
    this.setState({
      formError,
      forwardButtonEnable: value === "" ? false : true,
    });
  };

  handleFieldChange = (event) => {
    const { name, value } = event.target;
    const formData = { ...this.state.formData };
    formData[name] = value;
    this.setState({ formData }, () => {
      this.handleChangedField(name, value);
      // this.setState({ forwardButtonEnable: true });
    });
  };

  submitForm = () => {
    const { formData, formError } = this.state;
    const isValid = this.validateForm(formData);
    let classCodes = JSON.parse(localStorage.getItem("classCodes")) || [];
    classCodes.push(formData["code"]);
    let classData = new FormData();
    classData.append("code", JSON.stringify(classCodes));
    if (isValid) {
      this.props
        .checkClassCode(classData)
        .then((res) => {
          if (res.status) {
            let filteredClasses = res.data.data.filter(
              (r) => r.class_code === formData["code"].toUpperCase()
            );
            if (filteredClasses.length > 0) {
              // this.props.addToast(res.message, { appearance: 'success', autoDismiss: true });
              this.handleSteps(1);
              localStorage.setItem("classCodes", JSON.stringify(classCodes));
            } else {
              formError.code_error = true;
              formError.code_message =
                "Uh oh, please check your code and try again!";
              this.setState({ formError });
            }
          } else {
            // this.props.addToast(res.message, { appearance: 'error', autoDismiss: true });
            formError.code_error = true;
            formError.code_message = res.message;
            this.setState({ formError });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  handleKeyUp = (e) => {
    if (parseInt(e.keyCode) === parseInt(13)) {
      this.submitForm();
    }
  };

  render() {
    const { formError } = this.state;
    return (
      <div className="wrapper">
        <div className="main-middle-area">
          <div className="app-main-area-section">
            <div className="app-main-area-div">
              <div className="app-top-bar-div">
                <div className="app-top-row">
                  <div className="app-top-left-div">
                    {this.state.isBackwardButton ? (
                      <div className="icon-group backward-icon-group">
                        <Link
                          to="#"
                          className="link-icon backward-link"
                          onClick={() => this.handleSteps(1)}>
                          <span className="custom-icon backward-icon"></span>
                        </Link>
                      </div>
                    ) : null}
                  </div>
                  <div className="app-center-right-div"></div>
                  <div className="app-top-right-div">
                    <div className="icon-group forward-icon-group">
                      <Link
                        to="#"
                        className={`link-icon forward-link ${
                          this.state.forwardButtonEnable ? "" : "disabled"
                        }`}
                        onClick={this.submitForm}>
                        <span className="custom-icon forward-icon"></span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="app-middle-area-div pt-100">
                <div className="app-middle-area-root app-middle-code-area-root min-height-m100">
                  <div className="container container-md student-container student-container-md">
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <div className="center-middle-area min-height-m190">
                          <div className="code-area-div">
                            <div className="code-thumb-box">
                              <div className="img-div">
                                <img
                                  src={Logo}
                                  className="img-fluid img-logo-code"
                                  alt="youhue"
                                />
                              </div>
                              <div className="form-center-div">
                                <div className="form-group">
                                  <label htmlFor="">
                                    Please enter your class code.
                                  </label>
                                  <div className="input-group">
                                    <InputComponent
                                      inputType="text"
                                      inputClassName="form-control"
                                      inputID="code"
                                      inputName="code"
                                      onInputChange={this.handleFieldChange}
                                      handleKeyUp={this.handleKeyUp}
                                    />
                                  </div>
                                  {formError.code_error ? (
                                    <div className="error-div">
                                      <p>{formError.code_message}</p>
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bottom-area-div">
                          <div className="bottom-area-row">
                            <div className="center-text-div">
                              <p>
                                By using YouHue you agree to our&nbsp;
                                <Link
                                  to="https://youhue.com/terms/"
                                  target="_blank"
                                  className="link">
                                  Terms&nbsp;
                                </Link>
                                <span>and&nbsp;</span>
                                <Link
                                  to="https://youhue.com/privacy/"
                                  target="_blank"
                                  className="link">
                                  Privacy
                                </Link>
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
        </div>
      </div>
    );
  }
}

export default AddclassNameCode;
