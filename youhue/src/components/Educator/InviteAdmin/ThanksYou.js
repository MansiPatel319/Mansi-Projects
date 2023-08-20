import React, { Component } from "react";
import HeaderContainer from "../../../containers/Common/Header";
import FooterContainer from "../../../containers/Common/Footer";
import { Link } from "react-router-dom";
import verify_admin from "../../../assets/images/verify_admin.png";

class ThanksYou extends Component {
  render() {
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
                        <div className="general-account-root edu-verfication-link-div admin-verification-div">
                          <div className="full-account-div full-account-border-div">
                            <div className="ev-join-school-flex ev-join-school-flex-height">
                              <div className="general-title color-general-title01">
                                <div className="center-text-block">
                                  <h3>Thank you!</h3>
                                </div>
                              </div>

                              <div className="form-custom-div form-custom-600-div">
                                <div className="row">
                                  <div className="col-lg-12 col-md-12">
                                    <div className="tc-content-general-box mb-5">
                                      <p>
                                        Your document has been received. <br />
                                        We will review it and verify you within
                                        48 hours.
                                      </p>
                                    </div>
                                  </div>
                                  <div className="col-lg-12 col-md-12">
                                    <div className="yh_verify_adminIcon mb-4">
                                      <div className="yh_verify_iconBlock text-center">
                                        <img
                                          src={verify_admin}
                                          alt="verify_admin"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-12 col-md-12">
                                    <div className="ev-join-school-div">
                                      <div className="button-row pt-15">
                                        <div className="center-side-button">
                                          <div className="custom-file custom-file-btn">
                                            <Link
                                              to="/educator/home/"
                                              className="btn btn-common-primary btn-common-primary-link btn-primary-width240"
                                              for="customFile"
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

                            <div className="ev-join-school-bottom-div ev-join-school-bottom-div02">
                              <div className="text-end-div">
                                <p>
                                  If you have any questions, please email us at{" "}
                                  <Link
                                    to="mailto:help@youhue.com"
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

                <FooterContainer isLoggedIn={true} />
              </div>
            </section>
          </div>
        </div>
      </>
    );
  }
}

export default ThanksYou;
