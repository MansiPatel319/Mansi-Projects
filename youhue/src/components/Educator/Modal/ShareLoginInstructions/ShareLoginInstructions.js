/* eslint-disable no-multi-str */
import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { isValidEmailAddress } from "../../../../utils/validators";
import InputComponent from "../../../UI/InputComponent";

class ShareLoginInstructions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSendInstructionsConfirmModal: props.isSendInstructionsConfirmModal
        ? props.isSendInstructionsConfirmModal
        : false,
      formData: {
        name: "",
      },
      formError: {
        name_error: false,
        name_message: "",
      },
      isDisabledSend: true
    };
  }

  handleOpenConfirmModal = () => {
    this.setState({ isSendInstructionsConfirmModal: true });
  };
  validateForm = (data) => {
    let isFormValid = true;
    const formError = { ...this.state.formError };
    if (data.name.trim() === "") {
      formError.name_error = true;
      formError.name_message = "Please enter an email ID.";
      isFormValid = false;
    } 
    else if (!isValidEmailAddress(data.name)) {
      formError.name_error = true;
      formError.name_message = "Please enter a valid email ID.";
      isFormValid = false;
    } 
    else {
      formError.name_error = false;
      formError.name_message = "";
    }
    this.setState({ formError });
    return isFormValid;
  };

  handleChangedField = (name, value) => {
    const formError = { ...this.state.formError };
    if (name === "name") {
      formError[`${name}_error`] = true;
      this.setState({isDisabledSend: false})
      if (value.trim() === "") {
        this.setState({isDisabledSend: true})
        formError[`${name}_message`] = "Please enter an email ID.";
      } else if (!isValidEmailAddress(value)) {
        this.setState({isDisabledSend: true})
        formError[`${name}_message`] = "Please enter a valid email ID.";
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
  };

  submitForm = () => {
    const { formData } = this.state;
    const isValid = this.validateForm(formData);
    if (isValid) {
      this.handleOpenConfirmModal();
    }
  };

  handleConfirmSend = () => {
    const { formData, formError } = this.state;
    const { educator } = this.props.props;
    const params = new FormData();
    params.append("email", formData.name);
    params.append("class", educator.classDetailData.id);
    params.append("student_id", educator.studentDetailData.id);
    this.props.props
      .shareLoginInstructions(params)
      .then(async (res) => {
        if (res.status) {
          this.setState({ isSendInstructionsConfirmModal: false });
          this.props.onClose();
          // this.props.props.addToast(res.message, {
          //   appearance: "success",
          //   autoDismiss: true,
          // });
        } else if (res.code === 400) {
          formError.name_error = true;
          formError.name_message = res.message;
          this.setState({ formError });
        } else {
          // this.props.props.addToast(res.message, {
          //   appearance: "error",
          //   autoDismiss: true,
          // });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { formError } = this.state;
    return (
      <>
        {this.state.isSendInstructionsConfirmModal ? (
          <Modal
            className="modal modal-custom modal-dialog-custom modal-dialog-center remove-educators-modal fade"
            id="email-student-ins-confirmation-modal"
            show={this.props.show}
            onHide={this.props.onClose}
            centered
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="dialog-message-card-root">
                    <div className="dialog-message-card">
                      <div className="dialog-message-header">
                        <h4>
                          {" "}
                          <span className="span-block">
                            Are you sure you want to send login instructions
                            to&nbsp;
                            {this.state.formData.name}?
                          </span>
                        </h4>
                        <div className="desc-div">
                          <p>This email contains sensitive information.</p>
                        </div>
                      </div>

                      <div className="dialog-message-body">
                        <div className="dialog-button-row">
                          <div className="left-side-button">
                            <button
                              className="btn btn-common-outline btn-primary2 btn-keep-es yes-btn"
                              onClick={this.handleConfirmSend}
                            >
                              Yes
                            </button>
                          </div>
                          <div className="right-side-button content-side-button">
                            <button
                              className="btn btn-common-outline btn-primary3 btn-remove-es"
                              id="go-back-edu-btn"
                              data-dismiss="modal"
                              onClick={this.props.onClose}
                            >
                              Go back
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        ) : (
          <Modal
            size="lg"
            className="modal modal-custom modal-custom-new fade"
            id="share-login-instructions-modal"
            show={this.props.show}
            onHide={this.props.onClose}
            centered
          >
            <div className="modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    onClick={this.props.onClose}
                  >
                    <span className="custom-icon cancel-new-icon-01"></span>
                  </button>
                  <div className="heading-title-div">
                    <h2 className="modal-title">Share login instructions</h2>
                  </div>
                </div>
                <Modal.Body>
                  <div className="edit-form-school-card-root share-login-instructions-root">
                    <div className="form-custom-div form-custom-400-div form-custom-select-div">
                      <div className="row">
                        <div className="col-lg-12 col-md-12">
                          <div className="form-group form-group-wt-label2">
                            <label className="label small-text-label" for="">
                              Send login instructions to your student or their
                              parents
                            </label>
                            <div className="input-div">
                              <InputComponent
                                inputType="email"
                                inputClassName="form-control"
                                inputPlaceholder="Email"
                                inputName="name"
                                onInputChange={this.handleFieldChange}
                              />
                              {/* {formError.name_error ? (
                                <div className="info-text error-text">
                                  <p className="error-p">
                                    {formError.name_message}
                                  </p>
                                </div>
                              ) : null} */}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-12 col-md-12">
                          <div className="button-row button-row-add-school">
                            <div className="center-side-button">
                              <button
                                className="btn btn-common-primary btn-primary-width240"
                                href="#email-student-ins-confirmation-modal"
                                data-toggle="modal"
                                data-target="#email-student-ins-confirmation-modal"
                                data-dismiss="modal"
                                onClick={this.submitForm}
                                disabled={this.state.isDisabledSend}
                                // onClick={this.handleOpenConfirmModal}
                              >
                                Send instructions
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal.Body>
              </div>
            </div>
          </Modal>
        )}
      </>
    );
  }
}

export default ShareLoginInstructions;
