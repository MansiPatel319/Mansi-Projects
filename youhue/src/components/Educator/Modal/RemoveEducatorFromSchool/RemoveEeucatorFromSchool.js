import React, { Component } from "react";
import { Modal } from "react-bootstrap";

class RemoveEeucatorFromSchool extends Component {
  render() {
    return (
      <>
        <Modal
          className="modal modal-custom modal-dialog-custom modal-dialog-center remove-educators-modal fade"
          id="remove-educator-from-verified-confirmation-modal"
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
                          <button className="btn btn-common-outline btn-primary2 btn-keep-es no-keep-btn">
                            No, keep.
                          </button>
                        </div>
                        <div className="right-side-button content-side-button">
                          <button
                            className="btn btn-common-outline btn-primary3 btn-remove-es"
                            id="yes-remove-edu-btn"
                            data-dismiss="modal"
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

export default RemoveEeucatorFromSchool;
