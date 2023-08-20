import React, { Component } from "react";
import "./BecomeASchoolAdminFirstTime.scss";

import HeaderContainer from "../../../containers/Common/Header";
import FooterContainer from "../../../containers/Common/Footer";
import { Link } from "react-router-dom";

class BecomeASchoolAdminFirstTime extends Component {
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
        <div id="wrapper" className="wrapper">
          <div className="main-middle-area">
            <section className="general-account-section">
              <div className="general-account-div bg-image-common2">
                <HeaderContainer isLoggedIn={true} />

                <div className="main-page-root">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <div className="general-account-root find-school-link-div">
                          <div className="full-account-div full-account-border-div">
                            <div className="general-title color-general-title01">
                              <div className="center-text-block">
                                <h3>Welcome to YouHue!</h3>
                              </div>

                              <hr className="custom-hr01 mt-0" />
                            </div>
                            <div className="yh_pricingPlan_body">
                              <div className="yh_pricingPlan_roles">
                                <h3>Role of a school admin</h3>
                                <ul>
                                  <li>
                                    Point of contact with the YouHue team to
                                    manage payments
                                  </li>
                                  <li>
                                    Verify other educators requesting to join
                                    your school
                                  </li>
                                  <li>Edit school information</li>
                                </ul>
                              </div>
                              <div className="yh_pricingPlan_detailWrapper">
                                <h3>Pricing Plan (per academic year)</h3>
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
                                      : ""}{" "}
                                  </div>
                                </div>
                                <p>
                                  * You will continue to use YouHue for free. We
                                  will get in touch regarding payment.
                                </p>
                              </div>
                              <div className="yh_submitBtn_wrapper">
                                <Link
                                  to="/upload-docs/"
                                  className="btn btn-common-primary btn-common-primary-link btn-primary-width240"
                                  id="oncheck-school-admin-btn"
                                >
                                  Continue
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <FooterContainer isLoggedIn={true} />
              </div>
            </section>
          </div>
        </div>
      </>
    );
  }
}

export default BecomeASchoolAdminFirstTime;
