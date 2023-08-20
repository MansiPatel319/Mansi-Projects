/* eslint-disable no-unused-expressions */
import React from "react";
import { Link } from "react-router-dom";

import moment from "moment";
import Spinner from "../../../Spinner/Spinner";
import emptyState2 from "../../../../assets/images/emptyState2.png";

import "../InsightDashboard.scss";
import FilterComponent from "../FilterComponent";
import EducatorResponseView from "../../../../containers/Educator/Modal/EducatorResponse";

class AllLogs extends React.Component {
  constructor(props) {
    super(props);
    this.handleApply = this.handleApply.bind(this);
    this.state = {
      selectedClass: this.props.educator.classList[0]
        ? this.props.educator.classList[0]["id"]
        : "",
      selectedClassName: this.props.educator.classList[0]
        ? this.props.educator.classList[0]["name"]
        : "",
      // startDate: moment().clone().startOf("week"),
      // endDate: moment(),
      startDate:
        props.insightData.insightDateRangeData &&
        props.insightData.insightDateRangeData.startDate
          ? props.insightData.insightDateRangeData.startDate
          : moment().clone().startOf("week"),
      endDate:
        props.insightData.insightDateRangeData &&
        props.insightData.insightDateRangeData.endDate
          ? props.insightData.insightDateRangeData.endDate
          : moment(),
      page: 1,
      isOpenEducatorResponseModal: false,
      selected_status_id: "",
      mood_filter: [],
      tags_filter: [],
      selected_timeline_tag: props.educator.selectedTimelineTag || "This Week",
      is_flagged: false,
      startTime:
        props.insightData.insightDateRangeData &&
        props.insightData.insightDateRangeData.startTime
          ? props.insightData.insightDateRangeData.startTime
          : undefined,
      endTime:
        props.insightData.insightDateRangeData &&
        props.insightData.insightDateRangeData.endTime
          ? props.insightData.insightDateRangeData.endTime
          : undefined,
      startAmPm:
        props.insightData.insightDateRangeData &&
        props.insightData.insightDateRangeData.startAmPm
          ? props.insightData.insightDateRangeData.startAmPm
          : undefined,
      endAmPm:
        props.insightData.insightDateRangeData &&
        props.insightData.insightDateRangeData.endAmPm
          ? props.insightData.insightDateRangeData.endAmPm
          : undefined,
      startTimeHour:
        props.insightData.insightDateRangeData &&
        props.insightData.insightDateRangeData.startTimeHour
          ? props.insightData.insightDateRangeData.startTimeHour
          : undefined,
      startTimeMin:
        props.insightData.insightDateRangeData &&
        props.insightData.insightDateRangeData.startTimeMin
          ? props.insightData.insightDateRangeData.startTimeMin
          : undefined,
      endTimeHour:
        props.insightData.insightDateRangeData &&
        props.insightData.insightDateRangeData.endTimeHour
          ? props.insightData.insightDateRangeData.endTimeHour
          : undefined,
      endTimeMin:
        props.insightData.insightDateRangeData &&
        props.insightData.insightDateRangeData.endTimeMin
          ? props.insightData.insightDateRangeData.endTimeMin
          : undefined,
      isTimeperiodFilterApplied:
        props.insightData.insightDateRangeData &&
        props.insightData.insightDateRangeData.isTimeperiodFilterApplied
          ? props.insightData.insightDateRangeData.isTimeperiodFilterApplied
          : undefined,
      utcStartTime:
        props.insightData.insightDateRangeData &&
        props.insightData.insightDateRangeData.utcStartTime
          ? props.insightData.insightDateRangeData.utcStartTime
          : undefined,
      utcEndTime:
        props.insightData.insightDateRangeData &&
        props.insightData.insightDateRangeData.utcEndTime
          ? props.insightData.insightDateRangeData.utcEndTime
          : undefined,
    };
  }
  componentDidUpdate(prevState, prevProps) {
    if (
      prevState.startDate &&
      this.props.insightData &&
      prevState.startDate !==
        this.props.insightData.insightDateRangeData.startDate
    ) {
      if (this.props.insightData.multipleClass.type === "single") {
        this.getAllLogData();
      } else {
        this.handleSelectMultipleClassOptionSubmit();
      }
    }
    if (
      prevProps.selected_timeline_tag !==
      this.props.educator.selectedTimelineTag
    ) {
      this.setState({
        selected_timeline_tag: this.props.educator.selectedTimelineTag,
      });
    }
    if (
      prevProps.utcStartTime !==
        this.props.insightData.insightDateRangeData.utcStartTime &&
      prevProps.utcEndTime !==
        this.props.insightData.insightDateRangeData.utcEndTime
    ) {
      this.setState(
        {
          utcStartTime:this.props.insightData.insightDateRangeData.utcStartTime,
          utcEndTime:this.props.insightData.insightDateRangeData.utcEndTime,
          startAmPm:this.props.insightData.insightDateRangeData.startAmPm,
          endAmPm:this.props.insightData.insightDateRangeData.endAmPm,
          startTimeHour:this.props.insightData.insightDateRangeData.startTimeHour,
          endTimeHour:this.props.insightData.insightDateRangeData.endTimeHour,
          startTimeMin:this.props.insightData.insightDateRangeData.startTimeMin,
          endTimeMin:this.props.insightData.insightDateRangeData.endTimeMin,
          isTimeperiodFilterApplied:this.props.insightData.insightDateRangeData.isTimeperiodFilterApplied,
        },
        () => {
          this.getAllLogData();
        }
      );
    }
  }
  componentDidMount() {
    localStorage.setItem("const_url", "");
    this.setState(
      {
        startDate:
          this.props.insightData.insightDateRangeData &&
          this.props.insightData.insightDateRangeData.startDate
            ? this.props.educator.selectedTimelineTag === "All Time"
              ? ""
              : this.props.insightData.insightDateRangeData.startDate
            : this.props.educator.selectedTimelineTag === "All Time"
            ? ""
            : moment().clone().startOf("week"),
      },
      () => {
        if (this.props.insightData.multipleClass.type === "single") {
          this.getAllLogData();
        } else {
          this.handleSelectMultipleClassOptionSubmit();
        }
      }
    );
  }

