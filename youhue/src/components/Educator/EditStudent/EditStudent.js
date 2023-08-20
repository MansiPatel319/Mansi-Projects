import React from "react";
import { Link } from "react-router-dom";

import RemoveStudentModal from "../Modal/RemoveStudent/RemoveStudent";

import { isValidStudentPasscode } from "../../../utils/validators";
import "./EditStudent.scss";
import "../Dashboard/Dashboard.scss";
import "../../../styles/style.css";
import InputComponent from "../../UI/InputComponent";

class EditStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editCodeEnable: false,
      isOpenRemoveStudentModal: false,
      formData: {
        username: props.educator.studentDetailData
          ? props.educator.studentDetailData["username"]
          : "",
        passcode: props.educator.studentDetailData
          ? props.educator.studentDetailData["access_code"]
          : "",
      },
      formError: {
        username_error: false,
        username_message: "",
        passcode_error: false,
        passcode_message: "",
      },
      isDisabledSave: true
    };
  }

  handleOpenRemoveEducatorModal = () => {
    this.setState({ isOpenRemoveStudentModal: true });
  };

  isOpenRemoveStudentModal = (isRemoveStudent, isDeleteStudent) => {
    const { educator } = this.props;
    if (isRemoveStudent === true && isDeleteStudent === true) {
      const student_id = educator.studentDetailData["id"];
      this.props
        .deleteStudent(student_id)
        .then((res) => {
          if (res.status) {
            // this.props.addToast(res.message, {
            //   appearance: "success",
            //   autoDismiss: true,
            // });
            this.props.getClassDetails(educator.classDetailData["id"]);
            this.props.getAccountDetails();
            this.props.getSchoolData()
            this.handleSteps(0);
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
    } else if (isRemoveStudent === true) {
      const removeData = {
        class_id: educator.classDetailData["id"],
        student_id: educator.studentDetailData["id"],
      };
      this.props
        .removeStudentFromClass(removeData)
        .then((res) => {
          if (res.status) {
            // this.props.addToast(res.message, {
            //   appearance: "success",
            //   autoDismiss: true,
            // });
            this.props.getClassDetails(educator.classDetailData["id"]);
            this.handleSteps(0);
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
    this.setState({ isOpenRemoveStudentModal: false });
  };

  handleSteps = (step) => {
    this.props.setAdminDashboardStepCount(step);
  };

  handleEditCode = (isEditCode) => {
    this.setState({ editCodeEnable: isEditCode, isDisabledSave: true });
  };

  handleCancelEditCode = () => {
    const { formData } = this.state;
    const { educator } = this.props;
    formData.passcode = educator.studentDetailData["access_code"];
    formData.username = educator.studentDetailData["username"];
    this.setState({formData})
    this.handleEditCode(false);
  };

  generateRandomCode = () => {
    const student_id = this.props.educator.studentDetailData["id"];
    const formData = { ...this.state.formData };
    const formError = { ...this.state.formError };
    this.props
      .generatePasscode(student_id)
      .then((res) => {
        if (res.status) {
          // this.props.addToast(res.message, { appearance: 'success', autoDismiss: true });
          formData.passcode = res.data["passcode"];
          formError[`passcode_error`] = false;
          formError[`passcode_message`] = "";
          this.setState({ formError });
          this.setState({ formData });
      
          if (formData.passcode!=="" && formData.username!=="") {
            this.setState({ isDisabledSave: false });
          }
          else{
            this.setState({ isDisabledSave: true });
          }
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
  };

  validateForm = (data) => {
    let isFormValid = true;
    const formError = { ...this.state.formError };
    if (data.username.trim() === "") {
      // formError.username_error = true;
      // formError.username_message = "Please enter student name";
      // isFormValid = false;
    } else {
      formError.username_error = false;
      formError.username_message = "";
    }
    // if (data.passcode.trim() === "") {
    //   formError.passcode_error = true;
    //   formError.passcode_message = "Please enter a passcode for your student.";
    //   isFormValid = false;
    // } else
     if (data.passcode.trim() !== "" && !isValidStudentPasscode(data.passcode)) {
      formError.passcode_error = true;
      formError.passcode_message =
        "Passcode should be between 4 to 8 characters (number, alphabet or alphanumeric).";
      isFormValid = false;
    } else {
      formError.passcode_error = false;
      formError.passcode_message = "";
    }
    this.setState({ formError });
    return isFormValid;
  };

  handleChangedField = (name, value) => {
    const formError = { ...this.state.formError };
    if (name === "username") {
      formError[`${name}_error`] = true;
      // if (value.trim() === "") {
      //   formError[`${name}_message`] = "Please enter student name";
      // } else {
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
      // }
    } else if (name === "passcode") {
      formError[`${name}_error`] = true;
      // if (value.trim() === "") {
      //   formError[`${name}_message`] =
      //     "Please enter a passcode for your student.";
      // } else
       if (value.trim() !== "" && !isValidStudentPasscode(value)) {
        formError[`${name}_message`] =
          "Passcode should be between 4 to 8 characters (number, alphabet or alphanumeric).";
      } else {
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
      }
    }
    this.setState({ formError });
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

  handleFieldChange = (event) => {
    const { name, value } = event.target;
    const formData = { ...this.state.formData };
    formData[name] = name==="passcode" ? value.trim().toUpperCase() : value;
 
    const testForField = name ==="username" ? this.checkFiledsArenotBlank("username",value) : this.checkFiledsArenotBlank("passcode",value)
    if (testForField) {
      this.setState({ isDisabledSave: false });
    }
    else{
        this.setState({ isDisabledSave: true });  
    }
    if (!formData["passcode"].trim()) {
      this.setState({ isDisabledSave: true });
    } 
    if (!formData["username"].trim()) {
      this.setState({ isDisabledSave: true });
    } 
    this.setState({ formData });
  };

  showErrorMessage = (event) => {
    const { name, value } = event.target;
    const formData = { ...this.state.formData };
    formData[name] = value;
    this.setState({ formData }, () => {
      this.handleChangedField(name, value);
    });
  };

  handleErrorMessage = (event) => {
    const formError = { ...this.state.formError };
    const { name } = event.target;
    if (name === "username") {
      formError[`${name}_error`] = false;
      formError[`${name}_message`] = "";
    }
    if (name === "passcode") {
      formError[`${name}_error`] = false;
      formError[`${name}_message`] = "";
    }
    this.setState({ formError });
  };

  submitForm = () => {
    const { formData } = this.state;
    const formError = { ...this.state.formError };
    const { educator } = this.props;
    const isValid = this.validateForm(formData);
    if (!formData["passcode"].trim()) {
      formError[`passcode_message`] =
        "Passcode should be between 4 to 8 characters (number, alphabet or alphanumeric).";
      this.setState({ formError });
      this.setState({ isDisabledSave: true });
      return;
      } 
    if (isValid) {
      const studentId = educator.studentDetailData["id"];
      const classId = educator.classDetailData["id"];
      const updatePasscodeData = {
        passcode: formData["passcode"],
        username:formData["username"]
      };
      const updateStudentNameData = new FormData();
      updateStudentNameData.append("username", formData["username"]);
      if (this.state.editCodeEnable) {
        this.props
          .updatePasscode(studentId, updatePasscodeData,updateStudentNameData)
          .then((res) => {
            if (res.status) {
              // this.props.addToast(res.message, {
              //   appearance: "success",
              //   autoDismiss: true,
              // });
              this.props.getClassDetails(classId);
              this.handleSteps(0);
            } else {
              this.setState({
                formError: {
                  passcode_error: true,
                  passcode_message: res.message,
                },
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.props
          .updateStudentName(studentId, updateStudentNameData)
          .then((res) => {
            if (res.status) {
              // this.props.addToast(res.message, {
              //   appearance: "success",
              //   autoDismiss: true,
              // });
              this.props.getClassDetails(classId);
              this.handleSteps(0);
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
    }
  };

  render() {
    const { formData, formError } = this.state;
    return (
      <div className="main-dashboard-body">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="common-admin-db-new-div add-an-educator-admin-div">
              <div className="common-admin-db-new-row">
                <div className="common-admin-db-new-top">
                  <div className="common-admin-db-new-top-row">
                    <div className="cancel-div">
                      <Link
                        to="#"
                        className="cancel-icon-button cancel-button"
                        onClick={() => this.handleSteps(0)}
                      >
                        <span className="custom-icon cancel-round-icon"></span>
                      </Link>
                    </div>

                    <div className="title-div">
                      <h2>Edit student</h2>
                    </div>
                  </div>
                </div>

                <div className="common-admin-db-new-body-row">
                  <div className="yh_editStudent_wrapper">
                    <div className="yh_editStudent_form">
                      <form>
                        <div className="yh_formBlock">
                          <label>Student Name</label>
                          <InputComponent
                            inputType="text"
                            inputClassName={`yh_formField ${
                              this.state.editCodeEnable ? "disabled-02" : ""
                            } `}
                            inputID="student-name"
                            maxLength="30"
                            inputName="username"
                            inpValue={formData.username}
                            onInputChange={this.handleFieldChange}
                            handleInpBlur={this.showErrorMessage}
                            handleInpfocus={this.handleErrorMessage}
                          />

                          {formError.username_error ? (
                            <p className="error-p">
                              {formError.username_message}
                            </p>
                          ) : null}
                        </div>
                        {this.state.editCodeEnable ? (
                          <div className="yh_formBlock">
                            <label>Passcode</label>
                            <div
                              className={`fieldCover ${
                                formError.passcode_error ? "fieldError" : ""
                              }`}
                            >
                              <InputComponent
                                inputType="text"
                                inputClassName={`yh_formField ${
                                  formError.passcode_error ? "yh_formError" : ""
                                }`}
                                inputID="student-pass-ocde"
                                inpValue={formData.passcode}
                                inputName="passcode"
                                onInputChange={this.handleFieldChange}
                                handleInpBlur={this.showErrorMessage}
                                handleInpfocus={this.handleErrorMessage}
                              />
                              <span>
                                {formError.passcode_error ? (
                                  <div className="info-text error-text">
                                    <p className="error-p">
                                      {formError.passcode_message}
                                    </p>
                                  </div>
                                ) : (
                                  "Passcode must be 4 to 8 characters."
                                )}
                              </span>
                            </div>
                            <div>
                              <Link
                                to="#"
                                className="editBtn"
                                onClick={this.generateRandomCode}
                              >
                                Generate random code
                              </Link>
                            </div>
                          </div>
                        ) : (
                          <div className="yh_formBlock">
                            <label>Passcode</label>
                            <InputComponent
                              inputType="text"
                              inputClassName="yh_formField codeDisabled"
                              inputID="student-pass-code"
                              inpValue={formData.passcode}
                              
                              onInputChange={() => {
                                return;
                              }}
                            />
                            <div>
                              <Link
                                to="#"
                                className="editBtn"
                                onClick={() => this.handleEditCode(true)}
                              >
                                Edit code
                              </Link>
                            </div>
                          </div>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div className="common-admin-db-new-bottom">
                <div className="common-admin-db-new-bottom-row">
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <div className="button-row button-row-add-school editStudentRow">
                        <div className="center-side-button">
                          {this.state.editCodeEnable || !this.state.isDisabledSave ? (
                            <button
                              className="btn btn-common-primary btn-primary-width240 btn-red"
                              onClick={() => this.handleCancelEditCode()}
                            >
                              Cancel
                            </button>
                          ) : (
                            <button
                              className="btn btn-common-primary btn-primary-width240 btn-red"
                              onClick={this.handleOpenRemoveEducatorModal}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <div className="center-side-button">
                          <button
                            className="btn btn-common-primary btn-primary-width240"
                            onClick={this.submitForm}
                            disabled={this.state.isDisabledSave}
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
          {this.state.isOpenRemoveStudentModal ? (
            <RemoveStudentModal
              show={this.state.isOpenRemoveStudentModal}
              onClose={this.isOpenRemoveStudentModal}
              isOpenConfirmModal={false}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default EditStudent;
