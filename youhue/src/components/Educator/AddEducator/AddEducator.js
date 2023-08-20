import React from "react";
// import Select2 from "react-select2-wrapper";
// import Select from "react-select";
import { Link } from "react-router-dom";
import { isValidEmailAddress } from "../../../utils/validators";
import Spinner from "../../Spinner/Spinner";
import InputComponent from "../../UI/InputComponent";
// import cal from "../../../assets/images/icons/calendar-icon.svg";

import "./AddEducator.scss";
import "../Dashboard/Dashboard.scss";
import "../../../styles/style.css";
import DropDownList from "../../UI/DropDownList";
import imageIcon from "../../../assets/images/icons/user-new-icon.svg";

class AddEducator extends React.Component {
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
      formError: {
        email_error: false,
        email_message: "",
        professor_name_error: false,
        professor_name_message: "",
      },
      common_error: "",
      invite_edu_error: "",
      eduList: [],
      educatorOptionList: [],
      selectedEducator: undefined,
      isShowDropDown: false,
      isShowForm: false,
      isDisabledSave: true
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentDidMount() {
    localStorage.setItem("const_url","")
    this.getEducatorList();
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
    this.setState({ formError });
  };

  handleFieldChange = (event) => {
    this.setState({ isInviteEdu: true, common_error: "" });
    const { name, value } = event.target;
    const formData = { ...this.state.formData };
    formData[name] = value;
    this.setState({ formData }, () => {
      this.handleChangedField(name, value);
    });
    // this.setState({ formData });
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
    this.setState({ formError, isShowDropDown: true });
  };

