import React, { Component } from "react";
import { Modal } from "react-bootstrap";

class UnveifiedLimitReachedModal extends Component {
  render() {
    return (
      <>
        <Modal
          size="sm"
          className="modal modal-custom modal-custom-new fade unverified-modal"
          id="add-a-class-modal"
          show
          
          centered
        >
          <div className="modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header unverifiedmodal" style={{ border: 0 }}>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  onClick={this.props.onClose}
                  // style={{marginRight:0}}
                >
                  <span className="custom-icon cancel-new-icon-01"></span>
                </button>
              </div>

              <div className="modal-body">
                <div className="yh_limitModal_title">
                  <h3>You have reached the free trial limit of 100 students</h3>
                  <p>
                    You will be able to add more students once you have been
                    verifeid as and educator at you school
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

export default UnveifiedLimitReachedModal;
