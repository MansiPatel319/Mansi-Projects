import React from "react";
import { Link } from "react-router-dom";
import RemoveEducatorModal from "../Modal/RemoveEducator/RemoveEducator";

import Character3 from "../../../assets/images/character/character-03.png";
import "./Dashboard.scss";
import "../../../styles/style.css";
import InputComponent from "../../UI/InputComponent";
import FreeLimitReachedInvite from "../../../containers/Educator/Modal/FreeLimitReachedInvite";
import UnveifiedLimitReachedModal from "./AccountLock/UnveifiedLimitReachedModal";
import MaximumSchoolLimitReached from "../Modal/MaximumSchoolLimitReached/MaximumSchoolLimitReached";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenRemoveEducatorModal: false,
      educatorId: "",
      isClassNameEditable: false,
      isOpenFreeLimitReachedModal: false,
      numberof_student: {
        maxlimit: "",
        numberofstudent: "",
      },
      isOpenBecomeSchoolAdminModal: false,
      formData: {
        name: props.educator.classDetailData
          ? props.educator.classDetailData.name
          : "",
      },
      accoutDetails: this.props.educator.educatorData,     
      classDetails: this.props.educator.classDetailData,     
      formError: {
        name_error: false,
        name_message: "",
      },
      data: "",
      isSaveDisabled: false,
      isUnverifiedFreeLimitReachedModal:false,
      isPaid: false,
      isOpenPaidLimitReachedModal: false,
      // selectedClassId: props.selectedClassId
    };
  }

  componentDidMount() {
    localStorage.setItem("const_url","")
    this.handleSteps(0);
    this.getSchoolData();
  }
  

  componentDidUpdate(prevProps) {
    if (
      prevProps.educator.classDetailData !== this.props.educator.classDetailData
    ) {
      const data = { name: this.props.educator.classDetailData.name };
      this.setState({ formData: data });
    }
    if(this.props.educator.adminDashboardStepCount !== prevProps.educator.adminDashboardStepCount) {
      this.handleSteps(0);
    }
  }

  getSchoolData = () => {
    this.props
      .getSchoolData()
      .then((res) => {
        if (res.status) {
          if (res.code === 202) {
            this.setState({ noSchoolAssociated: true });
          }
          this.setState({ data: res.data });
          const max_students = res.data?.school_category.max_students
            ? res.data.school_category.max_students
            : 100;
            const totalenterstudent = res?.data?.number_of_students;
            const temp_no_students = res?.data?.temp_no_students;
          this.setState({
            numberof_student: {
              maxlimit: max_students,
              numberofstudent: totalenterstudent,
              tempStudents: temp_no_students
            },
            isPaid: res?.data?.paid
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleEducatorId = (id) => {
    this.setState({ educatorId: id });
  };

  enableEditClassName = () => {
    this.setState({ isClassNameEditable: true });
  };

  handleOpenRemoveEducatorModal = () => {
    this.setState({ isOpenRemoveEducatorModal: true });
  };

  handleEditClassName = () => {
    const { educator } = this.props;
    const data = { name: educator.classDetailData.name };
    this.setState({
      isClassNameEditable: false,
      formData: data,
    });
  };

  handleCloseRemoveEducatorModal = (isRemoveEducator) => {
    const { educator } = this.props;
    const { educatorId } = this.state;
    if (isRemoveEducator === true) {
      const data = {
        class_id: educator.classDetailData["id"],
        educator_id: educatorId,
      };
      this.props
        .removeEducatorFromClass(data)
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
    this.setState({ isOpenRemoveEducatorModal: false });
  };

  handleSteps = (step) => {
    this.props.setAdminDashboardStepCount(step);
  };
  varified = () => {
    if (this.state.accoutDetails?.verifiy_educator) {
      const maxLimit = this.state.isPaid || this.state.data.role==="Admin" ?    this.state.numberof_student.maxlimit+25  :   this.state.numberof_student.maxlimit 
      if (
        this.state.data.number_of_students >=
        maxLimit
      ) {
        if (this.state.isPaid || this.state.accoutDetails.role==="admin") {
          this.setState({
            isOpenPaidLimitReachedModal: true,
          });
        } else {
          this.setState({ isOpenFreeLimitReachedModal: true });
        }
      } else {
        if (!this.state.isOpenFreeLimitReachedModal) this.handleSteps(2);
      }
    } else {
      if (this.props.educator.classDetailData.temp_no_students >= 100) {
        this.setState({ isUnverifiedFreeLimitReachedModal: true });
      } else {
        if (!this.state.isOpenFreeLimitReachedModal) this.handleSteps(2);
      }
    }
  };
  handleStudentData = (data) => {
    this.props.setStudentDetailData(data);
    this.handleSteps(3);
  };

  handleEmail = (eduEmail) => {
    const { educator } = this.props;
    const data = {
      group_id: educator.classDetailData["id"],
      email:eduEmail
    };
    this.props.resendInviteEmail(data).then(
      console.log("resend email done")
    )
  }

  handleIndividualStudentData = (data) => {
    localStorage.setItem("student_id",data.id)
    this.props.setStudentDetailData(data);
    this.handleSteps(4);
  };

  printPasscodes = () => {
    const { educator } = this.props;
    const data = {
      group_id: educator.classDetailData["id"],
    };
    localStorage.setItem("studentclassid",data["group_id"])
    this.props
      .printPasscodes(data)
      .then((res) => {
        if (res.status) {
          // console.log(res,"res");
          // this.setState({
          //   student_lst_1 : res.data.student_lst1,
          //   student_lst_2 : res.data.student_lst2,
          // })
          // console.log(this.state,"this.state");
          // this.props.addToast(res.message, {
          //   appearance: "success",
          //   autoDismiss: true,
          // });
          localStorage.setItem("const_url","/download/studentCodeList/")
          window.open("/download/studentCodeList/",);
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
    if (data.name.trim() === "") {
      formError.name_error = true;
      formError.name_message = "Please enter your class name.";
      isFormValid = false;
    } else if (data.name.length > 50) {
      formError.name_error = true;
      formError.name_message = "Keep your class name upto 50 characters.";
      isFormValid = false;
    } else {
      formError.name_error = false;
      formError.name_message = "";
    }
    this.setState({ formError });
    return isFormValid;
  };

  handleChangedField = (event) => {
    const { name, value } = event.target;
    const formError = { ...this.state.formError };
    if (name === "name") {
      formError[`${name}_error`] = true;
      if (value.trim() === "") {
        formError[`${name}_message`] = "Please enter your class name.";
      } else if (value.length > 50) {
        formError[`${name}_message`] =
          "Keep your class name upto 50 characters.";
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
    if (value.trim() === "") {
      this.setState({
        isSaveDisabled: true,
      });
    } else {
      this.setState({
        isSaveDisabled: false,
      });
    }

    this.setState({ formData });
  };

  handleErrorMessage = (event) => {
    const formError = { ...this.state.formError };
    const { name } = event.target;
    if (name === "name") {
      formError[`${name}_error`] = false;
      formError[`${name}_message`] = "";
    }
    this.setState({ formError });
  };

  submitForm = () => {
    const { formData } = this.state;
    const { educator } = this.props;
    const isValid = this.validateForm(formData);
    let formDataNew = Object.assign(formData, {});
    formDataNew.name = formDataNew.name.trim();
    if (isValid) {
      const classId = educator.classDetailData["id"];
      this.props
        .updateClassName(classId, formDataNew)
        .then((res) => {
          if (res.status) {
            // this.props.addToast(res.message, {
            //   appearance: "success",
            //   autoDismiss: true,
            // });
            this.setState({ isClassNameEditable: false }, async () => {
              await this.props.getClassDetails(classId);
              await this.props.getAllClass();
            });
            this.handleSteps(0);
          } else {
            this.setState({formError:{
              name_error: true,
              name_message: res.message,
            }})
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

  handleCloseFreeLimitReachedModal = () => {
    this.setState({ isOpenFreeLimitReachedModal: false });
  };
  handleClosePaidLimitReachedModal = () => {
    this.setState({ isOpenPaidLimitReachedModal: false });
  };

  render() {
    // console.log('this.props.educator. :>> ', this.props.educator);
    const { educator } = this.props;
    const { formData, formError } = this.state;
    // console.log('this.props.educator. :>> ', educator);
    // const to = "/download/studentCodeList/" + educator.classDetailData.id + "/"
    return (
      <div className="main-dashboard-body">
        <div className="row">
          <div className="col-lg-12">
            <div className="box-heading-div">
              {this.state.isClassNameEditable ? (
                <div className="class-group-root-div " id="class-input-group">
                  <div className="form-div class-form-div">
                    <div className="form-group class-form-group">
                      <div className="form-group-row">
                        <div className="input-group-box">
                          <InputComponent
                            inputType="text"
                            inputClassName="form-control"
                            inputID="class-name"
                            inputName="name"
                            inpValue={formData.name || ""}
                            onInputChange={this.handleFieldChange}
                            handleInpBlur={this.handleChangedField}
                            handleInpfocus={this.handleErrorMessage}
                            maxLength="40"
                          />
                          {formError.name_error ? (
                            <div className="info-text error-text">
                              <p className="error-p">
                                {formError.name_message}
                              </p>
                            </div>
                          ) : null}
                        </div>
                        <div className="button-group-div">
                          <button
                            className={`btn btn-common-outline btn-primary2-fill mr-5px btn-save-class ${
                              this.state.isSaveDisabled && "disabled"
                            }`}
                            id="btn-save-new-class"
                            onClick={this.submitForm}
                            disabled={this.state.isSaveDisabled}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-common-outline btn-primary3 btn-primary3-fill btn-cancel-class"
                            id="btn-cancel-class"
                            onClick={this.handleEditClassName}
                          >
                            Cancel
                          </button>
                          {formError.name_error ? (
                            <div>
                              <p className="d-block"></p>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="title-heading-div" id="className-name-text">
                  <h2 className="overflow-div">
                    {educator.classDetailData
                      ? educator.classDetailData.name
                      : ""}
                  </h2>
                  <Link
                    to="#"
                    className="btn-transparent edit-btn"
                    id="edit-className-button"
                    onClick={this.enableEditClassName}
                  >
                    <span className="custom-icon edit-icon"></span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="primary-common-box primary-educators-box">
              <div className="primary-header-box">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="primary-header-box-row">
                      <div className="primary-header-box-left">
                        <h3>
                          Educators
                          <div className="primary-header-box-left">
                            <Link
                              to="#"
                              className="btn btn-general-link btn-general-add btn-plus-icon btn-educator"
                              onClick={() => this.handleSteps(1)}
                              style={
                                educator.educatorData.verifiy_educator
                                  ? null
                                  : { pointerEvents: "none", opacity: 0.3 }
                              }
                            >
                              <span className="custom-icon plus-new-icon"></span>
                            </Link>
                          </div>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="primary-body-box">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="primary-body-box-row">
                      <div className="primary-table-custom">
                        <div className="primary-table-header">
                          <div className="tr-div">
                            <div className="th-div column-div col-30">
                              <h4>Name</h4>
                            </div>
                            <div className="th-div column-div col-30">
                              <h4>Email</h4>
                            </div>
                            <div className="th-div column-div col-40"></div>
                          </div>
                        </div>

                        <div className="primary-table-body">
                          {educator.classDetailData &&
                          educator.classDetailData.educator
                            ? educator.classDetailData.educator.map((res) => {
                                return (
                                  <div className="tr-div" key={res.id}>
                                    <div className="td-div column-div col-30">
                                      <p data-title="Name">
                                        {res.professor_name}
                                      </p>
                                    </div>
                                    <div className="th-div column-div col-30">
                                      <p data-title="Email">{res.email}</p>
                                    </div>
                                    <div className="th-div column-div col-40 edit-col">
                                    {res.is_invited==true ? <span className="invite_pending">Invite Pending...</span> : ""}
                                    {
                                      res.is_invited==true ? 
                                      <Link
                                        to="#"
                                        className="btn btn-general-link btn-delete-icon btn-educator"
                                        onClick={() => {
                                          this.handleEmail(res.email);
                                        }}
                                      >
                                        {res.is_invited==true ? <span style={{"margin":"0 7px 0 0"}} title="Resend Invite Email." className="custom-icon resend-mail"></span> : ""}
                                      </Link>
                                      : ""
                                    }
                                      <Link
                                        to="#"
                                        className="btn btn-general-link btn-general-remove btn-delete-icon btn-educator"
                                        onClick={() => {
                                          this.handleEducatorId(res.id);
                                          this.handleOpenRemoveEducatorModal();
                                        }}
                                      >
                                        <span className="custom-icon cancel-round-icon"></span>
                                      </Link>
                                    </div>
                                  </div>
                                );
                              })
                            : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {educator.classDetailData &&
            educator.classDetailData.total_students > 0 ? (
              <div className="primary-common-box primary-students-box">
                <div className="primary-header-box">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="primary-header-box-row">
                        <div className="primary-header-box-left">
                          <h3>
                            Students
                            <div className="primary-header-box-left">
                              <Link
                                to="#"
                                className="btn btn-general-link btn-general-add btn-plus-icon btn-educator"
                                onClick={() => this.varified()}
                              >
                                <span className="custom-icon plus-new-icon"></span>
                              </Link>
                            </div>
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="primary-body-box">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="primary-body-box-row">
                        <div className="primary-table-custom primary-students-custom">
                          <div className="primary-table-header">
                            <div className="tr-div">
                              <div className="th-div column-div col-40">
                                <h4>Name</h4>
                              </div>
                              <div className="th-div column-div col-40">
                                <h4>Passcode</h4>
                              </div>
                              <div className="th-div column-div col-20"></div>
                            </div>
                          </div>
                          <div className="primary-table-body">
                            {educator.classDetailData &&
                            educator.classDetailData.student
                              ? educator.classDetailData.student.map((res) => {
                                  return (
                                    <div className="tr-div" key={res.id}>
                                      <div
                                        className="td-div column-div col-40"
                                        onClick={
                                          () => {
                                            this.props.setSelectedStudentData(
                                              res.id
                                            );
                                            this.props.setInsightDashboardStepCount(
                                              4
                                            );
                                            this.props.setAdminDashboardStepCount(
                                              -1
                                            );
                                          }
                                          // this.handleIndividualStudentData(
                                          //   res.id
                                          // )
                                        }
                                      >
                                        <Link
                                          to="#"
                                          className="btn btn-general-link"
                                          data-title="Name"
                                        >
                                          {res.username}
                                        </Link>
                                      </div>
                                      <div className="th-div column-div col-40">
                                        <p data-title="Passcode">
                                          {res.access_code}
                                        </p>
                                      </div>
                                      <div className="th-div column-div col-20 edit-col">
                                        <Link
                                          to="#"
                                          onClick={() =>
                                            this.handleStudentData(res)
                                          }
                                          className="btn btn-general-link btn-general-edit btn-edit-btn mr-10"
                                        >
                                          <span className="custom-icon edit-icon"></span>
                                        </Link>
                                        <Link
                                          to="#"
                                          className="btn btn-general-link btn-login-btn"
                                          onClick={() =>
                                            this.handleIndividualStudentData(
                                              res
                                            )
                                          }
                                        >
                                          <span className="custom-icon login-new-icon"></span>{" "}
                                        </Link>
                                      </div>
                                    </div>
                                  );
                                })
                              : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="primary-footer-box">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="primary-footer-box-row">
                        <div className="print-button-right">
                          <Link
                            to="#"
                            className="btn btn-general-link btn-print-pass-code"
                            onClick={() => {
                              this.printPasscodes();
                            }}
                          >
                            Download Passcode List
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="primary-common-box primary-students-box">
                <div className="primary-header-box">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="primary-header-box-row">
                        <div className="primary-header-box-left">
                          <h3>Students</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="primary-body-box">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="empty-body-box-row">
                        <div className="empty-student-box">
                          <div className="empty-image-box">
                            <img
                              src={Character3}
                              className="img-fluid img-character img-empty"
                              alt="character"
                            />
                          </div>
                          <div className="button-add-box">
                            <div className="button-add-box-center">
                              <Link
                                to="#"
                                className="btn btn-common-outline btn-primary1 btn-add-students "
                                onClick={() => this.varified()}
                              >
                                Add Students!
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {this.state.isOpenRemoveEducatorModal ? (
          <RemoveEducatorModal
            show={this.state.isOpenRemoveEducatorModal}
            onClose={this.handleCloseRemoveEducatorModal}
            isOpenLastEducatorModal={
              educator.classDetailData &&
              educator.classDetailData.educator.length > 1
                ? false
                : true
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
        {this.state.isUnverifiedFreeLimitReachedModal ? (
          <UnveifiedLimitReachedModal onClose={()=>this.setState({isUnverifiedFreeLimitReachedModal: false})}
          
        />
        ) : null}
      </div>
    );
  }
}

export default Dashboard;