  handleSteps = (step) => {
    this.props.setInsightDashboardStepCount(step);
  };

  handleApply = (event, picker) => {
    this.setState(
      {
        startDate: picker.startDate,
        endDate: picker.endDate,
      },
      () => {
        this.props.setInsightDateRangeData(this.state);
        this.props.setTimelineTag("");
        if (this.props.insightData) {
          if (this.props.insightData.multipleClass.type === "single") {
            this.getAllLogData();
          } else {
            this.handleSelectMultipleClassOptionSubmit();
          }
        }
      }
    );
  };

  getAllLogData = () => {
    // const classId = this.state.selectedClass;
    const classId = localStorage.getItem("classid");

    const data = {
      start_date: this.state.startDate
        ? this.state.startDate.format("YYYY-MM-DD")
        : "",
      end_date: this.state.endDate.format("YYYY-MM-DD"),
      class_id: classId !== "undefined" ? classId : this.state.selectedClass,
      page: this.state.page,
      moods: this.state.mood_filter,
      tags: this.state.tags_filter,
      is_flag: this.state.is_flagged,
      start_time:this.state.utcStartTime,
      end_time:this.state.utcEndTime,
    };
    this.props.setInsightDateRangeData(this.state);
    this.props.getAllLogData(data);
  };

  handleSelectMultipleClassOptionSubmit = () => {
    var ids = this.props.insightData.multipleClass.data
      .map((a) => {
        return a.id;
      })
      .join(",");
    const params = {
      start_date: this.state.startDate
        ? this.state.startDate.format("YYYY-MM-DD")
        : "",
      end_date: this.state.endDate.format("YYYY-MM-DD"),
      class_id: ids,
      page: this.state.page,
      moods: this.state.mood_filter,
      tags: this.state.tags_filter,
      is_flag: this.state.is_flagged,
    };

    this.props.getAllLogDataMultiple(params);
  };

