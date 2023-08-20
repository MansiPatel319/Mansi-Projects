import React from "react";
import { Link } from "react-router-dom";

import Spinner from "../../Spinner/Spinner";

import "./AddStudent.scss";
import "../Dashboard/Dashboard.scss";
import "../../../styles/style.css";
import CopyPasteStudent from "../../../containers/Educator/CopyPasteStudent";
import InputComponent from "../../UI/InputComponent";
import UnveifiedLimitReachedModal from "../Dashboard/AccountLock/UnveifiedLimitReachedModal";
import FreeLimitReachedInvite from "../Modal/FreeLimitReachedInvite/FreeLimitReachedInvite";
import MaximumSchoolLimitReached from "../Modal/MaximumSchoolLimitReached/MaximumSchoolLimitReached";

class AddStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentListForm: [
        {
          student_id: 1,
          student_name_1: "",
          student_name_1_error: false,
          student_name_1_message: "",
        },
      ],
      data: undefined,
      isUpload: false,
      isOpenCopyPasteModal: false,
      formData: {
        csv_file: "",
      },
      formError: {
        csv_file_error: false,
        csv_file_message: "",
      },
      isDisabledSave: true,
      accoutDetails: this.props.educator.educatorData,
      classDetailData: this.props.educator.classDetailData,
      isLoading: false,
      isUnverifiedFreeLimitReachedModal: false,
      isOpenFreeLimitReachedModal: false,
      isOpenPaidLimitReachedModal: false,
    };
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.educator.classDetailData !== this.props.educator.classDetailData
    ) {
      this.setState({
        classDetailData: this.props.educator.classDetailData,
      });
    }
  }

  handleSteps = (step) => {
    this.props.setAdminDashboardStepCount(step);
  };

  addMoreStudent = () => {
    const { studentListForm } = this.state;
    const studentListFormObj = {};
    const student_id = Math.max.apply(
      Math,
      studentListForm.map((o) => {
        return o.student_id;
      })
    );
    studentListFormObj["student_id"] = student_id + 1;
    studentListFormObj[`student_name_${student_id + 1}`] = "";
    studentListFormObj[`student_name_${student_id + 1}_error`] = false;
    studentListFormObj[`student_name_${student_id + 1}_message`] = "";
    studentListForm.push(studentListFormObj);
    this.setState({ studentListForm: studentListForm });
  };

  removeStudent = (id) => {
    const studentListForm = [...this.state.studentListForm];
    if (studentListForm.length > 1) {
      let studentList = studentListForm.filter((res) => res.student_id !== id);
      this.setState({ studentListForm: studentList });
    }
  };

  _handleCSVChange(e, name) {
    e.preventDefault();
    const formData = { ...this.state.formData };
    const formError = { ...this.state.formError };
    let file = e.target.files[0];
    formError[`${name}_error`] = false;
    formError[`${name}_message`] = "";
    if (file) {
      let fileSize = Math.round(file.size / 1024);
      if (fileSize > 2048) {
        formError[`${name}_error`] = true;
        formError[`${name}_message`] =
          "File too Big, please select a file less than 2mb!";
        this.setState({ formError });
      } else {
        formData["csv_file"] = file;
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
        this.setState({ formData, formError, isUpload: true });
      }
    }
  }
  checkFiledsArenotBlank = (filed1) => {
    const { formData } = this.state;
    let flag = false;
    if (filed1.trim() !== "") {
      flag = true;
    }
    return flag;
  };
  handleFieldChange = (event, index) => {
    const { name, value } = event.target;
    const studentListForm = [...this.state.studentListForm];
    studentListForm[index][name] = value;
    const testForField = this.checkFiledsArenotBlank(value);
    if (testForField) {
      this.setState({ isDisabledSave: false });
    } else {
      this.setState({ isDisabledSave: true });
    }
    this.setState({ studentListForm });
  };

  handleChangedField = (name, value, index) => {
    const studentListForm = [...this.state.studentListForm];
    studentListForm[index][`${name}_error`] = true;
    if (value.trim() === "") {
      studentListForm[index][
        `${name}_message`
      ] = `Please enter a student name.`;
    } else {
      studentListForm[index][`${name}_error`] = false;
      studentListForm[index][`${name}_message`] = "";
    }
    this.setState({ studentListForm });
  };

  validateForm = (data) => {
    let isFormValid = false;
    const studentListForm = [...this.state.studentListForm];
    // isFormValid = false;
    studentListForm.map((res, index) => {
      if (
        res[`student_name_${res.student_id}`.trim()] === "" ||
        !res[`student_name_${res.student_id}`]
      ) {
        res[`student_name_${res.student_id}_error`] = true;
        res[
          `student_name_${res.student_id}_message`
        ] = `Please enter a student name.`;
        // isFormValid = false;
      } else {
        res[`student_name_${res.student_id}_error`] = false;
        res[`student_name_${res.student_id}_message`] = "";
        if (!isFormValid) {
          isFormValid = true;
        }
      }
      return [];
    });
    this.setState({ studentListForm });
    return isFormValid;
  };

  handleErrorMessage = (event, index) => {
    const { name } = event.target;
    const studentListForm = [...this.state.studentListForm];
    studentListForm[index][`${name}_error`] = false;
    studentListForm[index][`${name}_message`] = "";
    this.setState({ studentListForm });
  };
  getSchoolDetails = () => {
    this.props
      .getSchoolData()
      .then((res) => {
        if (res.status) {
          this.setState({
            isPaid: res.data.paid,
            data: res.data,
          });
          if (res.code === 202) {
            this.setState({ noSchoolAssociated: true });
          }
          this.setState({ data: res.data });
          if (res.data.join_request === "declined") {
            this.setState({ isOpenJoinRequestDelineModal: true });
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
  showErrorMessage = (event, index) => {
    const { name, value } = event.target;
    const studentListForm = [...this.state.studentListForm];
    studentListForm[index][name] = value;
    this.setState({ studentListForm }, () => {
      this.handleChangedField(name, value, index);
    });
  };
  varified = (studentsLength) => {
    if (this.state.accoutDetails?.verifiy_educator) {
      const maxLimit =
        this.state.isPaid || this.state.accoutDetails.role === "Admin"
          ? this.state.data?.school_category.max_students + 25
          : this.state.data.school_category.max_students;
      if (this.state.data?.number_of_students + studentsLength > maxLimit) {
        if (this.state.isPaid || this.state.accoutDetails.role === "admin") {
          this.setState({
            isOpenPaidLimitReachedModal: true,
          });
        } else {
          this.setState({ isOpenFreeLimitReachedModal: true });
        }
      } else {
        if (!this.state.isOpenFreeLimitReachedModal) return true;
      }
    } else {
      if (
        this.props.educator.classDetailData.temp_no_students + studentsLength >=
        100
      ) {
        this.setState({ isUnverifiedFreeLimitReachedModal: true });
      } else {
        if (!this.state.isOpenFreeLimitReachedModal) return true;
      }
    }
  };

  submitForm = () => {
    const { studentListForm, formData } = this.state;
    const { educator } = this.props;
    const classId = educator.classDetailData["id"];
    const isValid = this.validateForm(studentListForm);
    if (isValid) {
      const formData = new FormData();
      const name = [];
      studentListForm.forEach((res, index) => {
        if (res[`student_name_${res.student_id}`] !== "") {
          name.push(res[`student_name_${res.student_id}`]);
        }
      });
      const isVarified = this.varified(studentListForm.length);
      if (isVarified) {
        formData.append("name", JSON.stringify(name));
        formData.append("_class_id", classId);

        this.props
          .addStudents(formData)
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
    } else if (formData.csv_file) {
      const submitData = new FormData();
      submitData.append("name", formData["csv_file"]);
      submitData.append("_class_id", classId);

      this.props
        .addStudentsUsingCsv(submitData)
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
  };

  isOpenCopyPasteModal = () => {
    this.setState({ isOpenCopyPasteModal: false });
  };

  handleCopyPasteModal = () => {
    this.setState({ isOpenCopyPasteModal: true });
  };
  handleCloseFreeLimitReachedModal = () => {
    this.setState({ isOpenFreeLimitReachedModal: false });
  };
  handleClosePaidLimitReachedModal = () => {
    this.setState({ isOpenPaidLimitReachedModal: false });
  };
  componentDidMount() {
    this.getSchoolDetails();
  }
  render() {
    const { studentListForm, formError, formData } = this.state;
    return (
      <div className="main-dashboard-body">
        {this.props.authenticate.loading ? <Spinner /> : null}
        <div className="row">
          <div className="col-lg-12">
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
                        <span className="custom-icon cancel-round-icon"></span>{" "}
                      </Link>
                    </div>

                    <div className="title-div">
                      <h2>Add students</h2>
                    </div>
                  </div>
                </div>

                <div className="common-admin-db-new-body">
                  <div className="common-admin-db-new-body-row">
                    <div className="add-an-educator-root">
                      <div className="add-an-educator-row add-an-student-row">
                        <div className="form-custom-div form-custom-400-div form-custom-select-div">
                          <div className="row">
                            <div className="col-lg-12 col-md-12">
                              <div className="form-group form-group-wt-label2">
                                <label
                                  className="label small-text-label"
                                  for=""
                                >
                                  Enter the name of each student you’d like to
                                  add
                                </label>

                                {studentListForm.map((res, index) => {
                                  return (
                                    <div
                                      className="input-div"
                                      key={res.student_id}
                                    >
                                      <InputComponent
                                        inputType="text"
                                        inputClassName="form-control"
                                        inputName={`student_name_${res.student_id}`}
                                        maxLength="30"
                                        inpValue={
                                          studentListForm[index][
                                            `student_name_${res.student_id}`
                                          ]
                                        }
                                        onInputChange={(e) =>
                                          this.handleFieldChange(e, index)
                                        }
                                        handleInpBlur={(e) =>
                                          this.showErrorMessage(e, index)
                                        }
                                        handleInpfocus={(e) =>
                                          this.handleErrorMessage(e, index)
                                        }
                                        InputStyle={{
                                          marginBottom: "1px",
                                          marginTop: "20px",
                                        }}
                                        maxLength="30"
                                      />
                                      {/* {
                                              studentListForm.length !== 1 ?
                                              <div className="icon-div">
                                                  <Link href="#!" 
                                                      className="cancel-icon-button cancel-button"
                                                      onClick={() => this.removeStudent(res.student_id)}> 
                                                      <span className="custom-icon cancel-round-icon"></span>
                                                  </Link>
                                              </div>
                                              :null
                                          } */}
                                      {/* {studentListForm[index][
                                        `student_name_${res.student_id}_error`
                                      ] && !formData.csv_file ? (
                                        <div className="info-text error-text">
                                          <p className="error-p">
                                            {
                                              studentListForm[index][
                                                `student_name_${res.student_id}_message`
                                              ]
                                            }
                                          </p>
                                        </div>
                                      ) : null} */}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            <div className="col-lg-12 col-md-12">
                              <div className="left-btn-box mb-2 text-center">
                                {this.state.isUpload ? (
                                  <div className="left-btn-box">
                                    <Link
                                      to="#"
                                      className="add-icon-button add-button"
                                      onClick={this.addMoreStudent}
                                    >
                                      <span className="custom-icon plus-icon"></span>
                                    </Link>
                                    <p>File Uploaded Successfully</p>
                                  </div>
                                ) : (
                                  <div className="left-btn-box">
                                    <Link
                                      to="#"
                                      className="add-icon-button add-button"
                                      onClick={this.addMoreStudent}
                                    >
                                      <span className="custom-icon plus-icon"></span>
                                    </Link>
                                  </div>
                                )}
                                {/* <Link
                                  href="#"
                                  className="add-icon-button add-button"
                                >
                                  {" "}
                                  <span className="custom-icon plus-icon"></span>{" "}
                                </Link> */}
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <div className="right-upload-box text-center">
                                <div
                                  className="custom-file-upload1"
                                  onClick={this.handleCopyPasteModal}
                                >
                                  {/* <input
                                    type="file"
                                    className="custom-file-input"
                                    id="customFile"
                                    name="filename"
                                    accept=".xlsx, .xls, .csv"
                                    onChange={(e) => this._handleCSVChange(e, 'csv_file')}
                                  /> */}
                                  <label for="customFile">
                                    Or, copy and paste your student list
                                  </label>
                                </div>
                              </div>
                              {formError.csv_file_error ? (
                                <div className="info-text error-text">
                                  <p className="error-p">
                                    {formError.csv_file_message}
                                  </p>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="common-admin-db-new-bottom">
                  <div className="common-admin-db-new-bottom-row">
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <div className="button-row button-row-add-school">
                          <div className="center-side-button">
                            <button
                              className="btn btn-common-primary btn-primary-width240"
                              onClick={this.submitForm}
                              disabled={this.state.isDisabledSave}
                            >
                              Save
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
        {this.state.isOpenCopyPasteModal ? (
          <CopyPasteStudent
            show={this.state.isOpenCopyPasteModal}
            onClose={this.isOpenCopyPasteModal}
            props={this.props}
          />
        ) : null}
        {this.state.isUnverifiedFreeLimitReachedModal ? (
          <UnveifiedLimitReachedModal
            onClose={() =>
              this.setState({ isUnverifiedFreeLimitReachedModal: false })
            }
          />
        ) : null}
        {this.state.isOpenFreeLimitReachedModal ? (
          <FreeLimitReachedInvite
            data={this.state.numberof_student}
            show={this.state.isOpenFreeLimitReachedModal}
            onClose={this.handleCloseFreeLimitReachedModal}
          />
        ) : null}
        {this.state.isOpenPaidLimitReachedModal ? (
          <MaximumSchoolLimitReached
            show={this.state.isOpenPaidLimitReachedModal}
            handleClose={this.handleClosePaidLimitReachedModal}
          />
        ) : null}
      </div>
    );
  }
}

export default AddStudent;
