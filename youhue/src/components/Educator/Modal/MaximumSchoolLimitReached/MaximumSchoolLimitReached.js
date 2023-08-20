import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import limitReachedIcon from "../../../../assets/images/studentLimitReached.png";

class MaximumSchoolLimitReached extends Component {
  render() {
    return (
      <>
        <Modal
          className="modal modal-custom modal-custom-new fade studentLimitReached_modal"
          id="studentLimitReached1"
          centered
          show
        >
          <div className="modal-dialog modal-xl  modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" style={this.props.message&&{right:'22px'}} onClick={()=>this.props.handleClose()}>
                  <span className="custom-icon cancel-new-icon-01"></span>
                </button>
                <div className="heading-title-div">
                  <h2 className="modal-title">
                    Oops! Your school has reached the maximum student limit.
                  </h2>
                </div>
              </div>

              <div className="modal-body">
                <div className="yh_studentLimitReached_modal">
                  <div className="yh_studentLimitReached_modalBody">
                    <h3 className="mb-5">
                     {this.props.message || "This means that you won’t be able to add more students in your class. "}
                      
                    </h3>
                    <div className="studentLimitReached_image mb-5">
                      <img src={limitReachedIcon} alt="image" />
                    </div>
                    <h3>
                      Please get in touch with your school admin or directly
                      contact us at <br /> support@youhue.com for us to find the
                      best way to support you or <br /> to upgrade your school
                      to the next category.
                    </h3>
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

export default MaximumSchoolLimitReached;