  handleNextLogs = (page) => {
    this.setState({ page: page }, () => {
      if (this.props.insightData) {
        if (this.props.insightData.multipleClass.type === "single") {
          this.getAllLogData();
        } else {
          this.handleSelectMultipleClassOptionSubmit();
        }
      }
    });
  };
  handleuniqlist = (keyword) => {
    var listkeyword = [];
    if (keyword !== undefined) {
      keyword.map((data, index) => {
        listkeyword.push(data.name);
      });
      let uniqueChars = [];
      listkeyword.forEach((c) => {
        if (!uniqueChars.includes(c)) {
          uniqueChars.push(c);
        }
      });
      return uniqueChars;
    }
  };

  handlepopularuniqlist = (keyword) => {
    var listkeyword = [];
    if (keyword !== undefined) {
      keyword.map((data, index) => {
        listkeyword.push(data.name);
      });
      let uniqueChars = [];
      listkeyword.forEach((c) => {
        if (!uniqueChars.includes(c)) {
          uniqueChars.push(c);
        }
      });
      console.log(uniqueChars, "uniqueChars");
      return uniqueChars;
    }
  };

  handleflagkeyword = (keyword) => {
    var output = [];
    keyword.forEach(function (role, i) {
      if (keyword.length > 1 && i === keyword.length - 1) output.push("and ");
      output.push(<b>{role}</b>);
      if (keyword.length > 2 && i < keyword.length - 2) output.push(",");
      if (keyword.length > 1 && i < keyword.length - 1) output.push(" ");
    });
    return output;
  };

  handlepopularkeyword = (keyword) => {
    var output = [];
    keyword.forEach(function (role, i) {
      if (keyword.length > 1 && i === keyword.length - 1) output.push("and ");
      output.push(<b>{role}</b>);
      if (keyword.length > 2 && i < keyword.length - 2) output.push(",");
      if (keyword.length > 1 && i < keyword.length - 1) output.push(" ");
    });
    return output;
  };
  isOpenEducatorResponseModal = () => {
    this.setState({ isOpenEducatorResponseModal: false });
  };

  // Handle mood filter
  handleMoodFilter = (data) => {
    const update_mood_data = [...this.state.mood_filter];
    if (this.state.mood_filter.includes(data)) {
      var index = update_mood_data.indexOf(data, 0);
      update_mood_data.splice(index, 1);
    } else {
      update_mood_data.push(data);
    }
    this.setState(
      {
        mood_filter: update_mood_data,
        page: 1,
      },
      () => {
        if (this.props.insightData) {
          if (this.props.insightData.multipleClass.type === "single") {
            this.getAllLogData();
          } else {
            this.handleSelectMultipleClassOptionSubmit();
          }
        }
      }
    );
  };

  // Handle tag filters
  handleTagsFilter = (data) => {
    const update_tag_data = [...this.state.tags_filter];
    if (this.state.tags_filter.includes(data)) {
      var index = update_tag_data.indexOf(data, 0);
      update_tag_data.splice(index, 1);
    } else {
      update_tag_data.push(data);
    }
    this.setState(
      {
        tags_filter: update_tag_data,
        page: 1,
      },
      () => {
        if (this.props.insightData) {
          if (this.props.insightData.multipleClass.type === "single") {
            this.getAllLogData();
          } else {
            this.handleSelectMultipleClassOptionSubmit();
          }
        }
      }
    );
  };

  // Handle Flagged filter
  handleIsFlaggedFilter = () => {
    this.setState(
      {
        is_flagged: !this.state.is_flagged,
        page: 1,
      },
      () => {
        if (this.props.insightData) {
          if (this.props.insightData.multipleClass.type === "single") {
            this.getAllLogData();
          } else {
            this.handleSelectMultipleClassOptionSubmit();
          }
        }
      }
    );
  };

