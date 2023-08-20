import React from "react";
import { Link } from "react-router-dom";
import HeaderContainer from "../../../../containers/Common/Header";
import FooterContainer from "../../../../containers/Common/Footer";

import "./VerifyEmail.scss";

class VerifyEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem("email"),
      // btncolor: {},
    };
  }
  handlechaclick() {
    let formData = new FormData();
    formData.append("email", this.state.email);
    this.props
      .sendResendemailLink(formData)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
    // this.setState({ btncolor: { backgroundColor: "#652d90", color: "white" } });
  }
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
                      <div className="general-account-root verify-email-account-root">
                        <div className="full-account-div full-account-border-div">
                          <div className="general-title">
                            <div className="center-text-block">
                              <h2>Check Your Email!</h2>
                            </div>

                            <div className="text-reset-group text-email-verification-group">
                              <div className="text-reset-group-box-inner">
                                <p>
                                  You're almost done! We just sent an email
                                  to&nbsp;
                                  {this.state.email} &nbsp;to verify your
                                  account. Please check your email and click the
                                  link to complete the verification process.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="form-custom-div form-custom-400-div">
                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <div className="tc-content-general-box">
                                  <p>Didn’t get an email?</p>
                                </div>

                                <div className="button-row pt-15">
                                  <div className="center-side-button">
                                    <button
                                      onClick={() => this.handlechaclick()}
                                      // style={{
                                      //   backgroundColor:
                                      //     this.state.btncolor.backgroundColor,
                                      //   color: this.state.btncolor.color,
                                      // }}
                                      className="btn btn-common-primary btn-common-primary-link btn-primary-width240"
                                    >
                                      Resend verification email
                                    </button>
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

export default VerifyEmail;
