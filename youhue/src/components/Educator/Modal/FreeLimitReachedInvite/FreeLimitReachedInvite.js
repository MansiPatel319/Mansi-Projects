import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import BecomeASchoolAdminModal from "../BecomeASchoolAdmin/BecomeASchoolAdmin";
import InviteSomeoneElseModal from "../../../../containers/Educator/Modal/InviteSomeone";

import "./FreeLimitReachedInvite.scss";

class FreeLimitReachedInvite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenBecomeSchoolAdminModal: false,
      isOpenInviteSomeoneElseModal: false,
      
    };
  }
  handleOpenBecomeASchoolAdminModal = () => {
    this.setState({ isOpenBecomeASchoolAdminModal: true });
  };
  isOpenBecomeASchoolAdminModal = () => {
    this.setState({ isOpenBecomeASchoolAdminModal: false });
  };
  becomeASchoolAdmin = () => {
    this.becomeSchoolAdmin();
  };
  handleOpenInviteSomeoneElseModal = () => {
    this.setState({ isOpenInviteSomeoneElseModal: true });
  };
  isOpenInviteSomeoneModal = () => {
    this.props.onClose()
    this.setState({ isOpenInviteSomeoneElseModal: false, isOpenBecomeASchoolAdminModal: false });
  };

  becomeSchoolAdmin = () => {
    this.props
      .becomeSchoolAdmin()
      .then((res) => {
        if (res.status) {
          // this.props.addToast(res.message, {
          //   appearance: "success",
          //   autoDismiss: true,
          // });
          this.setState({
            isOpenBecomeASchoolAdminModal: false,
            
          });
          this.props.onClose();
        } else {
          // this.props.addToast(res.message, {
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
    return (
      <>
        <Modal
          className="modal modal-custom modal-custom-new fade"
          id="free-limit-reached-modal"
          centered
          size="lg"
          show={this.props.show}
          onHide={this.props.onClose}
        >
          <div className="modal-lg modal-dialog-centered">
            <div className="modal-content br-0">
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
                <div className="edit-form-school-card-root edit-school-card-root01">
                  <div className="yh_limitModal_title">
                    <h3>
                      You can continue using YouHue by assigning a school admin.
                    </h3>
                  </div>
                  <div className="yh_pricingPlan_body">
                    <div className="yh_pricingPlan_roles">
                      <h3>Role of a school admin</h3>
                      <ul>
                        <li>
                          Point of contact with the YouHue team to manage
                          payments
                        </li>
                        <li>
                          Verify other educators requesting to join your school
                        </li>
                        <li>Edit school information</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="yh_modal_btnWrapper">
                  <div className="yh_btBlock">
                    <button
                      type="button"
                      className="btn btn-common-primary btn-primary-width240"
                      onClick={this.handleOpenBecomeASchoolAdminModal}
                    >
                      Become school admin
                    </button>
                  </div>
                  <div className="yh_btBlock">
                    <button
                      type="button"
                      className="btn btn-common-primary btn-primary-width240"
                      onClick={this.handleOpenInviteSomeoneElseModal}
                    >
                      Invite someone else
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        {this.state.isOpenBecomeASchoolAdminModal ? (
          <BecomeASchoolAdminModal
            show={this.state.isOpenBecomeASchoolAdminModal}
            onClose={this.isOpenBecomeASchoolAdminModal}
            becomeAdmin={this.becomeASchoolAdmin}
            props={this.props}
          />
        ) : null}
        {this.state.isOpenInviteSomeoneElseModal ? (
          <InviteSomeoneElseModal
            show={this.state.isOpenInviteSomeoneElseModal}
            onClose={this.isOpenInviteSomeoneModal}
            props={this.props}
           
          />
        ) : null}
      </>
    );
  }
}

export default FreeLimitReachedInvite;