  // Handle selected timeline tag
  handleSelectedTimeLine = (data) => {
    this.setState({ selected_timeline_tag: data });
    if (data === "Today") {
            this.setState(
              {
                startDate: moment(),
                endDate: moment(),
                page: 1,
              },
              () => {
                if (this.props.insightData) {
                  if (this.props.insightData.multipleClass.type === "single") {
                    this.getAllLogData();
                  } else {
                    this.handleSelectMultipleClassOptionSubmit();
                  }
                }
              }
            );
    
          }
      
    if (data === "This Week") {
      this.setState(
        {
          startDate: moment().clone().startOf("week"),
          endDate: moment(),
          page: 1,
        },
        () => {
          if (this.props.insightData) {
            if (this.props.insightData.multipleClass.type === "single") {
              this.getAllLogData();
            } else {
              this.handleSelectMultipleClassOptionSubmit();
            }
          }
        }
      );
    }
    if (data === "Last Week") {
      var currentDate = moment().subtract(1, "week");
      this.setState(
        {
          startDate: currentDate.clone().startOf("week"),
          endDate: currentDate.clone().endOf("week"),
          page: 1,
        },
        () => {
          if (this.props.insightData) {
            if (this.props.insightData.multipleClass.type === "single") {
              this.getAllLogData();
            } else {
              this.handleSelectMultipleClassOptionSubmit();
            }
          }
        }
      );
    }
    if (data === "30 days") {
      this.setState(
        {
          startDate: moment().subtract(30, "days"),
          endDate: moment(),
          page: 1,
        },
        () => {
          if (this.props.insightData) {
            if (this.props.insightData.multipleClass.type === "single") {
              this.getAllLogData();
            } else {
              this.handleSelectMultipleClassOptionSubmit();
            }
          }
        }
      );
    }
    if (data === "All Time") {
      this.setState(
        {
          startDate: "",
          endDate: moment(),
          page: 1,
        },
        () => {
          if (this.props.insightData) {
            if (this.props.insightData.multipleClass.type === "single") {
              this.getAllLogData();
            } else {
              this.handleSelectMultipleClassOptionSubmit();
            }
          }
        }
      );
    }
    this.props.setTimelineTag(data);
  };

  setTimedata = (value) => {
    var start_time = value ? value.starttime : "";
    var end_time = value ? value.endtime : "";
    this.setState(
      {
        starttime: start_time,
        endtime: end_time,
      },
      () => {
        this.getAllLogData();
      }
    );
  };

  // Handle Picker Dates
  handlePickerDates = (startDates, endDates) => {
    this.setState({ selected_timeline_tag: "" });
    this.setState(
      {
        startDate: startDates,
        endDate: endDates,
        page: 1,
      },
      () => {
        if (this.props.insightData) {
          if (this.props.insightData.multipleClass.type === "single") {
            this.getAllLogData();
          } else {
            this.handleSelectMultipleClassOptionSubmit();
          }
        }
      }
    );
  };

