/* eslint-disable no-multi-str */
import React, { Component } from "react";
import { Modal } from "react-bootstrap";

class RemoveStudentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLastEducator: props.isOpenLastEducatorModal
        ? props.isOpenLastEducatorModal
        : false,
    };
  }

  removeEducator = (isRemove) => {
    this.props.onClose(isRemove);
  };

  render() {
    return (
      <>
        {this.state.isLastEducator ? (
          <Modal
            className="modal modal-custom modal-dialog-custom modal-dialog-center remove-educators-modal fade"
            id="cannot-remove-educators-modal"
            centered
            show={this.props.show}
            onHide={this.props.onClose}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="dialog-message-card-root">
                    <div className="dialog-message-card">
                      <div className="dialog-message-header">
                        <button
                          type="button"
                          className="close close-tp-right"
                          onClick={this.props.onClose}
                        >
                          <span className="custom-icon cancel-new-icon-01"></span>
                        </button>
                        <h4>
                          <span className="span-block">
                            You cannot remove this educator until another has
                            been confirmed.
                          </span>
                        </h4>
                        <div className="desc-div">
                          <p>A class must have one educator at All Times.</p>
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
            className="modal modal-custom modal-dialog-custom modal-dialog-center remove-educators-modal fade"
            id="remove-educators-modal"
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
                            Are you sure you want to remove this educator?
                          </span>
                        </h4>
                        <div className="desc-div">
                          <p>This action cannot be undone.</p>
                        </div>
                      </div>
                      <div className="dialog-message-body">
                        <div className="dialog-button-row">
                          <div className="left-side-button">
                            <button
                              className="btn btn-common-outline btn-primary2 btn-keep-es no-keep-btn"
                              onClick={this.props.onClose}
                            >
                              No, keep.
                            </button>
                          </div>
                          <div className="right-side-button content-side-button">
                            <button
                              className="btn btn-common-outline btn-primary3 btn-remove-es"
                              id="yes-remove-edu-btn"
                              onClick={() => this.props.onClose(true)}
                            >
                              Yes, remove.
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
        )}
      </>
    );
  }
}

export default RemoveStudentModal;
