import React from "react";
import { Link } from "react-router-dom";
import DateRangePicker from "react-bootstrap-daterangepicker";
import moment from "moment";
import '../../components/Educator/InsightDashboard/InsightDashboard.dev.scss'
// import emptyState2 from "../../../../assets/images/emptyState2.png";
import { baseUrl } from "../../axiosUrl";
// import "../InsightDashboard.scss";
import DemoEducatorResponseView from "../DemoClass/DemoEducatorResponseView";


class AllLogs extends React.Component {
  constructor() {
    super()
 
    this.state = {
      mood: this.mood,
      tag: this.tag,
      timeline: this.timeline,
      selectedTag: "This Week",
      isOpenEducatorResponseModal:false,
      moodtype:""
    };
  }
  
  mood = {
    mood_details: [
      {
        id: 1,
        name: "happy",
      },
      {
        id: 2,
        name: "excited",
      },
      {
        id: 3,
        name: "loved",
      },
      {
        id: 4,
        name: "calm",
      },
      {
        id: 5,
        name: "okay",
      },
      {
        id: 6,
        name: "confused",
      },
      {
        id: 7,
        name: "anxious",
      },
      {
        id: 8,
        name: "sad",
      },
      {
        id: 9,
        name: "angry",
      },
    ],
  };
  tag = {
    tag_details: [
      {
        id: 1,
        name: "Family",
      },
      {
        id: 2,
        name: "Friends",
      },
      {
        id: 3,
        name: "Health",
      },
      {
        id: 4,
        name: "School",
      },
      {
        id: 5,
        name: "Other",
      },
    ],
  };

  timeline = {
    timeline_details: [
      {
        id: 1,
        name: "This Week",
      },
      {
        id: 2,
        name: "Last Week",
      },
      {
        id: 3,
        name: "30 days",
      },
      {
        id: 4,
        name: "All Time",
      },
    ],
  };

