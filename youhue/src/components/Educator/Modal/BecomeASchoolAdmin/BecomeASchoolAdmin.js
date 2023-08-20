import React, { Component } from "react";
import { Modal } from "react-bootstrap";

import "./BecomeASchoolAdmin.scss";

class AddClassModal extends Component {
  constructor(props) {
    super(props);
    this.state = { plan: this.plan };
  }

  plan = {
    plan_details: [
      {
        id: 1,
        min_stu: "101-",
        max_stu: "250",
        price: "1,500",
      },
      {
        id: 2,
        min_stu: "251-",
        max_stu: "500",
        price: "2,500",
      },
      {
        id: 3,
        min_stu: "501-",
        max_stu: "1000",
        price: "3,750",
      },
      {
        id: 4,
        min_stu: "1000+",
        max_stu: "",
        price: "4,500",
      },
    ],
  };

  render() {
    const { plan_details } = this.state.plan;
    return (
      <>
        <Modal
          size="lg"
          className="modal modal-custom modal-custom-new fade"
          id="free-limit-reached-modal-school-admin"
          show={this.props.show}
          onHide={this.props.close}
          centered
        >
          <div className="modal-lg modal-dialog-centered">
            <div className="modal-content">
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
                  <h2 className="modal-title" style={{color:'#3f3f44'}}>Become school admin</h2>
                </div>
              </div>

              <div className="modal-body">
                <div className="edit-form-school-card-root">
                  <div className="yh_limitModal_title">
                    <h3>Pricing Plan (per academic year)</h3>
                  </div>
                  <div className="yh_pricingPlan_detailWrapper">
                    <div className="yh_pricingPlan_section">
                      <div className="row">
                        {this.state.plan
                          ? plan_details.map((data) => {
                              return (
                                <div className="col-lg-3 col-md-3">
                                  <div className="yh_pricingPlan_block">
                                    <div className="yh_pricingPlan_top">
                                      <h3>
                                        {data.min_stu}
                                        {data.max_stu}
                                      </h3>
                                      <h5>students</h5>
                                    </div>
                                    <div className="yh_pricingPlan_bottom">
                                      <h2>${data.price}</h2>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          : ""}
                      </div>
                    </div>
                  </div>
                  <div className="yh_textBlock">
                    <p>
                      * You will continue to use YouHue for free. We will get in
                      touch regarding payment.
                    </p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="yh_modal_btnWrapper yh_center_btnWrapper">
                  <div className="yh_btBlock ">
                    <button
                      type="button"
                      className="btn btn-common-primary btn-primary-width240"
                      onClick={this.props.becomeAdmin}
                    >
                      Become school admin
                    </button>
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

export default AddClassModal;
