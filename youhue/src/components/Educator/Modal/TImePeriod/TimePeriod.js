/* eslint-disable no-multi-str */
import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { isValidEmailAddress } from "../../../../utils/validators";
import InputComponent from "../../../UI/InputComponent";

class TimePeriod extends Component {
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
        <Modal
        className="modal modal-custom modal-dialog-custom modal-dialog-center remove-educators-modal fade"
        id="email-student-ins-confirmation-modal"
        show={this.props.show}
        onHide={this.props.onClose}
        centered
        >
            <div className="time_period_popup">
                <div className="time_period_popup_inner">
                    <h6>View moods by time</h6>
                <div className="time_period_input">
                    <label for="">from</label>
                    <input type="text" placeholder="HH" />
                    <span>:</span>
                    <input type="text" placeholder="MM" />
                    <div className="tp_radio">
                    <input type="radio" id="am" name="radio" />
                    <label for="am" className="tp_lbl">am</label>
                    <input type="radio" id="pm" name="radio" />
                    <label for="pm" className="tp_lbl">pm</label>
                    </div>
                </div>
                <div className="time_period_input">
                    <label for="">To</label>
                    <input type="text" placeholder="HH" />
                    <span>:</span>
                    <input type="text" placeholder="MM" />
                    <div className="tp_radio">
                    <input type="radio" id="am2" name="radio" />
                    <label for="am2" className="tp_lbl">am</label>
                    <input type="radio" id="pm2" name="radio" />
                    <label for="pm2" className="tp_lbl">pm</label>
                    </div>
                </div>
                </div>
                <ul className="tp_btns">
                    <li><a href="">cancel</a></li>
                    <li><a href="" className="cancel">apply</a></li>
                </ul>
            </div>
        </Modal>
      </>
    );
  }
}

export default TimePeriod;


