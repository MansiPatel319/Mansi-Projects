import React from "react";
import { Link } from "react-router-dom";

import Character1 from "../../../assets/images/Student/character/character-01.png";
import InputComponent from "../../UI/InputComponent";
import "../Student.scss";

class AddStudentCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forwardButtonEnable: false,
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
    localStorage.setItem("const_url","")
    // localStorage.setItem('noRedirect', true)
  }

  handleSteps = (step) => {
    this.props.setStudentMoodDetailCount(step);
  };

  validateForm = (data) => {
    let isFormValid = true;
    const formError = { ...this.state.formError };
    if (data.code.trim() === "") {
      formError.code_error = true;
      formError.code_message = "Please enter your passcode!";
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
    if (name === "code") {
      formError[`${name}_error`] = true;
      if (value.trim() === "") {
        formError[`${name}_message`] = "";
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
    formData[name] = value.toUpperCase();
    this.setState({ formData }, () => {
      this.handleChangedField(name, value);
      // this.setState({ forwardButtonEnable: true });
    });
  };

  submitForm = () => {
    const { formData, formError } = this.state;
    const isValid = this.validateForm(formData);
    formData.class_id = this.props.student.studentSelectedClass.id;
    if (isValid) {
      this.props
        .checkPassCode(formData)
        .then((res) => {
          if (res.status) {
            // this.props.addToast(res.message, { appearance: 'success', autoDismiss: true });
            this.handleSteps(3);
          } else {
            // this.props.addToast(res.message, { appearance: 'error', autoDismiss: true });
            formError.code_error = true;
            formError.code_message =
              "Uh oh, please check your code and try again!";
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
    const { student } = this.props;
    return (
      <div className="wrapper">
        <div className="main-middle-area">
          <div className="app-main-area-section">
            <div className="app-main-area-div">
              <div className="app-top-bar-div">
                <div className="app-top-row">
                  <div className="app-top-left-div">
                    <div className="icon-group backward-icon-group">
                      <Link
                        to="#"
                        className="link-icon backward-link"
                        onClick={() => this.handleSteps(1)}
                      >
                        <span className="custom-icon backward-icon"></span>
                      </Link>
                    </div>
                  </div>
                  <div className="app-center-right-div"></div>
                  <div className="app-top-right-div">
                    <div className="icon-group forward-icon-group">
                      <Link
                        to="#"
                        className={`link-icon forward-link ${
                          this.state.forwardButtonEnable ? "" : "disabled"
                        }`}
                        onClick={this.submitForm}
                      >
                        <span className="custom-icon forward-icon"></span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="app-middle-area-div pt-100">
                <div className="app-middle-area-root app-middle-code-area-root student-code-area-root min-height-m100">
                  <div className="container container-md">
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <div className="center-middle-area min-height-m190">
                          <div className="code-area-div">
                            <div className="code-thumb-box">
                              <div className="heading-top-code">
                                <h2>
                                  {student.studentSelectedClass
                                    ? student.studentSelectedClass.class_name
                                    : ""}
                                </h2>
                                <div className="img-div">
                                  <img
                                    src={Character1}
                                    className="img-fluid img-character-code"
                                    alt="character"
                                  />
                                </div>
                              </div>
                              <div className="form-center-div">
                                <div className="form-group">
                                  <label htmlFor="code">
                                    {" "}
                                    What is your YouHue passcode?
                                  </label>
                                  <div className="input-group">
                                    <InputComponent
                                      inputType="password"
                                      inputClassName="form-control"
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

export default AddStudentCode;
