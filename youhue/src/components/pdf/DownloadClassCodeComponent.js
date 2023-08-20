import React from "react";
import appstore from "../../assets/images/pdf/appstore.svg";
import access from "../../assets/images/pdf/access.svg";
import minibar from "../../assets/images/pdf/minibar.svg";
import playstore from "../../assets/images/pdf/playstore.svg";
import logo from "../../assets/images/pdf/logo.svg";
import { baseUrl } from "../../axiosUrl";

import "../../styles/pdf/classCode.css";
import { Link } from "react-router-dom";

class DownloadClassCodeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qr_code: "",
      identifier: "",
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    const class_Id = localStorage.getItem("classid");
    fetch(baseUrl+"v5/class-details/" + class_Id + "/", {
      method: "GET",
      headers: {
        Authorization: token,
        "content-type": "application/json",
        accept: "application/json",
      },
      // "body": JSON.stringify({

      // })
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status) {
          console.log(response, "response");
          this.setState({
            qr_code: response.data.qr_code,
            identifier: response.data.identifier,
          });
          setTimeout(() => {
            window.print();
          }, 1500);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { qr_code, identifier } = this.state;

    return (
      <div className="">
        <table cellspacing="0" cellpadding="0">
          <tr>
            <td style={{ padding: "0" }}>
              <table className="center_table" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div className="yh_tmp_wrapper">
                      <table cellspacing="0" cellpadding="0">
                        <tr>
                          <td>
                            <div className="yh_tmp_logo">
                              <img src={logo} alt="image" />
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
                                  target="_blank"
                                  href="https://apps.apple.com/us/app/youhue/id1589233351"
                                  style={{ margiRight: "10px" }}>
                                  <img src={appstore} alt="image" />
                                </a>
                                <a style={{"marginLeft":"12px"}}
                                  target="_blank"
                                  href="https://play.google.com/store/apps/details?id=com.youhue.code">
                                  <img src={playstore} alt="image" />
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
                          <td valign="top" style={{ verticalAlign: "top" }}>
                            <div className="yh_tmp_classCode_wrapper">
                              <div className="step_block">
                                {/* <h5>Step 1</h5> */}
                                <h3>Access your class</h3>
                              </div>
                              <div className="yh_code_group">
                                <h2>{identifier}</h2>
                                <div className="yh_code_content">
                                  <div className="yh_code_image">
                                    <img src={access} alt="image" />
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
                                    marginBottom: "20px",
                                    marginLeft: "70px",
                                  }}>
                                  <img
                                    src={qr_code}
                                    alt="image"
                                    style={{ width: "100px", height: "100px" }}
                                  />
                                </div>
                                <div className="yh_code_content">
                                  <div className="yh_code_image">
                                    <img src={minibar} alt="image" />
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
                      <table cellspacing="0" cellpadding="0">
                        <tr>
                          <td>
                            <div className="tmp_block_bottom">
                              <h3>
                                * You need to enter your class once per device.
                              </h3>
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
    );
  }
}

export default DownloadClassCodeComponent;
