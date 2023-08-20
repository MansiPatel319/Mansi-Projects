import React, { Component } from "react";
import { Modal } from "react-bootstrap";

import ".././FreeLimitReachedInvite/FreeLimitReachedInvite.scss";
import "../../../../styles/custom.css";
import { isValidEmailAddress } from "../../../../utils/validators";
import InputComponent from "../../../UI/InputComponent";
import DropDownList from "../../../UI/DropDownList";
import imageIcon from "../../../../assets/images/icons/user-new-icon.svg"
import { Link } from "react-router-dom";

class InviteSomeone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMailSent: false,
      isSelectedEducator: false,
      isInviteEdu: false,
      formData: {
        email: "",
        professor_name: "",
      },
      readyToSubmit:false,
      formError: {
        email_error: false,
        email_message: "",
        professor_name_error: false,
        professor_name_message: "",
      },
      common_error: "",
      invite_edu_error: "",
      eduList: [],
      educatorOptionList :[],
      selectedEducator: undefined,
      isShowDropDown: false,
      isShowForm: false,
      schoolId: undefined
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentDidMount() {
    localStorage.setItem("const_url","")
    this.getEducatorList();
    this.getSchoolData()
  }
  handleSteps = (step) => {
    this.props.setAdminDashboardStepCount(step);
  };

  validateForm = (data) => {
    let isFormValid = true;
    const { isSelectedEducator, isInviteEdu } = this.state;
    const formError = { ...this.state.formError };
    if (
      (isSelectedEducator && isInviteEdu) ||
      (!isSelectedEducator && !isInviteEdu)
    ) {
      this.setState({ common_error: "Please select any one option." });
      isFormValid = false;
    } else {
      if (data.email.trim() === "") {
        formError.email_error = true;
        formError.email_message = "Please enter an email.";
        isFormValid = false;
      } else if (!isValidEmailAddress(data.email)) {
        formError.email_error = true;
        formError.email_message = "Please enter a valid email.";
        isFormValid = false;
      } else {
        formError.email_error = false;
        formError.email_message = "";
      }
      if (data.professor_name.trim() === "") {
        formError.professor_name_error = true;
        formError.professor_name_message = "Please enter an educator's name.";
        isFormValid = false;
      } else {
        formError.professor_name_error = false;
        formError.professor_name_message = "";
      }
    }
    this.setState({ formError });
    return isFormValid;
  };

  handleChangedField = (name, value) => {
    this.setState({ isInviteEdu: true, common_error: "" });
    const formError = { ...this.state.formError };
    if (name === "email") {
      formError[`${name}_error`] = true;
      if (value.trim() === "") {
        this.setState({ isInviteEdu: false });
        formError[`${name}_message`] = "Please enter an email.";
      } else if (!isValidEmailAddress(value)) {
        formError[`${name}_message`] = "Please enter a valid email.";
      } else {
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
      }
    } else if (name === "professor_name") {
      formError[`${name}_error`] = true;
      if (value.trim() === "") {
        this.setState({ isInviteEdu: false });
        formError[`${name}_message`] = "Please enter an educator's name.";
      } else {
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
      }
    }
    // this.setState({ formError });
    this.setState({ formError }, () => {
      this.readyTosubmitvalidation();
    });
  };

  handleFieldChange = (event) => {
    this.setState({ isInviteEdu: true, common_error: "" });
    const { name, value } = event.target;
    const formData = { ...this.state.formData };
    formData[name] = value;
    this.setState({ formData }, () => {
      this.handleChangedField(name, value);
      this.readyTosubmitvalidation();
    });
    // this.setState({ formData });
  };
  readyTosubmitvalidation = async () => {
    if(this.state.formData.email===''||this.state.formData.professor_name===''){
      this.setState({readyToSubmit:false})
    }
    else if(this.state.formError.professor_name_message!=='' || this.state.formError.email_message!==''){
      this.setState({readyToSubmit:false})
    }
    else{
      this.setState({readyToSubmit:true})
    }
  }
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
    const formData = { ...this.state.formData };
    const { name, value } = event.target;
    if (name === "email") {
      const testForField = this.checkFiledsArenotBlank("professor_name",value)
      if (testForField && isValidEmailAddress(value)) {
        this.setState({ isDisabledSave: false });
      }
      else{
        this.setState({ isDisabledSave: true });
      }
      formError[`${name}_error`] = false;
      formError[`${name}_message`] = "";
    }
    if (name === "professor_name") {
      const testForField = this.checkFiledsArenotBlank("email",value)
      if (testForField && isValidEmailAddress(formData["email"])) {
        this.setState({ isDisabledSave: false });
      }
      else{
        this.setState({ isDisabledSave: true });
      }
      formError[`${name}_error`] = false;
      formError[`${name}_message`] = "";
    }
    this.setState({ formError , isShowDropDown: true });
    this.readyTosubmitvalidation();
   
  };
  
  
  getSchoolData = () => {
   
    this.props
      .getSchoolData()
      .then((res) => {
        this.setState({isPaid: res.data})
        if (res.status) {
          this.setState({schoolId: res.data.id})
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({loading: false})
      });
  };

  submitForm = () => {
   
    const { formData, isSelectedEducator } = this.state;
    const { educator } = this.props;
    const isValid = this.validateForm(formData);

    if (isValid) {
      this.setState({ invite_edu_error: '' });
      const classId = educator.classDetailData["id"];
      var isInvite = false;
      if (isSelectedEducator) {
        isInvite = false;
      } else {
        isInvite = true;
      }
      const data = {
        name: formData["professor_name"],
        email: formData["email"],
        school_id: this.state.schoolId,
        // isInvited: isInvite,
      };
      this.props
        .inviteAdmin(data)
        .then((res) => {
          if (res.status) {
            if (res.code === 200) {
              // this.props.addToast(res.message, {
              //   appearance: "success",
              //   autoDismiss: true,
              // });
              this.setState({
                isMailSent:true
              })
              this.handleSteps(0);
              this.props.onClose()
            //   this.props.getClassDetails(classId);
            }
            if (res.code === 201) {
              // this.props.addToast(res.message, {
              //   appearance: "success",
              //   autoDismiss: true,
              // });
              this.setState({
                isMailSent:true
              })
              this.handleSteps(0);
              this.props.onClose()
              this.props.getClassDetails(classId);
            }
            if (res.code === 202) {
              // this.props.addToast(res.message, {
              //   appearance: "error",
              //   autoDismiss: true,
              // });
              this.setState({ invite_edu_error: res.message });
            }
            if (res.code === 400) {
              // this.props.addToast(res.message, {
              //   appearance: "error",
              //   autoDismiss: true,
              // });
              this.setState({ invite_edu_error:  res.message  });
            }
          } else {
            // this.props.addToast(res.message, {
            //   appearance: "error",
            //   autoDismiss: true,
            // });
            if(res.code==400)
            {
              this.setState({ invite_edu_error:res.message });
            }
          }
        })
        .catch((err) => {
          this.setState({ invite_edu_error:  err.message });
        });
    }
  };
  getEducatorList = () => {
    this.props
      .verifiedEducatorList()
      .then((res) => {
        if (res.status) {
          const options = res.data.map(
            ({ user: { professor_name: label, id: value, email: email } }) => ({
              value: value,
              label: (
                <div className="select-card-dropdown-div">
                  <div className="dd-container">
                    <Link to="#" className="dd-option">
                      {" "}
                      <span className="span-img">
                        <img className="dd-option-image" src={imageIcon} />
                      </span>{" "}
                      <label className="dd-option-text">{label}</label>{" "}
                      <small className="dd-option-description dd-desc">
                        {email}
                      </small>
                    </Link>
                  </div>
                </div>
              ),
            })
          );
          this.setState({ eduList: res.data, educatorOptionList: options });
          // setPostCategoryOptions(options);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleSelect = (event) => {
    this.setState({ isSelectedEducator: true, common_error: "", selectedEducator: event,  isDisabledSave: false });
    const { eduList } = this.state;
    eduList.map((res) => {
        if (res.user.id === event.value) {
        this.setState({
          formData: {
            email: res.user.email,
            professor_name: res.user.professor_name,
          },
          readyToSubmit:true,
          isShowForm: true,
        },
       
        );
      }
    });
  };

  render() {
   
    const { formError, eduList, common_error, invite_edu_error, educatorOptionList, selectedEducator } = this.state;
    return (
      <>
        <Modal
          className="modal modal-custom modal-custom-new fade"
          id="free-limit-reached-modal-invite-someone-else"
          centered
          size="lg"
          show={this.props.show}
          onHide={this.props.onClose}
        >
          <div className="modal-lg custom-new-modal-invite modal-dialog-centered">
            <div className="modal-content min-height-633 br-0">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  onClick={this.props.onClose}
                  data-dismiss="modal"
                >
                  <span className="custom-icon cancel-new-icon-01"></span>
                </button>
                <div className="heading-title-div">
                  <h2 className="modal-title" style={{ color: "#3f3f44" }}>
                    Your school has reached the free trial limit of 100 students
                  </h2>
                </div>
              </div>

              <div className="modal-body">
                <div className="add-an-educator-modal-root">
                  <div className="add-an-educator-row">
                    <div className="form-custom-div form-custom-400-div form-custom-select-div">
                      <div className="row" style={
                              this.state.isShowDropDown
                                ? { pointerEvents: "none", opacity: 0.3 }
                                : null
                            }>
                        <div className="col-lg-12 col-md-12">
                          <div className="form-group form-group-wt-label2 mb-30">
                            <label
                              className="label small-text-label"
                              htmlFor=""
                            >
                              Select an existing educator
                            </label>
                            <DropDownList
                              value={selectedEducator}
                              handleOptionChange={(e) => this.handleSelect(e)}
                              options={educatorOptionList}
                              placeholder={
                                <div className="select-card-dropdown-div">
                                  <div className="dd-container">
                                    <Link to="#" className="dd-option">
                                      <span className="span-img">
                                        <img
                                          className="dd-option-image"
                                          src={imageIcon}
                                        />
                                      </span>
                                      <label className="dd-placeholder-text">
                                        Select an Educator
                                      </label>

                                    </Link>
                                  </div>
                                </div>
                              }
                            />
                             { this.state.isShowForm && invite_edu_error !== "" ? (
                                    <div className="info-text error-text">
                                      <p className="error-p">
                                        {invite_edu_error}
                                      </p>
                                    </div>
                                  ) : null}
                            {/* <div className="input-div">
                              <div className="select-card-dropdown-div">
                                <div
                                  className="dropdown-select-user"
                                  id="myDropdown"
                                >
                                  <select
                                    id="demo-htmlselect"
                                    onChange={(e) => this.handleSelect(e)}
                                  >
                                    {eduList.map((res, index) => {
                                      return (
                                        <option
                                          value={res.user.id}
                                          data-imagesrc="assets/images/icons/user-new-icon.svg"
                                          data-description="csara@kingsnas.ae"
                                        >
                                          {" "}
                                          {res.user.professor_name}{" "}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>
                              </div>
                            </div> */}
                          </div>
                        </div>
                      </div>

                      <div className="row"   style={
                              this.state.isShowForm
                                ? { pointerEvents: "none", opacity: 0.3 }
                                : null
                            }>
                        <div className="col-lg-12 col-md-12">
                          <div className="form-group form-group-wt-label2">
                            <label className="label small-text-label" for="">
                            Or, invite someone from your school to be the admin
                            </label>
                            <div className="input-div">
                              <InputComponent
                                inputType="text"
                                inputClassName="form-control"
                                inputPlaceholder="Name"
                                maxLength="30"
                                inputID="your-name-acc"
                                inputName="professor_name"
                                onInputChange={this.handleFieldChange}
                                // handleInpBlur={this.handleFieldChange}
                                handleInpfocus={this.handleErrorMessage}
                              />
                              {/* {formError.professor_name_error ? (
                                <div className="info-text error-text">
                                  <p className="error-p">
                                    {formError.professor_name_message}
                                  </p>
                                </div>
                              ) : null} */}
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-12 col-md-12">
                          <div className="form-group form-group-wt-label2">
                            <div className="input-div">
                              <InputComponent
                                inputType="email"
                                inputClassName="form-control"
                                inputID="confirm-email-acc"
                                inputName="email"
                                inputPlaceholder="Email"
                                onInputChange={this.handleFieldChange}
                                // handleInpBlur={this.handleFieldChange}
                                handleInpfocus={this.handleErrorMessage}
                              />
                              {/* {formError.email_error ? (
                                <div className="info-text error-text">
                                  <p className="error-p">
                                    {formError.email_message}
                                  </p>
                                </div>
                              ) : null}
                              {common_error !== "" ? (
                                <div className="info-text error-text">
                                  <p className="error-p">{common_error}</p>
                                </div>
                              ) : null}*/}
                              {this.state.isShowDropDown &&  invite_edu_error !== "" ? (
                                <div className="info-text error-text">
                                  <p className="error-p">{invite_edu_error}</p>
                                </div>
                              ) : null} 
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="notes-blm-div">
                      <p>
                        * You will not be able to add more students until the
                        invitee becomes the school admin.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="yh_modal_btnWrapper yh_center_btnWrapper">
                  <div className="yh_btBlock ">
                    <button
                    disabled={!this.state.readyToSubmit}
                      type="button"
                      onClick={this.submitForm}
                      className={`btn btn-common-primary btn-primary-width240 ${
                        this.state.isMailSent ? "btn-suceess" : ""
                      }`}
                    >
                      {this.state.isMailSent ? "Invite Sent!" : "Send invite"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

export default InviteSomeone;
