/* eslint-disable no-multi-str */
import React, { Component } from "react";
import { Modal } from "react-bootstrap";

class DeclineJoinRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Modal
          size="sm"
          className="modal modal-custom modal-custom-new fade yh_confirmation_modal"
          id="remove-confirmation2"
          show={this.props.show}
          onHide={this.props.onClose}
          centered
        >
          <div className="modal-dialog-centered">
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
                        <p>
                          They will be removed from all the classes in your
                          school.
                        </p>
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
                            onClick={this.props.decline}
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
      </>
    );
  }
}

export default DeclineJoinRequest;