  submitForm = () => {
    const { formData, isSelectedEducator } = this.state;
    const { educator } = this.props;
    const isValid = this.validateForm(formData);

    if (isValid) {
      const classId = educator.classDetailData["id"];
      var isInvite = false;
      if (isSelectedEducator) {
        isInvite = false;
      } else {
        isInvite = true;
      }
      const data = {
        professor_name: formData["professor_name"],
        email: formData["email"],
        group_id: classId,
        isInvited: isInvite,
      };
      this.props
        .inviteEducator(data)
        .then((res) => {
         
          if (res.status) {
            if (res.code === 200) {
              // this.props.addToast(res.message, {
              //   appearance: "success",
              //   autoDismiss: true,
              // });
              this.handleSteps(0);
              this.setState({ isMailSent: true });
              this.props.getClassDetails(classId);
            }
            if (res.code === 201) {
              // this.props.addToast(res.message, {
              //   appearance: "success",
              //   autoDismiss: true,
              // });
              this.handleSteps(0);
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
            if (res.code === 400) {
              // this.props.addToast(res.message, {
              //   appearance: "error",
              //   autoDismiss: true,
              // });
              this.setState({ invite_edu_error:  res.message });
            }
          }
          
        })
        .catch((err) => {
          this.handleSteps(0);
          this.setState({ invite_edu_error:  err.message });
        });
    }
  };
  getEducatorList = () => {
    let class_id = this.props?.educator?.classDetailData.id
    this.props
      .ClassSchoolVerifiedEducatorList(class_id)
      .then((res) => {
        if (res.status) {
          const options = res.data.map(
            ({ user: { professor_name: label, id: value, email: email } }) => ({
              value: value,
              label: (
                <div className="select-card-dropdown-div">
                  <div className="dd-container" >
                    <Link to="#" className="dd-option">
                      {" "}
                      <span className="span-img">
                        <img className="dd-option-image" src={imageIcon} />
                      </span>{" "}
                      <label className="dd-option-text" style={{textAlign:"left"}}>{label}</label>{" "}
                      <small className="dd-option-description dd-desc" style={{textAlign:"left"}}>
                        {email}
                      </small>
                    </Link>
                  </div>
                </div>
              ),
            })
          );
          this.setState({ eduList: res.data, educatorOptionList: options });
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleSelect = (event) => {
    this.setState({
      isSelectedEducator: true,
      common_error: "",
      selectedEducator: event,
      isDisabledSave: false
    });
    const { eduList } = this.state;
    eduList.map((res) => {
      if (res.user.id === event.value) {
        this.setState({
          formData: {
            email: res.user.email,
            professor_name: res.user.professor_name,
          },
          isShowForm: true,
        });
      }
    });
  };

  render() {
    const {
      formError,
      eduList,
      common_error,
      invite_edu_error,
      selectedEducator,
      educatorOptionList,
    } = this.state;
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
                        <span className="custom-icon cancel-round-icon"></span>
                      </Link>
                    </div>

                    <div className="title-div">
                      <h2>Add an educator</h2>
                    </div>
                  </div>
                </div>

                <div className="common-admin-db-new-body">
                  <div className="common-admin-db-new-body-row">
                    <div className="add-an-educator-root">
                      <div className="add-an-educator-row">
                        <div className="form-custom-div form-custom-400-div form-custom-select-div">
                          <div
                            className="row"
                            style={
                              this.state.isShowDropDown
                                ? { pointerEvents: "none", opacity: 0.3 }
                                : null
                            }
                          >
                            <div className="col-lg-12 col-md-12">
                              <div className="form-group form-group-wt-label2 mb-30">
                                <label
                                  className="label small-text-label"
                                  for=""
                                >
                                  Select an existing educator
                                </label>
                                <DropDownList
                                  value={selectedEducator}
                                  handleOptionChange={(e) =>
                                    this.handleSelect(e)
                                  }
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
                              </div>
                            </div>
                          </div>

                          <div
                            className="row"
                            style={
                              this.state.isShowForm
                                ? { pointerEvents: "none", opacity: 0.3 }
                                : null
                            }
                          >
                            <div className="col-lg-12 col-md-12">
                              <div className="form-group form-group-wt-label2">
                                <label
                                  className="label small-text-label"
                                  for=""
                                >
                                  Or, invite a new educator to your class
                                </label>
                                <div className="input-div">
                                  <InputComponent
                                    inputType="text"
                                    inputClassName="form-control"
                                    inputPlaceholder="Name"
                                    maxLength="30"
                                    inputID="your-name-acc"
                                    inputName="professor_name"
                                    // onChange={this.handleFieldChange}
                                    handleInpBlur={this.handleFieldChange}
                                    onInputChange={this.handleErrorMessage}
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
                                    handleInpBlur={this.handleFieldChange}
                                    onInputChange={this.handleErrorMessage}
                                  />
                                  {/* {formError.email_error ? (
                                    <div className="info-text error-text">
                                      <p className="error-p">
                                        {formError.email_message}
                                      </p>
                                    </div>
                                  ) : null} */}
                                  {/* {common_error !== "" ? (
                                    <div className="info-text error-text">
                                      <p className="error-p">{common_error}</p>
                                    </div>
                                  ) : null} */}
                                  { this.state.isShowDropDown && invite_edu_error !== "" ? (
                                    <div className="info-text error-text">
                                      <p className="error-p">
                                        {invite_edu_error}
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
                  </div>
                </div>

                <div className="common-admin-db-new-bottom">
                  <div className="common-admin-db-new-bottom-row">
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <div className="button-row button-row-add-school">
                          <div className="center-side-button">
                            {this.state.isMailSent ? (
                              <div>
                                <button className="btn btn-common-outline btn-primary2 btn-send-invite-ae btn-send-invite-ae-success disabled-02">
                                  Sent!
                                </button>
                                <div className="message-text-div">
                                  <p>An email invite has been sent!</p>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <button
                                  className="btn btn-common-primary btn-primary-width240"
                                  onClick={this.submitForm}
                                  disabled={this.state.isDisabledSave}
                                >
                                  Save
                                </button>
                              </div>
                            )}
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

export default AddEducator;