  render() {
    const { educator, insightData } = this.props;
    return (
      <div className="container-main-root insight-container-main-root insight-dashboard-inner-container">
        {this.props.authenticate.loading ? <Spinner /> : null}
        <div className="container">
          <div className="container-inner-root">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="yh-tab-header-div">
                  <div className="yh-tab-header-center-div">
                    <div className="back-to-group-box">
                      <Link
                        to="#"
                        className="back-to-link"
                        onClick={() => this.handleSteps(0)}
                      >
                        <span className="back-icon-span">
                          {" "}
                          <span className="custom-icon back-icon"></span>{" "}
                        </span>
                      </Link>
                    </div>
                    <ul className="tab-list-ul">
                      <li className="tab-item">
                        <Link
                          onClick={() => {
                            this.handleSteps(0);
                            this.props.history.push("/educator/home");
                          }}
                          to="#"
                          className="link"
                        >
                          {" "}
                          Admin{" "}
                        </Link>
                      </li>
                      <li className="tab-item active">
                        <Link
                          to="#"
                          onClick={() => this.handleSteps(0)}
                          className="link"
                        >
                          {" "}
                          Insight{" "}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="studentView_mainHeading">
                  <h3>Mood Journal</h3>
                  {insightData.multipleClass.type === "multiple" ? (
                    insightData.insightAdminData?.class_name.map(
                      (data, index) => {
                        return <h5 key={`$classe_name_{index}`}>{data}</h5>;
                      }
                    )
                  ) : educator.classDetailData ? (
                    <h5>{educator.classDetailData["name"]}</h5>
                  ) : (
                    <h5></h5>
                  )}
                </div>
                <div className="main-dashboard-body main-insight-dashboard-body">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 mb-4">
                      <div className="logs-detail-main-div student-view-logs-detail-main-div">
                        <div className="center-detail-main-root">
                          <div className="row">
                            {/* Filter */}
                            <div className="col-lg-3 col-md-3">
                              <FilterComponent
                                // Handle moods
                                mood_filter={this.state.mood_filter}
                                handleChangeMoodFilter={(e, data) =>
                                  this.handleMoodFilter(data)
                                }
                                // Handle Tags
                                tag_filter={this.state.tags_filter}
                                handleChangeTagFilter={(e, data) =>
                                  this.handleTagsFilter(data)
                                }
                                // Send start and end date to filter comp
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                // Handle Flagged fitler
                                is_flag={this.state.is_flagged}
                                handleIsFlagged={this.handleIsFlaggedFilter}
                                // Handle Timeline tag
                                selected_tag={this.state.selected_timeline_tag}
                                handleTimelineTag={(e, data) =>
                                  this.handleSelectedTimeLine(data)
                                }
                                // Handle picker filter
                                handlePickerDataFilter={(
                                  startDates,
                                  endDates
                                ) =>
                                  this.handlePickerDates(startDates, endDates)
                                }
                                // timeapply filter handler
                                startAmPm={this.state.startAmPm}
                                endAmPm={this.state.endAmPm}
                                startTimeHour={this.state.startTimeHour}
                                startTimeMin={this.state.startTimeMin}
                                endTimeHour={this.state.endTimeHour}
                                endTimeMin={this.state.endTimeMin}
                                isTimeperiodFilterApplied={
                                  this.state.isTimeperiodFilterApplied
                                }
                                startTime={this.state.startTime}
                                endTime={this.state.endTime}
                                utcStartTime={this.state.utcStartTime}
                                utcEndTime={this.state.utcEndTime}
                                setInsightDateRangeDataUpdate={(data) => {
                                  this.props.setInsightDateRangeData(data);
                                }}
                                // handleTimeapplyFunc={this.getIndividualStudentData}
                              />
                            </div>
                            {/* Filter end */}
                            {console.log(
                              "insightData.allLogsData.log_result",
                              insightData.allLogsData.log_result
                            )}
                            {insightData.allLogsData &&
                            insightData.allLogsData.log_result &&
                            insightData.allLogsData.log_result.length !== 0 ? (
                              <div className="col-lg-9 col-md-9">
                                <div className="center-logs-details">
                                  {console.log(
                                    "insightData.allLogsData.log_result",
                                    insightData.allLogsData.log_result
                                  )}
                                  {insightData.allLogsData &&
                                  insightData.allLogsData.log_result
                                    ? insightData.allLogsData.log_result.map(
                                        (result, index) => {
                                          return (
                                            <div
                                              className="logs-row"
                                              key={index}
                                            >
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
                                              {result.log.map((data, index) => {
                                                var flaglog =
                                                  this.handleuniqlist(
                                                    data.flag_keywords
                                                  );
                                                var popularlog =
                                                  this.handlepopularuniqlist(
                                                    data.popular_keywords
                                                  );
                                                return (
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
                                                      data.is_flag.name !==
                                                      undefined
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
                                                    key={index}
                                                  >
                                                    <div className="log-top-box">
                                                      <div className="log-icon-box">
                                                        <span
                                                          className={`mood-icon mood-${
                                                            data?.mood?.parent
                                                              ?.slug ||
                                                            data.mood.slug
                                                          }-icon`}
                                                        ></span>
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
                                                                  {flaglog.length ===
                                                                    1 && (
                                                                    <b>
                                                                      {
                                                                        flaglog[0]
                                                                      }
                                                                    </b>
                                                                  )}
                                                                  {flaglog.length ===
                                                                    2 && (
                                                                    <span>
                                                                      <b>{`${flaglog[0]}`}</b>
                                                                      &nbsp;and&nbsp;
                                                                      <b>{`${flaglog[1]}`}</b>
                                                                    </span>
                                                                    // <b>{`${flaglog[0]} and ${flaglog[1]}`}</b>
                                                                  )}
                                                                  {flaglog.length >=
                                                                    3 &&
                                                                    this.handleflagkeyword(
                                                                      flaglog
                                                                    )}
                                                                </span>
                                                              ) : (
                                                                ""
                                                              )}
                                                              {data.is_topics
                                                                .name ? (
                                                                <span>
                                                                  about{" "}
                                                                  {popularlog.length ===
                                                                    1 && (
                                                                    <b>
                                                                      {
                                                                        popularlog[0]
                                                                      }
                                                                    </b>
                                                                  )}
                                                                  {popularlog.length ===
                                                                    2 && (
                                                                    <span>
                                                                      <b>{`${popularlog[0]}`}</b>
                                                                      &nbsp;and&nbsp;
                                                                      <b>{`${popularlog[1]}`}</b>
                                                                    </span>
                                                                    // <b>{`${popularlog[0]}</b> and <b> and ${popularlog[1]}`}</b>
                                                                  )}
                                                                  {popularlog.length >=
                                                                    3 &&
                                                                    this.handlepopularkeyword(
                                                                      popularlog
                                                                    )}
                                                                </span>
                                                              ) : (
                                                                ""
                                                              )}
                                                              {/* {data.is_topics
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
                                                              )} */}
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
                                                        {/* {moment(
                                                          data.date_created
                                                        ).format("D MMM")} */}

                                                        {/* <span className="time-span"> */}
                                                        {moment(
                                                          new Date(
                                                            data.web_utc
                                                          ),
                                                          "hh:mm A"
                                                        ).format("h:mma")}
                                                        {/* {moment(
                                                            data.date_created
                                                          ).format("h:mma")} */}
                                                        {/* </span> */}
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
                                                    <div
                                                      className="play_iconBox"
                                                      style={{
                                                        cursor: "pointer",
                                                      }}
                                                      onClick={() =>
                                                        this.setState({
                                                          isOpenEducatorResponseModal:
                                                            !this.state
                                                              .isOpenEducatorResponseModal,
                                                          selected_status_id:
                                                            data.status_id,
                                                        })
                                                      }
                                                    >
                                                      <span>
                                                        <svg
                                                          xmlns="http://www.w3.org/2000/svg"
                                                          width="21"
                                                          height="21"
                                                          viewBox="0 0 21 21"
                                                        >
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
                                                );
                                              })}
                                            </div>
                                          );
                                        }
                                      )
                                    : null}
                                  <div className="logs-row btn-show-more-root">
                                    {insightData.allLogsData.total_records >
                                      10 && (
                                      <div className="btn-show-more-center">
                                        <div className="text-div">
                                          <p>
                                            {insightData.allLogsData &&
                                            insightData.allLogsData.log_result
                                              ? insightData.allLogsData.per_page
                                              : ""}
                                            /
                                            {insightData.allLogsData &&
                                            insightData.allLogsData.log_result
                                              ? insightData.allLogsData
                                                  .total_records
                                              : ""}{" "}
                                            Logs
                                          </p>
                                        </div>
                                        <div className="btn-row-div">
                                          {insightData.allLogsData &&
                                          insightData.allLogsData.next_link ? (
                                            <div className="btn-row-div">
                                              <Link
                                                to="#"
                                                className="btn-common btn-show-more"
                                                onClick={() => {
                                                  this.handleNextLogs(
                                                    insightData.allLogsData
                                                      .current_page + 1
                                                  );
                                                }}
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
                            ) : (
                              <div className="col-lg-9 col-md-9">
                                <div className="emptyState_wrapper">
                                  <div className="emptyState_inner">
                                    <div className="emptyState_image">
                                      <img
                                        src={emptyState2}
                                        alt="emptyState2"
                                      />
                                    </div>
                                    <h3>
                                      {/* Your students have not started to log
                                      their moods yet! */}
                                      You have no mood logs to view!
                                    </h3>
                                  </div>
                                </div>
                              </div>
                            )}
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
          <EducatorResponseView
            show={this.state.isOpenEducatorResponseModal}
            onClose={this.isOpenEducatorResponseModal}
            props={this.props}
            selectedStatus={this.state.selected_status_id}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default AllLogs;
