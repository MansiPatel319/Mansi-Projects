import React, { Component } from "react";
import { Link } from "react-router-dom";

import app_store from "../../../assets/images/app-store-badge-us-black.svg";
import google_play_store from "../../../assets/images/google-play-badge-us.svg";

import ShareLoginInstructionsModal from "../../../containers/Educator/ShareLoginInstructions";

import "../../../styles/style.css";
import "../Dashboard/Dashboard.scss";
import "./ViewStudentLoginInstruction.scss";

class ViewStudentLoginInstruction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenShareLoginInsModal: false,
    };
  }

  handleOpenRemoveEducatorModal = () => {
    this.setState({ isOpenShareLoginInsModal: true });
  };

  isOpenShareLoginInsModal = () => {
    this.setState({ isOpenShareLoginInsModal: false });
  };
  handleSteps = (step) => {
    this.props.setAdminDashboardStepCount(step);
  };
  render() {
    const { educator}=this.props
    const to="/download/studentCode/"
    return (
      <>
        <div className="main-dashboard-body">
          <div className="row">
            <div className="col-lg-12">
              <div className="common-admin-db-new-div student-instr-admin-div">
                <div className="common-admin-db-new-row">
                  <div className="common-admin-db-new-top">
                    <div className="common-admin-db-new-top-row">
                      <div className="cancel-div">
                        <Link
                          to="#"
                          onClick={() => this.handleSteps(0)}
                          className="cancel-icon-button cancel-button">
                          {" "}
                          <span className="custom-icon cancel-round-icon"></span>{" "}
                        </Link>
                      </div>

                      <div className="title-div">
                        <h2>
                          {educator.studentDetailData.first_name}'s login
                          instructions
                        </h2>
                      </div>
                    </div>
                  </div>

                  <div className="common-admin-db-new-body">
                    <div className="common-admin-db-new-body-row">
                      <div className="instructions-root">
                        <div className="instructions-row">
                          <div className="instructions-left-div">
                            <div className="instructions-left-row-div">
                              <div className="instructions-step-div">
                                <div className="instructions-step-top-div">
                                  <h4>Step 1</h4>
                                  <h2>Access your class</h2>
                                </div>
                                <div className="instructions-step-body-div">
                                  <div className="view-access-code-card-root">
                                    <div className="row">
                                      <div className="col-lg-6 col-md-12">
                                        <div className="view-access-code-card view-access-code-card01">
                                          <div className="view-access-code-card-row">
                                            <div className="view-access-code-card-top">
                                              <div className="code-bx-div">
                                                <h2>
                                                  {
                                                    educator.classDetailData
                                                      .identifier
                                                  }
                                                </h2>
                                              </div>
                                            </div>

                                            <div className="view-access-code-card-middle">
                                              <div className="view-access-code-card-middle-left">
                                                <span className="span-icon">
                                                  <span className="custom-icon keyboard-icon-rounded"></span>
                                                </span>
                                              </div>
                                              <div className="view-access-code-card-middle-right">
                                                <div className="content-div">
                                                  <h4>Class Access Code</h4>
                                                  <p>
                                                    {" "}
                                                    <span className="block">
                                                      Log in by typing your{" "}
                                                    </span>
                                                    <span className="block">
                                                      10-digit class access
                                                      code.
                                                    </span>
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="col-lg-6 col-md-12">
                                        <div className="view-access-code-card view-access-code-card02">
                                          <div className="view-access-code-card-row">
                                            <div className="view-access-code-card-top">
                                              <div className="thumb-bx-div">
                                                <img
                                                  src={
                                                    educator.classDetailData
                                                      .qr_code
                                                  }
                                                  className="img-fluid img-qr"
                                                  alt="QR"
                                                />
                                              </div>
                                            </div>

                                            <div className="view-access-code-card-middle">
                                              <div className="view-access-code-card-middle-left">
                                                <span className="span-icon">
                                                  <span className="custom-icon qr-code-icon-rounded"></span>
                                                </span>
                                              </div>
                                              <div className="view-access-code-card-middle-right">
                                                <div className="content-div">
                                                  <h4>Class QR Code</h4>
                                                  <p>
                                                    {" "}
                                                    <span className="block">
                                                      Log in by scanning{" "}
                                                    </span>
                                                    <span className="block">
                                                      your class QR code.
                                                    </span>{" "}
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

                              <div className="instructions-step-div">
                                <div className="instructions-step-top-div">
                                  <h4>Step 2</h4>
                                  <h2>Access your student account</h2>
                                </div>
                                <div className="instructions-step-body-div">
                                  <div className="view-access-code-card-root">
                                    <div className="row">
                                      <div className="col-lg-12 col-md-12">
                                        <div className="view-access-code-card view-access-code-card03">
                                          <div className="view-access-code-card-row">
                                            <div className="view-access-code-card-top">
                                              <div className="code-bx-div">
                                                <h2>
                                                  {
                                                    educator.studentDetailData
                                                      .access_code
                                                  }
                                                </h2>
                                              </div>
                                            </div>

                                            <div className="view-access-code-card-middle">
                                              <div className="view-access-code-card-middle-left">
                                                <span className="span-icon">
                                                  <span className="custom-icon pass-code-icon-rounded"></span>
                                                </span>
                                              </div>
                                              <div className="view-access-code-card-middle-right">
                                                <div className="content-div">
                                                  <h4>Student Passcode</h4>
                                                  <p>
                                                    {" "}
                                                    <span className="block">
                                                      Log in to your account by
                                                      typing{" "}
                                                    </span>
                                                    <span className="block">
                                                      your unique student
                                                      passcode.
                                                    </span>
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

                              <div className="notes-blm-access-div">
                                <p>
                                  * You need to enter your class once per
                                  device.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="instructions-right-div">
                            <div className="instructions-right-row-div">
                              <div className="instructions-space-between-div">
                                <div className="instructions-space-between-top">
                                  <div className="email-download-div">
                                    <div className="email-download-inner-div">
                                      <button
                                        data-toggle="modal"
                                        data-target="#share-login-instructions-modal"
                                        onClick={
                                          this.handleOpenRemoveEducatorModal
                                        }
                                        className="btn btn-general-transparent btn-email mr-15">
                                        {" "}
                                        <span className="custom-icon email-icon"></span>{" "}
                                      </button>
                                      <Link
                                        to={to}
                                        className="btn btn-general-transparent btn-download"
                                        target="_blank"
                                        onClick={() => {
                                          localStorage.setItem("const_url", to);
                                        }}>
                                        {" "}
                                        <span className="custom-icon download-icon"></span>{" "}
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                                <div className="instructions-space-between-bottom">
                                  <div className="app-download-div">
                                    <div className="title-div">
                                      <h3>Download the YouHue app</h3>
                                    </div>

                                    <div className="app-store-div">
                                      <ul className="app-store-ul">
                                        <li>
                                          <a
                                            target="_blank"
                                            href="https://apps.apple.com/us/app/youhue/id1589233351"
                                            className="app-store-icon">
                                            {" "}
                                            <img
                                              src={app_store}
                                              className="img-fluid"
                                              alt="app-store"
                                            />{" "}
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            target="_blank"
                                            href="https://play.google.com/store/apps/details?id=com.youhue.code"
                                            className="app-store-icon">
                                            {" "}
                                            <img
                                              src={google_play_store}
                                              className="img-fluid"
                                              alt="google-play"
                                            />{" "}
                                          </a>
                                        </li>
                                      </ul>
                                    </div>

                                    <div className="title-div">
                                      <h3>Or, visit</h3>

                                      <div className="link-div">
                                        <Link
                                          target="_blank"
                                          to="https://app.youhue.com/student"
                                          className="link link-btn-blue">
                                          app.youhue.com/student
                                        </Link>
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
              </div>
            </div>
          </div>
        </div>
        {this.state.isOpenShareLoginInsModal ? (
          <ShareLoginInstructionsModal
            show={this.state.isOpenShareLoginInsModal}
            onClose={this.isOpenShareLoginInsModal}
            isSendInstructionsConfirmModal={false}
            props={this.props}
          />
        ) : null}
      </>
    );
  }
}

export default ViewStudentLoginInstruction;
