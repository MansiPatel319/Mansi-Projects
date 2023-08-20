import React from "react";
import { Link } from "react-router-dom";

import HeaderContainer from "../../../containers/Common/Header";
import FooterContainer from "../../../containers/Common/Footer";

import "./PrivacyPolicy.scss";

class PrivacyPolicy extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      checked_error: false,
    };
  }

  handleChange = (checked) => {
    this.setState({
      checked: !checked,
      checked_error: false,
    });
  };

  agreeTerms = () => {
    const { checked } = this.state;
    const { history } = this.props;

    if (checked) {
      history.replace("/signup");
    } else {
      this.setState({
        checked_error: true,
      });
    }
  };

  goBack = () => {
    const { history } = this.props;
    history.replace("/signup");
  };

  render() {
    // const { checked, checked_error } = this.state;
    return (
      <div className="general-account-section">
        <div className="general-account-div bg-image-common2">
          <HeaderContainer />
          <div className="main-page-root">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <div className="general-account-root general-ps-root">
                    <div className="full-account-div full-ps-div">
                      <div className="general-title">
                        <div className="center-text-block">
                          <h2>Privacy & Security</h2>
                        </div>
                      </div>

                      <div className="general-content-common-div">
                        <div className="row">
                          <div className="col-lg-12 col-md-12">
                            <div className="content-common-div-box">
                              <p>
                                At YouHue, our mission is to empower every child
                                to understand how they feel and how to
                                communicate that to their community.
                              </p>
                              <p>
                                While doing that, our team works very hard to
                                stay at the forefront of privacy and security
                                best practices so you can feel confident that
                                your students are using a healthy and
                                responsible technology.
                              </p>

                              <div className="content-primary-card">
                                <ul>
                                  <li>
                                    We use the personal information we collect
                                    for the sole purpose of providing and
                                    improving the service.
                                  </li>
                                  <li>
                                    We will not retain student or educator
                                    personal information for any longer than is
                                    necessary to provide the service.
                                  </li>
                                  <li>
                                    We don’t own any content or information you
                                    provide or we receive.
                                  </li>
                                  <li>
                                    We will never sell or rent your personal
                                    information to any third-parties.
                                  </li>
                                  <li>
                                    We use security industry best practices to
                                    protect personal information.
                                  </li>
                                </ul>
                              </div>

                              <p>
                                In addition, please read the&nbsp;
                                <Link to="#" className="link">
                                  Data Privacy Agreement
                                </Link>
                                &nbsp;which is an agreement between YouHue and your
                                school, and describes the duties and
                                responsibilities to protect Student Data
                                transmitted to YouHue.
                              </p>

                              {/* <div className="checkbox-list-row pt-25">
                                <div className="custom-checkbox-common">
                                  <label
                                    className={`check-label ${
                                      checked_error ? "error" : ""
                                    }`}
                                    htmlFor="ps-check"
                                  >
                                    <input
                                      type="checkbox"
                                      id="ps-check"
                                      name="ps-check"
                                      checked={checked}
                                      onChange={() =>
                                        this.handleChange(checked)
                                      }
                                    />
                                    By clicking continue, you agree to YouHue’s
                                    <Link to="#" className="link">
                                      Data Privacy Agreement
                                    </Link>
                                    ,
                                    <Link to="#" className="link">
                                      Terms of Service
                                    </Link>
                                    and
                                    <Link to="#" className="link">
                                      Privacy Policy
                                    </Link>
                                    .
                                  </label>
                                </div>
                              </div> */}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="form-div form-button-common-div">
                        <div className="row">
                          <div className="col-lg-12 col-md-12">
                            <div className="button-row center-button-row">
                              <div className="right-side-button">
                                {/* <button
                                  className="btn btn-common-outline btn-primary2"
                                  onClick={this.agreeTerms}
                                >
                                  Continue
                                </button> */}
                                <button
                                  className="btn btn-common-outline btn-primary2"
                                  onClick={this.goBack}
                                >
                                  Back
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
      </div>
    );
  }
}

export default PrivacyPolicy;
