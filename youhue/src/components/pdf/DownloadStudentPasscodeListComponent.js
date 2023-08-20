import React from "react";
import doodle from "../../assets/images/pdf/doodle.svg";
import logo from "../../assets/images/pdf/logo.svg";
import { baseUrl } from "../../axiosUrl";

import "../../styles/pdf/studentPasscodeList.css";

class DownloadStudentPasscodeListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      student_lst_1: [],
      student_lst_2: [],
      group_name: "",
      school_name: "",
      qr_code: "",
      identifier: "",
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    const group_id = localStorage.getItem("studentclassid");
    fetch(baseUrl+"v5/export-pdf/", {
      method: "POST",
      headers: {
        Authorization: token,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        group_id: group_id,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status) {
          console.log(response, "response");
          this.setState({
            student_lst_1: response.data.student_lst1,
            student_lst_2: response.data.student_lst2,
            group_name: response.data.group_name,
            school_name: response.data.school_name,
            qr_code: response.data.qr_code,
            identifier: response.data.access_code,
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
    const { student_lst_1, student_lst_2 } = this.state;
    const data = this.state;

    return (
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
                              <img src={logo} alt="image" />
                            </div>
                          </td>
                          <td style={{ textAlign: "right" }}>
                            <div className="yh_barcode_block">
                              <img
                                src={data.qr_code}
                                alt="image"
                                width="90px"
                                height="90px"
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="yh_tmp_details">
                              <h3>{data.school_name}</h3>
                              <h4>{data.group_name}</h4>
                            </div>
                          </td>
                          <td style={{ textAlign: "right" }}>
                            <div className="yh_header_code">
                              <h3>Your Class Access Code:</h3>
                              <h4>{data.identifier}</h4>
                            </div>
                          </td>
                        </tr>
                      </table>
                      <table cellspacing="0" cellpadding="0">
                        <tr>
                          <td valign="top">
                            {student_lst_1 && student_lst_1.length != 0 ? (
                              student_lst_1.map((data) => {
                                return (
                                  <div className="yh_barcode_section">
                                    <table cellspacing="0" cellpadding="0">
                                      <tr>
                                        <td>{data.username}</td>
                                        <td
                                          style={{
                                            "font-weight": "500",
                                            textAlign: "right",
                                          }}>
                                          {data.access_code}
                                        </td>
                                      </tr>
                                    </table>
                                  </div>
                                );
                              })
                            ) : (
                              <div className="yh_barcode_section">
                                <table cellspacing="0" cellpadding="0">
                                  <tr>
                                    <td></td>
                                    <td
                                      style={{
                                        "font-weight": "500",
                                        textAlign: "right",
                                      }}></td>
                                  </tr>
                                </table>
                              </div>
                            )}
                          </td>
                          <td>
                            {student_lst_2 &&
                              student_lst_2.map((data) => {
                                return (
                                  <div className="yh_barcode_section">
                                    <table cellspacing="0" cellpadding="0">
                                      <tr>
                                        <td>{data.username}</td>
                                        <td
                                          style={{
                                            "font-weight": "500",
                                            textAlign: "right",
                                          }}>
                                          {data.access_code}
                                        </td>
                                      </tr>
                                    </table>
                                  </div>
                                );
                              })}
                          </td>
                        </tr>
                      </table>
                      <table cellspacing="0" cellpadding="0">
                        <tr>
                          <td style={{ textAlign: "right" }}>
                            <img src={doodle} alt="image" />
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

export default DownloadStudentPasscodeListComponent;
