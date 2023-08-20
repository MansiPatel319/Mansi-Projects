import React, { Component } from "react";
import appstore from "../../../assets/images/pdf/appstore.svg";
import access from "../../../assets/images/pdf/access.svg";
import passcode from "../../../assets/images/pdf/passcode.svg";
import minibar from "../../../assets/images/pdf/minibar.svg";
import playstore from "../../../assets/images/pdf/playstore.svg";
import logo from "../../../assets/images/pdf/logo.svg";
import { Link } from "react-router-dom";

import app_store from "../../../assets/images/app-store-badge-us-black.svg";
import google_play_store from "../../../assets/images/google-play-badge-us.svg";

import ShareLoginInstructionsModal from "../../../containers/Educator/ShareLoginInstructions";

import "../../../styles/style.css";
import "../Dashboard/Dashboard.scss";
import "./ViewStudentLoginInstruction.scss";

class ViewLogininstruction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenShareLoginInsModal: false,
      qrCode: '',
      identifier: '',
      name:'',
      access_code:'',
      first_name: '',
    };
  }

  handleOpenRemoveEducatorModal = () => {
    this.setState({ isOpenShareLoginInsModal: true });
  };

  isOpenShareLoginInsModal = () => {
    this.setState({ isOpenShareLoginInsModal: false });
  };
  handleSteps = (step) => {
    this.props.history.push('/login');
  };
  componentDidMount = () => {
    window.print();
    var data = window.location.pathname;
    var splitdata = data.split("/");
    this.props
      .shareLoginInstructionsgetapi(splitdata[3], splitdata[4])
      .then((response) => {
        console.log("res", response);
        if(response) {
          if(response.code === 200) {
            this.setState({qr_code:response.data.qr_code});
            this.setState({identifier:response.data.identifier});
            this.setState({name:response.data.name});
            this.setState({access_code:response.data.student.access_code});
            this.setState({first_name:response.data.student.first_name});
          }
        }
      });
  };
 
  render() {
    
    const { educator } = this.props;
    const to = "/download/studentCode/";
    return (
      <>
      <div className="">
        <table cellspacing="0" cellpadding="0">
          <tr>
            <td>
              <table className="center_table" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div className="yh_tmp_wrapper">
                      <table cellspacing="0" cellpadding="0">
                        <tr>
                          <td>
                            <div className="yh_tmp_logo">
                              <img src={logo} alt="logo" />
                            </div>
                          </td>
                        </tr>
                      </table>
                      <table
                        style={{ borderBottom: "1px solid #E2D0D0" }}
                        cellspacing="0"
                        cellpadding="0">
                        <tr>
                          <td>
                            <div className="yh_tmp_appDownload_section">
                              <h3>Download the YouHue app</h3>
                              <div className="yh_tmp_app_btn">
                                <a
                                  // href="javascript:;"
                                  target="_blank"
                                  href="https://apps.apple.com/us/app/youhue/id1589233351"
                                  style={{ marginRight: "10px" }}>
                                  <img src={appstore} alt="appstore" />
                                </a>
                                <a
                                  // href="javascript:;"
                                  target="_blank"
                                  href="https://play.google.com/store/apps/details?id=com.youhue.code">
                                  <img src={playstore} alt="playstore" />
                                </a>
                              </div>
                              <h3>Or, visit</h3>
                              <Link
                                target="_blank"
                                to="https://app.youhue.com/student">
                                <h4>app.youhue.com/student</h4>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      </table>
                      <table
                        style={{ borderBottom: "1px solid #E2D0D0" }}
                        cellspacing="0"
                        cellpadding="0">
                        <tr>
                          <td style={{ verticalAlign: "bottom" }}>
                            <div className="yh_tmp_classCode_wrapper">
                              <div className="step_block">
                                <h5>Step 1</h5>
                                <h3>Access your class</h3>
                              </div>
                              <div className="yh_code_group">
                                <h2>{this.state.identifier}</h2>
                                <div className="yh_code_content">
                                  <div className="yh_code_image">
                                    <img src={access} alt="access" />
                                  </div>
                                  <div className="yh_code_text">
                                    <h3>Class Access Code</h3>
                                    <h5>Log in by typing your </h5>
                                    <h5>10-digit class access code.</h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td
                            valign="bottom"
                            style={{ verticalAlign: "bottom" }}>
                            <div className="yh_tmp_classCode_wrapper">
                              <div className="yh_code_group">
                                <div
                                  style={{
                                    textAlign: "left",
                                    marginBottom: " 20px",
                                    marginLeft: "70px",
                                  }}>
                                  <img
                                    src={this.state.qr_code}
                                    alt="qr_code"
                                    width="100px"
                                    height="100px"
                                  />
                                </div>
                                <div className="yh_code_content">
                                  <div className="yh_code_image">
                                    <img src={minibar} alt="minibar" />
                                  </div>
                                  <div className="yh_code_text">
                                    <h3>Class QR Code</h3>
                                    <h5>Log in by scanning </h5>
                                    <h5>your class QR code.</h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </table>
                      <table
                        style={{ borderBottom: "1px solid #E2D0D0" }}
                        cellspacing="0"
                        cellpadding="0">
                        <tr>
                          <td>
                            <div className="tmp_block_bottom">
                              <h3>
                                * You need to enter your class once per device.
                              </h3>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="yh_tmp_classCode_wrapper">
                              <div className="step_block">
                                <h5>Step 2</h5>
                                <h3>Access your student account</h3>
                              </div>
                              <div className="yh_code_group">
                                <h2>{this.state.access_code}</h2>
                                <div className="yh_code_content">
                                  <div className="yh_code_image">
                                    <img src={passcode} alt="passcode" />
                                  </div>
                                  <div className="yh_code_text">
                                    <h3>Student Passcode</h3>
                                    <h5>Log in to your account by typing</h5>
                                    <h5>your unique student passcode.</h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
      </>
    );
  }
}

export default ViewLogininstruction;
