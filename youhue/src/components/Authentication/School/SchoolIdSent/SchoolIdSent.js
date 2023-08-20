import React from "react";
import HeaderContainer from "../../../../containers/Common/Header";
import FooterContainer from "../../../../containers/Common/Footer";
import Character3 from "../../../../assets/images/character/character-03.png";

import "./SchoolIdSent.scss";
import { Link } from "react-router-dom";

class SchoolIdSent extends React.Component {
  render() {
    return (
      <div id="wrapper" className="wrapper">
        <div className="main-middle-area">
          <section className="general-account-section">
            <div className="general-account-div bg-image-common2">
              <HeaderContainer />
              <div className="main-page-root">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <div className="general-account-root edu-verfication-link-div">
                        <div className="full-account-div full-account-border-div">
                          <div className="general-title color-general-title01">
                            <div className="center-text-block">
                              <h3>School ID sent!</h3>
                            </div>

                            <hr className="custom-hr01 mt-0" />
                          </div>

                          <div className="ev-join-school-flex">
                            <div className="form-custom-div">
                              <div className="row">
                                <div className="col-lg-12 col-md-12">
                                  <div className="ev-join-sending-div">
                                    <div className="tc-content-general-box tc-content-general-box-top">
                                      <p>
                                        Thank you for sending us your school ID.
                                        We will review it and verify you within
                                        48 hours.
                                      </p>
                                    </div>

                                    <div className="chr-div">
                                      <div className="img-div">
                                        <img
                                          src={Character3}
                                          className="img-fluid"
                                          alt="chr"
                                        />
                                      </div>
                                    </div>

                                    <div className="tc-content-general-box tc-content-general-box-bottom">
                                      <p>
                                        In the meantime, you can continue using
                                        YouHue!
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
              <FooterContainer />
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default SchoolIdSent;
