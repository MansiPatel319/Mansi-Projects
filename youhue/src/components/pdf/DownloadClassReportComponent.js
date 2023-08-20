import React from "react";
import logo from "../../assets/images/pdf/logo.svg";
import angry from "../../assets/images/pdf/angry.svg";
import anxious from "../../assets/images/pdf/anxious.svg";
import calm from "../../assets/images/pdf/calm.svg";
import confused from "../../assets/images/pdf/confused.svg";
import excited from "../../assets/images/pdf/excited.svg";
import happy from "../../assets/images/pdf/happy.svg";
import loved from "../../assets/images/pdf/loved.svg";
import okay from "../../assets/images/pdf/okay.svg";
import sad from "../../assets/images/pdf/sad.svg";
import flag from "../../assets/images/pdf/flag.svg";
import circle from "../../assets/images/pdf/circle.svg";
import { baseUrl } from "../../axiosUrl";

import "../../styles/pdf/downloadClassReport.css";

class DownloadClassReportComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      res: [],
    };
  }

  componentDidMount() {
    let class_report = localStorage.getItem("class_report");
    let data1 = JSON.parse(class_report);
    const token = localStorage.getItem("token");
    fetch(baseUrl+"v6/download-class-report/", {
      method: "POST",
      headers: {
        Authorization: token,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        class_id: data1["class_id"],
        start_date: data1["start_date"],
        end_date: data1["end_date"],
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status) {
          console.log(response, "response");
          this.setState({
            res: response.data,
          });
          setTimeout(() => {
            window.print();
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleMoodColor(mood_name) {
    switch (mood_name) {
      case "Happy":
        return happy;
      case "Excited":
        return excited;
      case "Angry":
        return angry;
      case "Anxious":
        return anxious;
      case "Calm":
        return calm;
      case "Confused":
        return confused;
      case "Loved":
        return loved;
      case "Okay":
        return okay;
      case "Sad":
        return sad;
      default:
        return "";
    }
  }

  render() {
    let { res } = this.state;
    console.log("this.state", this.state);

    return res && res.length !== 0
      ? res.map((res_data) => {
          return (
            <div className="">
              <table>
                <tr>
                  <td>
                    <table cellspacing="0" cellpadding="0">
                      <tr>
                        <td>
                          <table
                            className="center_table"
                            cellspacing="0"
                            cellpadding="0"
                          >
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
                                    <tr>
                                      <td>
                                        <div className="yh_tmp_heading">
                                          <h3>{res_data.data.school_name}</h3>
                                          <h5>{res_data.grp_name}</h5>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div className="yh_tmp_detail">
                                          <h3>
                                            Number of students:{" "}
                                            <span>
                                              {res_data.data.total_students}
                                            </span>{" "}
                                          </h3>
                                          <h3>
                                            Date:{" "}
                                            <span>{res_data.data.date}</span>
                                          </h3>
                                          <h3>
                                            Total Logs:{" "}
                                            <span>
                                              {res_data.data.total_logs}
                                            </span>
                                          </h3>
                                          <h3>
                                            Flagged Logs:{" "}
                                            <span>
                                              {res_data.data.flagged_logs}
                                            </span>
                                          </h3>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                  <table cellspacing="0" cellpadding="0">
                                    <tr>
                                      <td>
                                        <table
                                          style={{
                                            width: "350px",
                                            margin: "0 auto",
                                          }}
                                          cellspacing="0"
                                          cellpadding="0"
                                        >
                                          <tr>
                                            <td>
                                              <div className="yh_tmp_topMoods moodAnxious">
                                                <table
                                                  cellspacing="0"
                                                  cellpadding="0"
                                                >
                                                  <tr>
                                                    <td>
                                                      <div className="yh_tmp_topMood_heading">
                                                        <h3>Top 3 moods</h3>
                                                      </div>
                                                    </td>
                                                  </tr>
                                                  {res_data.data &&
                                                  res_data.data.top_mood
                                                    ? res_data.data.top_mood.map(
                                                        (res) => {
                                                          return (
                                                            <tr>
                                                              <td>
                                                                <table
                                                                  className={`mood${res.mood_name}_allBrdr`}
                                                                  cellspacing="0"
                                                                  cellpadding="0"
                                                                >
                                                                  <tr>
                                                                    <th
                                                                      className={`mood${res.mood_name}_brdr`}
                                                                    >
                                                                      <div className="yh_tmp_img">
                                                                        <img
                                                                          src={this.handleMoodColor(
                                                                            res.mood_name
                                                                          )}
                                                                          alt="image"
                                                                        />
                                                                      </div>
                                                                    </th>
                                                                    <th
                                                                      className={`mood${res.mood_name}_brdr`}
                                                                    >
                                                                      <div className="yh_tmp_moodHead">
                                                                        <h3>
                                                                          {
                                                                            res.percentage
                                                                          }
                                                                          %
                                                                        </h3>
                                                                      </div>
                                                                    </th>
                                                                    <th
                                                                      className={`mood${res.mood_name}_brdr`}
                                                                    >
                                                                      <div className="yh_tmp_moodHead">
                                                                        <h3>
                                                                          {
                                                                            res.count
                                                                          }{" "}
                                                                          <span>
                                                                            logs
                                                                          </span>
                                                                        </h3>
                                                                      </div>
                                                                    </th>
                                                                  </tr>
                                                                  {res.sub_mood &&
                                                                  res.sub_mood
                                                                    .length > 0
                                                                    ? res.sub_mood.map(
                                                                        (
                                                                          sub_mood_data
                                                                        ) => {
                                                                          return (
                                                                            <tr>
                                                                              <td>
                                                                                <div className="yh_tmp_moodName">
                                                                                  <h3>
                                                                                    {
                                                                                      sub_mood_data.mood
                                                                                    }
                                                                                  </h3>
                                                                                </div>
                                                                              </td>
                                                                              <td>
                                                                                <div className="yh_tmp_moodNum">
                                                                                  <h3>
                                                                                    {
                                                                                      sub_mood_data.percentage
                                                                                    }

                                                                                    %
                                                                                  </h3>
                                                                                </div>
                                                                              </td>
                                                                              <td>
                                                                                <div className="yh_tmp_moodLog">
                                                                                  <h3>
                                                                                    {
                                                                                      sub_mood_data.count
                                                                                    }{" "}
                                                                                    <span>
                                                                                      logs
                                                                                    </span>
                                                                                  </h3>
                                                                                </div>
                                                                              </td>
                                                                            </tr>
                                                                          );
                                                                        }
                                                                      )
                                                                    : ""}
                                                                </table>
                                                              </td>
                                                            </tr>
                                                          );
                                                        }
                                                      )
                                                    : ""}
                                                </table>
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                      <td>
                                        <table
                                          className="yh_common_brdr"
                                          style={{
                                            width: "550px",
                                            margin: "0 auto",
                                          }}
                                          cellspacing="0"
                                          cellpadding="0"
                                        >
                                          <tr>
                                            <td>
                                              <div className="yh_tmp_weekMoods">
                                                <table
                                                  cellspacing="0"
                                                  cellpadding="0"
                                                >
                                                  <tr>
                                                    <td>
                                                      <div className="yh_tmp_topMood_heading">
                                                        <h3>
                                                          Moods by Day of the
                                                          Week
                                                        </h3>
                                                      </div>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <table
                                                        className="normal_border"
                                                        cellspacing="0"
                                                        cellpadding="0"
                                                      >
                                                        <tr>
                                                          <th
                                                            style={{
                                                              color: "#3F3F44",
                                                              fontSize: "16px",
                                                              fontWeight: "500",
                                                              margin: "0",
                                                            }}
                                                          >
                                                            Mon
                                                          </th>
                                                          <th
                                                            style={{
                                                              color: "#3F3F44",
                                                              fontSize: "16px",
                                                              fontWeight: "500",
                                                              margin: "0",
                                                            }}
                                                          >
                                                            Tue
                                                          </th>
                                                          <th
                                                            style={{
                                                              color: "#3F3F44",
                                                              fontSize: "16px",
                                                              fontWeight: "500",
                                                              margin: "0",
                                                            }}
                                                          >
                                                            Wed
                                                          </th>
                                                          <th
                                                            style={{
                                                              color: "#3F3F44",
                                                              fontSize: "16px",
                                                              fontWeight: "500",
                                                              margin: "0",
                                                            }}
                                                          >
                                                            Thu
                                                          </th>
                                                          <th
                                                            style={{
                                                              color: "#3F3F44",
                                                              fontSize: "16px",
                                                              fontWeight: "500",
                                                              margin: "0",
                                                            }}
                                                          >
                                                            Fri
                                                          </th>
                                                          <th
                                                            style={{
                                                              color: "#3F3F44",
                                                              fontSize: "16px",
                                                              fontWeight: "500",
                                                              margin: "0",
                                                            }}
                                                          >
                                                            Sat
                                                          </th>
                                                          <th
                                                            style={{
                                                              color: "#3F3F44",
                                                              fontSize: "16px",
                                                              fontWeight: "500",
                                                              margin: "0",
                                                            }}
                                                          >
                                                            Sun
                                                          </th>
                                                        </tr>
                                                        {res_data.data &&
                                                        res_data.data
                                                          .mood_by_week
                                                          ? Object.keys(
                                                              res_data.data
                                                                .mood_by_week
                                                            ).map((res, qr) => {
                                                              return (
                                                                <td>
                                                                  {res_data.data &&
                                                                    res_data.data.mood_by_week[
                                                                      res
                                                                    ].map(
                                                                      (qr) => {
                                                                        return qr &&
                                                                          qr.percentage !=
                                                                            0 ? (
                                                                          <tr>
                                                                            <div
                                                                              className="yh_tmp_weekMoodBlock"
                                                                              style={{
                                                                                marginBottom:
                                                                                  "15px",
                                                                              }}
                                                                            >
                                                                              <img
                                                                                src={this.handleMoodColor(
                                                                                  qr.mood
                                                                                )}
                                                                                alt="image"
                                                                              />
                                                                              <h3>
                                                                                {
                                                                                  qr.percentage
                                                                                }

                                                                                %
                                                                              </h3>
                                                                            </div>
                                                                          </tr>
                                                                        ) : (
                                                                          ""
                                                                        );
                                                                      }
                                                                    )}
                                                                </td>
                                                              );
                                                            })
                                                          : ""}
                                                      </table>
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
                                  <table cellspacing="0" cellpadding="0">
                                    <tr>
                                      <td>
                                        <table
                                          style={{
                                            width: "290px",
                                            margin: "0 auto",
                                          }}
                                          cellspacing="0"
                                          cellpadding="0"
                                        >
                                          <tr>
                                            <td>
                                              <div className="yh_flag_heading">
                                                <h3>Flagged Topics</h3>
                                              </div>
                                              <table
                                                className="normal_border flagged_table"
                                                cellspacing="0"
                                                cellpadding="0"
                                              >
                                                <tr>
                                                  <th className="normal_bottom_border">
                                                    <img
                                                      src={flag}
                                                      alt="image"
                                                    />
                                                  </th>
                                                  <th className="normal_bottom_border">
                                                    Mentions
                                                  </th>
                                                </tr>
                                                {res_data.data &&
                                                res_data.data.flagged_topics
                                                  ? res_data.data.flagged_topics.map(
                                                      (res) => {
                                                        if (res.count > 0) {
                                                          return (
                                                            <tr>
                                                              <td>
                                                                <h3>
                                                                  {
                                                                    res.flagged_topic
                                                                  }
                                                                </h3>
                                                              </td>
                                                              <td>
                                                                <h3>
                                                                  {res.count}
                                                                </h3>
                                                              </td>
                                                            </tr>
                                                          );
                                                        }
                                                      }
                                                    )
                                                  : ""}
                                              </table>
                                              <div className="yh_bottom_heading">
                                                <h3>
                                                  * Top 10 flagged topics for
                                                  your class
                                                </h3>
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                      <td>
                                        <table
                                          style={{
                                            width: "290px",
                                            margin: "0 auto",
                                            height: "auto",
                                          }}
                                          cellspacing="0"
                                          cellpadding="0"
                                        >
                                          <tr>
                                            <td>
                                              <div className="yh_flag_heading">
                                                <h3>Flagged Students</h3>
                                              </div>
                                              <table
                                                className="normal_border flagged_table"
                                                cellspacing="0"
                                                cellpadding="0"
                                              >
                                                <tr>
                                                  <th className="normal_bottom_border">
                                                    Student Name
                                                  </th>
                                                  <th className="normal_bottom_border">
                                                    Flagged Mentions
                                                  </th>
                                                </tr>
                                                {res_data.data &&
                                                res_data.data.student
                                                  ? res_data.data.student.map(
                                                      (res) => {
                                                        return (
                                                          <tr>
                                                            <td>
                                                              <h3>
                                                                {
                                                                  res.student_name
                                                                }
                                                              </h3>
                                                            </td>
                                                            <td>
                                                              <h3>
                                                                {res.count}
                                                              </h3>
                                                            </td>
                                                          </tr>
                                                        );
                                                      }
                                                    )
                                                  : ""}
                                              </table>
                                              <div className="yh_bottom_heading">
                                                <h3>
                                                  * Your top 10 flagged
                                                  students.
                                                </h3>
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
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
                  </td>
                </tr>
                <tr>
                  <td>
                    <table cellspacing="0" cellpadding="0">
                      <tr>
                        <td>
                          <table
                            className="center_table"
                            cellspacing="0"
                            cellpadding="0"
                          >
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
                                    <tr>
                                      <td style={{ width: "100%" }} colspan="2">
                                        <div className="yh_tmp_heading">
                                          <h3>{res_data.data.school_name}</h3>
                                          <h5>{res_data.grp_name}</h5>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div className="yh_tmp_detail">
                                          <h3>
                                            Number of students:{" "}
                                            <span>
                                              {res_data.data.total_students}
                                            </span>{" "}
                                          </h3>
                                          <h3>
                                            Date:{" "}
                                            <span>{res_data.data.date}</span>
                                          </h3>
                                          <h3>
                                            Total Logs:{" "}
                                            <span>
                                              {res_data.data.total_logs}
                                            </span>
                                          </h3>
                                          <h3>
                                            Flagged Logs:{" "}
                                            <span>
                                              {res_data.data.flagged_logs}
                                            </span>
                                          </h3>
                                        </div>
                                      </td>
                                      <td style={{ "text-align": "right" }}>
                                        <img
                                          style={{ verticalAlign: "top" }}
                                          src={circle}
                                          alt="graph"
                                        />
                                      </td>
                                    </tr>
                                  </table>
                                  <table cellspacing="0" cellpadding="0">
                                    {res_data?.data &&
                                    res_data?.data?.mood.length > 0
                                      ? [1, 2, 3].map(
                                          (indvidual_mood, index) => {
                                            return (
                                              <tr>
                                                {index == 0
                                                  ? res_data.data.mood
                                                      .slice(0, 3)
                                                      .map(
                                                        (sub_mood_data, i) => {
                                                          // if(i < 3){
                                                          return (
                                                            <td>
                                                              <table
                                                                className={`mood${sub_mood_data.mood}_allBrdr`}
                                                                cellspacing="0"
                                                                cellpadding="0"
                                                              >
                                                                <tr>
                                                                  <th
                                                                    className={`mood${sub_mood_data.mood}_brdr`}
                                                                  >
                                                                    <div className="yh_tmp_img">
                                                                      <img
                                                                        src={this.handleMoodColor(
                                                                          sub_mood_data.mood
                                                                        )}
                                                                        alt="image"
                                                                      />
                                                                    </div>
                                                                  </th>
                                                                  <th
                                                                    className={`mood${sub_mood_data.mood}_brdr`}
                                                                  >
                                                                    <div className="yh_tmp_moodHead">
                                                                      <h3>
                                                                        {
                                                                          sub_mood_data.percentage
                                                                        }
                                                                        %
                                                                      </h3>
                                                                    </div>
                                                                  </th>
                                                                  <th
                                                                    className={`mood${sub_mood_data.mood}_brdr`}
                                                                  >
                                                                    <div className="yh_tmp_moodHead">
                                                                      <h3>
                                                                        {
                                                                          sub_mood_data.count
                                                                        }{" "}
                                                                        <span>
                                                                          logs
                                                                        </span>
                                                                      </h3>
                                                                    </div>
                                                                  </th>
                                                                </tr>

                                                                {sub_mood_data &&
                                                                sub_mood_data
                                                                  .sub_mood
                                                                  .length > 0
                                                                  ? sub_mood_data.sub_mood.map(
                                                                      (sub) => {
                                                                        return (
                                                                          <tr>
                                                                            <td>
                                                                              <div className="yh_tmp_moodName">
                                                                                <h3>
                                                                                  {
                                                                                    sub.mood
                                                                                  }
                                                                                </h3>
                                                                              </div>
                                                                            </td>
                                                                            <td>
                                                                              <div className="yh_tmp_moodNum">
                                                                                <h3>
                                                                                  {
                                                                                    sub.percentage
                                                                                  }

                                                                                  %
                                                                                </h3>
                                                                              </div>
                                                                            </td>
                                                                            <td>
                                                                              <div className="yh_tmp_moodLog">
                                                                                <h3>
                                                                                  {
                                                                                    sub.count
                                                                                  }{" "}
                                                                                  <span>
                                                                                    logs
                                                                                  </span>
                                                                                </h3>
                                                                              </div>
                                                                            </td>
                                                                          </tr>
                                                                        );
                                                                      }
                                                                    )
                                                                  : ""}
                                                              </table>
                                                            </td>
                                                          );
                                                          // }
                                                        }
                                                      )
                                                  : index == 1
                                                  ? res_data.data.mood
                                                      .slice(3, 6)
                                                      .map(
                                                        (sub_mood_data, i) => {
                                                          // if(i < 3){
                                                          return (
                                                            <td>
                                                              <table
                                                                className={`mood${sub_mood_data.mood}_allBrdr`}
                                                                cellspacing="0"
                                                                cellpadding="0"
                                                              >
                                                                <tr>
                                                                  <th
                                                                    className={`mood${sub_mood_data.mood}_brdr`}
                                                                  >
                                                                    <div className="yh_tmp_img">
                                                                      <img
                                                                        src={this.handleMoodColor(
                                                                          sub_mood_data.mood
                                                                        )}
                                                                        alt="image"
                                                                      />
                                                                    </div>
                                                                  </th>
                                                                  <th
                                                                    className={`mood${sub_mood_data.mood}_brdr`}
                                                                  >
                                                                    <div className="yh_tmp_moodHead">
                                                                      <h3>
                                                                        {
                                                                          sub_mood_data.percentage
                                                                        }
                                                                        %
                                                                      </h3>
                                                                    </div>
                                                                  </th>
                                                                  <th
                                                                    className={`mood${sub_mood_data.mood}_brdr`}
                                                                  >
                                                                    <div className="yh_tmp_moodHead">
                                                                      <h3>
                                                                        {
                                                                          sub_mood_data.count
                                                                        }{" "}
                                                                        <span>
                                                                          logs
                                                                        </span>
                                                                      </h3>
                                                                    </div>
                                                                  </th>
                                                                </tr>

                                                                {sub_mood_data &&
                                                                sub_mood_data
                                                                  .sub_mood
                                                                  .length > 0
                                                                  ? sub_mood_data.sub_mood.map(
                                                                      (sub) => {
                                                                        return (
                                                                          <tr>
                                                                            <td>
                                                                              <div className="yh_tmp_moodName">
                                                                                <h3>
                                                                                  {
                                                                                    sub.mood
                                                                                  }
                                                                                </h3>
                                                                              </div>
                                                                            </td>
                                                                            <td>
                                                                              <div className="yh_tmp_moodNum">
                                                                                <h3>
                                                                                  {
                                                                                    sub.percentage
                                                                                  }

                                                                                  %
                                                                                </h3>
                                                                              </div>
                                                                            </td>
                                                                            <td>
                                                                              <div className="yh_tmp_moodLog">
                                                                                <h3>
                                                                                  {
                                                                                    sub.count
                                                                                  }{" "}
                                                                                  <span>
                                                                                    logs
                                                                                  </span>
                                                                                </h3>
                                                                              </div>
                                                                            </td>
                                                                          </tr>
                                                                        );
                                                                      }
                                                                    )
                                                                  : ""}
                                                              </table>
                                                            </td>
                                                          );
                                                          // }
                                                        }
                                                      )
                                                  : index == 2
                                                  ? res_data.data.mood
                                                      .slice(6, 9)
                                                      .map(
                                                        (sub_mood_data, i) => {
                                                          return (
                                                            <td>
                                                              <table
                                                                className={`mood${sub_mood_data.mood}_allBrdr`}
                                                                cellspacing="0"
                                                                cellpadding="0"
                                                              >
                                                                <tr>
                                                                  <th
                                                                    className={`mood${sub_mood_data.mood}_brdr`}
                                                                  >
                                                                    <div className="yh_tmp_img">
                                                                      <img
                                                                        src={this.handleMoodColor(
                                                                          sub_mood_data.mood
                                                                        )}
                                                                        alt="image"
                                                                      />
                                                                    </div>
                                                                  </th>
                                                                  <th
                                                                    className={`mood${sub_mood_data.mood}_brdr`}
                                                                  >
                                                                    <div className="yh_tmp_moodHead">
                                                                      <h3>
                                                                        {
                                                                          sub_mood_data.percentage
                                                                        }
                                                                        %
                                                                      </h3>
                                                                    </div>
                                                                  </th>
                                                                  <th
                                                                    className={`mood${sub_mood_data.mood}_brdr`}
                                                                  >
                                                                    <div className="yh_tmp_moodHead">
                                                                      <h3>
                                                                        {
                                                                          sub_mood_data.count
                                                                        }{" "}
                                                                        <span>
                                                                          logs
                                                                        </span>
                                                                      </h3>
                                                                    </div>
                                                                  </th>
                                                                </tr>

                                                                {sub_mood_data &&
                                                                sub_mood_data
                                                                  .sub_mood
                                                                  .length > 0
                                                                  ? sub_mood_data.sub_mood.map(
                                                                      (sub) => {
                                                                        return (
                                                                          <tr>
                                                                            <td>
                                                                              <div className="yh_tmp_moodName">
                                                                                <h3>
                                                                                  {
                                                                                    sub.mood
                                                                                  }
                                                                                </h3>
                                                                              </div>
                                                                            </td>
                                                                            <td>
                                                                              <div className="yh_tmp_moodNum">
                                                                                <h3>
                                                                                  {
                                                                                    sub.percentage
                                                                                  }

                                                                                  %
                                                                                </h3>
                                                                              </div>
                                                                            </td>
                                                                            <td>
                                                                              <div className="yh_tmp_moodLog">
                                                                                <h3>
                                                                                  {
                                                                                    sub.count
                                                                                  }{" "}
                                                                                  <span>
                                                                                    logs
                                                                                  </span>
                                                                                </h3>
                                                                              </div>
                                                                            </td>
                                                                          </tr>
                                                                        );
                                                                      }
                                                                    )
                                                                  : ""}
                                                              </table>
                                                            </td>
                                                          );
                                                        }
                                                      )
                                                  : ""}
                                              </tr>
                                            );
                                          }
                                        )
                                      : ""}
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
          );
        })
      : "";
  }
}

export default DownloadClassReportComponent;
