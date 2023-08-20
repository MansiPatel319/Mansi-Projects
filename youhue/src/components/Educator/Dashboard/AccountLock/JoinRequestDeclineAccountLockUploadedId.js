import React, { Component } from "react";

import HeaderContainer from "../../../../containers/Common/Header";
import FooterContainer from "../../../../containers/Common/Footer";
import { Link } from "react-router-dom";
import character5 from "../../../../assets/images/character/character-05.svg";
import "./Lock.scss";

class JoinRequestDeclineAccountLockUploadedId extends Component {
  render() {
    return (
      <>
        <div id="wrapper" className="wrapper">
          <div className="main-middle-area dashboard-middle-area">
            <section className="general-dashboard-section bg-image-common">
              <div className="general-dashboard-div background-color-main">
                <HeaderContainer isLoggedIn={true} />

                <div className="body-main-new admin-home-view-main-div">
                  <div className="container-main-root">
                    <div className="container-inner-root">
                      <div className="yh-dashboard-mian-div">
                        <div className="container">
                          <div className="row">
                            <div className="col-lg-12 col-md-12">
                              <div className="yh-tab-header-div">
                                <div className="yh-tab-header-center-div">
                                  <ul className="tab-list-ul disabled">
                                    <li className="tab-item active">
                                      <Link
                                        // href="admin-dashboard.html"
                                        to="#"
                                        className="link"
                                      >
                                        {" "}
                                        Admin{" "}
                                      </Link>
                                    </li>
                                    <li className="tab-item">
                                      <Link
                                        // href="insight-admin-dashboard.html"
                                        to="#"
                                        className="link"
                                      >
                                        {" "}
                                        Insight{" "}
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              <div className="yh-tab-body-div">
                                <div className="general-account-root edu-verfication-link-div admin-lock-div">
                                  <div className="full-account-div full-account-border-div">
                                    <div className="ev-join-school-flex ev-join-school-flex-height">
                                      <div className="general-title color-general-title01">
                                        <div className="center-text-block">
                                          <h3>
                                            Oops! Your account has been
                                            temporarily locked.
                                          </h3>
                                        </div>
                                      </div>

                                      <div className="form-custom-div">
                                        <div className="row">
                                          <div className="col-lg-12 col-md-12">
                                            <div className="tc-content-general-box max-width-580 mb-40">
                                              <h3>
                                                Thank you for sending us your
                                                school ID!
                                                <span className="block">
                                                  We will review it and verify
                                                  you within 48 hours.
                                                </span>
                                              </h3>
                                            </div>
                                          </div>
                                          <div className="col-lg-12 col-md-12">
                                            <div className="yh_verify_adminIcon mb-40">
                                              <div className="yh_verify_iconBlock text-center">
                                                <img
                                                  src={character5}
                                                  className="img-fluid"
                                                  alt="img"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="ev-join-school-bottom-div ev-join-school-bottom-div02">
                                      <div className="text-end-div">
                                        <p>
                                          If you have any questions, please
                                          email us at{" "}
                                          <Link
                                            // href="mailto:help@youhue.com"
                                            to="#"
                                            className="link"
                                          >
                                            help@youhue.com
                                          </Link>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
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

export default JoinRequestDeclineAccountLockUploadedId;
