/* eslint-disable no-multi-str */
import React, { Component } from "react";
import { Modal } from "react-bootstrap";

class RemoveStudentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenConfirmModal: props.isOpenConfirmModal
        ? props.isOpenConfirmModal
        : false,
    };
  }

  handleOpenConfirmModal = () => {
    this.setState({ isOpenConfirmModal: true });
  };

  removeStudent = (isRemove, isDelete) => {
    this.props.onClose(isRemove, isDelete);
  };

  render() {
    return (
      <>
        {this.state.isOpenConfirmModal ? (
          <Modal
            size="lg"
            className="modal modal-custom modal-custom-new fade yh_confirmation_modal"
            id="remove-confirmation2"
            show={this.props.show}
            onHide={this.props.onClose}
            centered
          >
            <div className="modal-lg modal-dialog-centered">
              <div className="modal-content">
                <Modal.Body>
                  <div className="yh_removeConfirmation_modal">
                    <div className="yh_removeConfirmation_content">
                      <h3>
                        Would you like to permanently delete all logs for this
                        student?
                      </h3>
                      <h5>You can always email us to delete data later.</h5>
                    </div>
                    <div className="yh_removeConfirmation_btnGroup">
                      <button
                        type="button"
                        className="removeConfirmation_btn"
                        onClick={() => this.removeStudent(true, false)}
                      >
                        No, keep logs.<br /> Just delete student from my class.
                      </button>
                      <button
                        type="button"
                        className="removeConfirmation_btn btnRed"
                        onClick={() => this.removeStudent(true, true)}
                      >
                        Yes, delete logs and <br /> remove student from my class.
                      </button>
                    </div>
                  </div>
                </Modal.Body>
              </div>
            </div>
          </Modal>
        ) : (
          <Modal
            size="lg"
            className="modal modal-custom modal-custom-new fade yh_confirmation_modal"
            id="remove-confirmation1"
            show={this.props.show}
            onHide={this.props.onClose}
            centered
          >
            <div className="modal-lg modal-dialog-centered">
              <div className="modal-content">
                <Modal.Body className="modal-body">
                  <div className="yh_removeConfirmation_modal">
                    <div className="yh_removeConfirmation_content">
                      <h3>Are you sure you want to remove this student?</h3>
                      <h5>This action cannot be undone.</h5>
                    </div>
                    <div className="yh_removeConfirmation_btnGroup">
                      <button
                        type="button"
                        className="removeConfirmation_btn"
                        onClick={this.props.onClose}
                      >
                        No, keep.
                      </button>
                      <button
                        type="button"
                        className="removeConfirmation_btn btnRed"
                        onClick={this.handleOpenConfirmModal}
                      >
                        Yes, remove.
                      </button>
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

export default RemoveStudentModal;
