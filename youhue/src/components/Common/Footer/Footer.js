import React from "react";
import { Link } from "react-router-dom";
import appStore from "../../../assets/images/app-store-badge-us-black.svg";
import googlePlay from "../../../assets/images/google-play-badge-us.svg";

import "./Footer.scss";

class Footer extends React.Component {
  render() {
    return (
      <footer>
        {this.props.isLoggedIn ? (
          <div className="footer-root">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <div className="footer-top">
                    <div className="footer-top-row">
                      <div className="row">
                        <div className="col-lg-4 col-md-4">
                          <div className="footer-top-box footer-box-top-01">
                            <div className="top-footer-heading">
                              <h3>ABOUT US</h3>
                            </div>
                            <div className="top-footer-body">
                              <ul className="ul-list-common">
                                <li>
                                  <a
                                    href="https://youhue.com/aboutus/"
                                    className="footer-link"
                                    target="_blank">
                                    About YouHue
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="https://youhue.com/help/"
                                    className="footer-link"
                                    target="_blank">
                                    Help Center
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="https://youhue.com/contactus/"
                                    className="footer-link"
                                    target="_blank">

                                    Contact Us
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-4 col-md-4">
                          <div className="footer-top-box footer-box-top-02">
                            <div className="top-footer-heading">
                              <a
                                href="https://youhue.com/"
                                target="_blank"
                                className="link">
                                <h3>WWW.YOUHUE.COM</h3>
                              </a>
                            </div>
                            <div className="top-footer-body">
                              <ul className="social-list-common">
                                <li>
                                  <a
                                    href="https://www.instagram.com/youhue/"
                                    target="_blank"
                                    className="social-link">
                                    <span className="social-custom-icon instagram-icon"></span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="https://twitter.com/youhueapp"
                                    target="_blank"
                                    className="social-link">
                                    <span className="social-custom-icon twitter-icon"></span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="https://www.facebook.com/youhueapp/"
                                    target="_blank"
                                    className="social-link">
                                    <span className="social-custom-icon facebook-icon"></span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="https://www.linkedin.com/company/youhue/"
                                    target="_blank"
                                    className="social-link">
                                    <span className="social-custom-icon linkedin-icon"></span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-4 col-md-4">
                          <div className="footer-top-box footer-box-top-02">
                            <div className="top-footer-heading">
                              <h3>GET THE APP</h3>
                            </div>
                            <div className="top-footer-body">
                              <div className="app-store-div">
                                <ul className="app-store-ul">
                                  <li>
                                    <a
                                      target="_blank"
                                      href="https://apps.apple.com/us/app/youhue/id1589233351"
                                      className="app-store-icon">
                                      <img
                                        src={appStore}
                                        className="img-fluid"
                                        alt="app-store"
                                      />
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      target="_blank"
                                      href="https://play.google.com/store/apps/details?id=com.youhue.code"
                                      className="app-store-icon">
                                      <img
                                        src={googlePlay}
                                        className="img-fluid"
                                        alt="google-play"
                                      />
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <div className="footer-bottom">
                    <div className="footer-bottom-row">
                      <ul className="link-ul-list">
                        <li>
                          &copy; {new Date().getFullYear()}
                          <span className="link-footer"> YouHue FZ-LLC</span>
                        </li>
                        <li>
                          <a
                            href="https://youhue.com/privacy/"
                            target="_blank"
                            className="link-footer">
                            Privacy Policy
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://youhue.com/terms/"
                            target="_blank"
                            className="link-footer">
                            Terms of Service
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={
              this.props.isLogin ? "footer-root footer-login" : "footer-root"
            }>
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <div className="footer-bottom">
                    <div className="footer-bottom-row">
                      <ul className="link-ul-list">
                        <li>
                          © {new Date().getFullYear()}&nbsp;
                          <Link to="#" className="link-footer">
                            YouHue FZ-LLC
                          </Link>
                        </li>
                        <li>
                          <a
                            href="https://youhue.com/privacy/"
                            target="_blank"
                            className="link-footer">
                            Privacy Policy
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://youhue.com/terms/"
                            target="_blank"
                            className="link-footer">
                            Terms of Service
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </footer>
    );
  }
}

export default Footer;