  render() {
    const insightData ={
      "class_name": "Mr Akash Class 30",
      "log_result": [
        {
          "date": "2021-10-05",
          "log": [
            {
              "id": "5697b784-2cb7-4fad-aa4b-aad8bbbbe9a9",
              "username": "Student C",
              "mood": {
                "id": "bd48d57c-be78-4438-8c52-27909e43c416",
                "name": "calm",
                "slug": "calm",
                "parent": null
              },
              "text": "Log text log text log text log text",
              "date_created": "2021-10-05T10:08:29",
              "is_flag": {
                
              },
              "is_topics": {
                
              },
              "status_id": "4a64ddd6-da61-41df-9cf3-9ebcb2e0ebef",
              "tags": [
                "Health",
                "School"
              ]
            },
            {
              "id": "55f334e6-022b-4388-97f2-33639da6e1f3",
              "username": "Student A",
              "mood": {
                "id": "bd48d57c-be78-4438-8c52-27909e43c416",
                "name": "happy",
                "slug": "happy",
                "parent": null
              },
              "text": "Log text log text log text log texzt log text log text log text log text log text ",
              "date_created": "2021-10-05T07:41:01",
              "is_flag": {
                
              },
              "is_topics": {
                
              },
              "status_id": "e4c0e9d4-7daa-4225-bac3-3a54c4347511",
              "tags": [
                "Health",
                "School"
              ]
            },
            {
              "id": "55f334e6-022b-4388-97f2-33639da6e1f3",
              "username": "Student B",
              "mood": {
                "id": "057369f3-0527-459c-ac38-867b96b280ec",
                "name": "calm",
                "slug": "calm",
                "parent": null
              },
              "text": "Log text log text log text log texzt log text log text log text log text log text ",
              "date_created": "2021-10-05T07:33:39",
              "is_flag": {
                
              },
              "is_topics": {
                
              },
              "status_id": "4ef03103-78ab-4663-ac28-e205dfc69e96",
              "tags": [
                "Health",
                "Other",
                "School"
              ]
            },
            {
              "id": "55f334e6-022b-4388-97f2-33639da6e1f3",
              "username": "Student D",
              "mood": {
                "id": "bd48d57c-be78-4438-8c52-27909e43c416",
                "name": "calm",
                "slug": "calm",
                "parent": null
              },
              "text": "Log text log text log text log texzt log text log text log text log text log text ",
              "date_created": "2021-10-05T07:27:30",
              "is_flag": {
                
              },
              "is_topics": {
                
              },
              "status_id": "2a741bbe-e6dc-4080-8fe9-83d911e2d551",
              "tags": [
                
              ]
            },
          
            {
              "id": "55f334e6-022b-4388-97f2-33639da6e1f3",
              "username": "student E",
              "mood": {
                "id": "b95aed02-8876-4966-940c-8f553bca21ba",
                "name": "anxious",
                "slug": "anxious",
                "parent": null
              },
              "text": "hi u am not anaxious.",
              "date_created": "2021-10-05T06:57:11",
              "is_flag": {
                "id": "af786ce8-a336-47ea-9db8-587f0bb5bd99",
                "name": "anxious"
              },
              "is_topics": {
                
              },
              "status_id": "de7b3619-47eb-4327-ae2d-50aeb5ca6340",
              "tags": [
                
              ]
            },
          ]
        }
      ],
      "total_records": 27,
      "total_pages": 3,
      "current_page": 1,
      "per_page": 10,
      "next_link": baseUrl+"v5/view-all-log/?class_id=a7eba98c-00ee-4392-adb1-277408c89da1&start_date=2021-10-03&end_date=2021-10-08&moods=&tags=&is_flagged=false&page=2",
      "prev_link": null
    };
    const { mood_details } = this.state.mood;
    const { tag_details } = this.state.tag;
    const { timeline_details } = this.state.timeline;
    return (
      <div className="container-main-root insight-container-main-root insight-dashboard-inner-container">
      <div className="container">
        <div className="container-inner-root">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="yh-tab-header-div">
                <div className="yh-tab-header-center-div">
                  <div className="back-to-group-box">
                    <Link
                      to="/demoinsight"
                      className="back-to-link">
                      <span className="back-icon-span">
                        {" "}
                        <span className="custom-icon back-icon"></span>{" "}
                      </span>
                    </Link>
                  </div>
                  <ul className="tab-list-ul">
                    <li className="tab-item">
                      <Link to="#" className="link">
                        {" "}
                        Admin{" "}
                      </Link>
                    </li>
                    <li className="tab-item active">
                      <Link to="#" onClick={() => this.handleSteps(0)} className="link">
                        {" "}
                        Insight{" "}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="studentView_mainHeading">
                <h3>Mood Journal</h3>
                <h5>Ms. Green’s 4th Grade</h5>
              </div>
              <div className="main-dashboard-body main-insight-dashboard-body">
                <div className="row">
                  <div className="col-lg-12 col-md-12 mb-4">
                    <div className="logs-detail-main-div student-view-logs-detail-main-div">
                      <div className="center-detail-main-root">
                        <div className="row">
                          {/* Filter */}
                          <div className="col-lg-3 col-md-3">
                          <div className="yh_log_sidebarWrapper">
          <div className="yh_list_wrapper">
            <div className="yl_list_block yh_timeline_list">
              <h3>Timeline</h3>
              <ul>
                {timeline_details && timeline_details.length !== 0
                  ? timeline_details.map((data) => {
                      return (
                        <li
                          className={``}
                          key={data.id}
                        >
                          <div >
                            <p value="This Week">{data.name}</p>
                          </div>
                        </li>
                      );
                    })
                  : ""}
                <li>
                  <div className="icon-box date-icon-box">
                    <DateRangePicker
                      
                    >
                      <div className="input-inline-group">
                        <input
                          type="text"
                          className="form-control form-date"
                          id="date-picker-01"
                          name="daterange"
                          value={""}
                      
                        />
                        <label className="label-arrow">
                          <span className="custom-icon calendar-icon"></span>
                        </label>
                      </div>
                    </DateRangePicker>
                  </div>
                </li>
              </ul>
            </div>
            {this.props.keywords ? (
              <div className="yl_list_block yh_mood_list">
                <h3 className="red_color">
                  {" "}
                  <span className="block">This Class’</span>
                  <span className="block"></span>
                </h3>
                <ul>
            
                </ul>
              </div>
            ) : (
              <div className="yl_list_block yh_mood_list">
                <h3>Moods</h3>
                <ul>
                  {mood_details && mood_details.length !== 0
                    ? mood_details.map((data) => {
                        return (
                          <li>
                            <div className="moodCheckbox_block">
                              <input
                                type="checkbox"
                                name={`mood${data.id}`}
                                id={`mood${data.id}`}
                                checked={this?.props?.mood_filter?.includes(
                                  data.name
                                )}
                              />
                              <label htmlFor={`mood${data.id}`}>
                                <div className="mood-icon-box">
                                  {" "}
                                  <span
                                    className={`mood-icon mood-${data.name}-icon`}
                                  ></span>{" "}
                                </div>
                              </label>
                            </div>
                          </li>
                        );
                      })
                    : ""}
                </ul>
              </div>
            )}
            <div className="yl_list_block yh_tags_list">
              <h3>Tags</h3>
              <ul>
                {tag_details && tag_details.length !== 0
                  ? tag_details.map((data) => {
                      return (
                        <li>
                          <div className="moodCheckbox_block">
                            <input
                              type="checkbox"
                              name={`tags${data.id}`}
                              id={`tags${data.id}`}
                          
                            />
                            <label for={`tags${data.id}`}>{data.name}</label>
                          </div>
                        </li>
                      );
                    })
                  : ""}
              </ul>
            </div>
            {this.props.handleIsFlagged && (
              <div className="yl_list_block yh_tags_list">
                <ul>
                  <li>
                    <div className="moodCheckbox_block">
                      <input
                        type="checkbox"
                        name="flagged_logs"
                        id="flagged_logs"
                        
                      />
                      <label for="flagged_logs">Flagged Logs</label>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      
                          </div>
                          {/* Filter end */}
                          
                          {insightData &&
                          insightData.log_result &&
                          insightData.log_result.length !== 0 ? (
                            <div className="col-lg-9 col-md-9">
                              <div className="center-logs-details">
                                {insightData &&
                                insightData.log_result
                                  ? insightData.log_result.map(
                                      (result, index) => {
                                        return (
                                          <div
                                            className="logs-row"
                                            key={index}>
                                            <div className="log-title-heading-box-center">
                                              <h4>
                                                {parseInt(
                                                  moment
                                                    .duration(
                                                      moment().diff(
                                                        moment(
                                                          moment(
                                                            result.date
                                                          ).format(
                                                            "YYYY-MM-DD"
                                                          ),
                                                          "YYYY-MM-DD"
                                                        ).startOf("day")
                                                      )
                                                    )
                                                    .asDays()
                                                ) === 0
                                                  ? "Today"
                                                  : parseInt(
                                                      moment
                                                        .duration(
                                                          moment().diff(
                                                            moment(
                                                              moment(
                                                                result.date
                                                              ).format(
                                                                "YYYY-MM-DD"
                                                              ),
                                                              "YYYY-MM-DD"
                                                            ).startOf("day")
                                                          )
                                                        )
                                                        .asDays()
                                                    ) === 1
                                                  ? "Yesterday"
                                                  : parseInt(
                                                      moment
                                                        .duration(
                                                          moment().diff(
                                                            moment(
                                                              moment(
                                                                result.date
                                                              ).format(
                                                                "YYYY-MM-DD"
                                                              ),
                                                              "YYYY-MM-DD"
                                                            ).startOf("day")
                                                          )
                                                        )
                                                        .asDays()
                                                    ) !== 0
                                                  ? moment(
                                                      result.date
                                                    ).format(
                                                      "dddd, DD MMMM YYYY"
                                                    )
                                                  : moment(
                                                      result.date
                                                    ).format("dddd, DD MMMM")}
                                              </h4>
                                              {/* <h4>{moment(result.date_created).format('dddd, DD MMMM YYYY')}</h4> */}
                                            </div>
                                            {result.log.map((data, index) => (
                                              // <div
                                              //   className={
                                              //     data.id !== -1
                                              //       ? `${
                                              //           data.is_flag
                                              //             ? "my-student-box active newActive"
                                              //             : "my-student-box active"
                                              //         }`
                                              //       : `${
                                              //           data.is_flag
                                              //             ? "my-student-box newActive"
                                              //             : "my-student-box"
                                              //         }`
                                              //   }>
                                                <div
                                                  // className="log-box log-custom-box"
                                                  className={
                                                    data.is_flag.name!==undefined
                                                      ? `${
                                                          data.is_flag.name
                                                            ? "log-box log-custom-box active newActive"
                                                            : "log-box log-custom-box active"
                                                        }`
                                                      : `${
                                                          data.is_flag.name
                                                            ? "log-box log-custom-box newActive"
                                                            : "log-box log-custom-box"
                                                        }`
                                                  }
                                                  key={index}>
                                                  <div className="log-top-box">
                                                    <div className="log-icon-box">
                                                      <span
                                                        className={`mood-icon mood-${
                                                          data?.mood?.parent
                                                            ?.slug ||
                                                          data.mood.slug
                                                        }-icon`}></span>
                                                    </div>
                                                    <div className="log-text-box-top">
                                                      <div className="log-left-text-box-top">
                                                        <div className="top-user-time-abs">
                                                          <p className="user-text">
                                                            <span className="user-name bold-span">
                                                              {data.username}
                                                              &nbsp;
                                                            </span>
                                                            was{" "}
                                                            {
                                                              data.mood.name
                                                            }{" "}
                                                            {data.is_flag
                                                              .name ? (
                                                              <span>
                                                                about{" "}
                                                                <b>
                                                                  {
                                                                    data
                                                                      .is_flag
                                                                      .name
                                                                  }
                                                                </b>
                                                              </span>
                                                            ) : (
                                                              ""
                                                            )}
                                                            {data.is_topics
                                                              .name ? (
                                                              <span>
                                                                about{" "}
                                                                <b>
                                                                  {
                                                                    data
                                                                      .is_topics
                                                                      .name
                                                                  }
                                                                </b>
                                                              </span>
                                                            ) : (
                                                              ""
                                                            )}
                                                          </p>
                                                          {/* <p className="date-time-text">
                                                          {moment(
                                                            data.date_created
                                                          ).format("hh:mm A")}
                                                        </p> */}
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>

                                                  <div className="log-bottom-box">
                                                    <div className="log-desc-text-box">
                                                      {/* <p>Log text log text log <span className="bold-span">bullying </span>text log text log text log text log text log text log text log text log text log text Log text log text log text log text log text log text log text log text log text log text log text log text.</p> */}
                                                      <p>{data.text}</p>
                                                    </div>
                                                  </div>
                                                  <div className="logDate">
                                                    <h5>
                                                      {moment(
                                                        data.date_created
                                                      ).format("D MMM")}

                                                      <span className="time-span">
                                                        {moment(
                                                          data.date_created
                                                        ).format("h:mma")}
                                                      </span>
                                                    </h5>
                                                  </div>
                                                  <div className="yh_logBox_tag">
                                                    <ul>
                                                      {data.tags &&
                                                      data.tags.length !== 0
                                                        ? data.tags.map(
                                                            (res) => {
                                                              return (
                                                                <li>
                                                                  <span>
                                                                    {res}
                                                                  </span>
                                                                </li>
                                                              );
                                                            }
                                                          )
                                                        : ""}
                                                    </ul>
                                                  </div>
                                                  {console.log("data.mood.name",data.mood.name)}
                                                  <div
                                                    className="play_iconBox"
                                                    style={{
                                                      cursor: "pointer",
                                                    }}
                                                    onClick={() =>
                                                      this.setState({
                                                        isOpenEducatorResponseModal:true
                                                      ,moodtype:data.mood.name})
                                                    }>
                                                    <span>
                                                      <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="21"
                                                        height="21"
                                                        viewBox="0 0 21 21">
                                                        <path
                                                          id="Back_Copy"
                                                          data-name="Back Copy"
                                                          d="M-10.5,21a10.432,10.432,0,0,0,7.425-3.075A10.43,10.43,0,0,0,0,10.5,10.432,10.432,0,0,0-3.075,3.075,10.432,10.432,0,0,0-10.5,0a10.43,10.43,0,0,0-7.424,3.075A10.432,10.432,0,0,0-21,10.5,10.511,10.511,0,0,0-10.5,21ZM-11.894,4.958a1.382,1.382,0,0,1,.854.3L-5.79,9.343a1.432,1.432,0,0,1,.554,1.139A1.432,1.432,0,0,1-5.79,11.62l-5.251,4.086a1.381,1.381,0,0,1-.854.3,1.431,1.431,0,0,1-1.419-1.437V6.4a1.424,1.424,0,0,1,.435-1.038A1.435,1.435,0,0,1-11.894,4.958Z"
                                                          transform="translate(21)"
                                                          fill="#652d90"
                                                        />
                                                      </svg>
                                                    </span>
                                                  </div>

                                                  {data.is_flag.name ? (
                                                    <div className="flag-icon-box-abs">
                                                      {" "}
                                                      <span className="custom-icon flag-icon"></span>
                                                    </div>
                                                  ) : null}
                                                </div>
                                              // </div>
                                            ))}
                                          </div>
                                        );
                                      }
                                    )
                                  : null}
                                <div className="logs-row btn-show-more-root">
                                  {insightData.total_records >
                                    10 && (
                                    <div className="btn-show-more-center">
                                      <div className="text-div">
                                        <p>
                                          5
                                          /
                                          5
                                          Logs
                                        </p>
                                      </div>
                                      <div className="btn-row-div">
                                        {insightData &&
                                        insightData.next_link ? (
                                          <div className="btn-row-div">
                                            <Link
                                              to="#"
                                              className="btn-common btn-show-more"
                                             >
                                              Show more logs
                                            </Link>
                                          </div>
                                        ) : null}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : null}
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
      {this.state.isOpenEducatorResponseModal ? (
          <DemoEducatorResponseView
            show={this.state.isOpenEducatorResponseModal}
            onClose={()=>this.setState({isOpenEducatorResponseModal:false})}
            type={this.state.moodtype}
          />
        ) : (
          ""
        )}
    </div>
  );
  }
}

export default AllLogs;
