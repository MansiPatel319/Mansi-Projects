/* eslint-disable no-unused-expressions */

import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import flaggedLogs from "../../../../assets/images/flaggedLogs.png";
import DateRangePicker from "react-bootstrap-daterangepicker";
import EducatorResponseView from "../../../../containers/Educator/Modal/EducatorResponse";
import Spinner from "../../../Spinner/Spinner";

import "../InsightDashboard.scss";
import FilterComponent from "../FilterComponent";

class FlaggedLogs extends React.Component {
  constructor(props) {
    super(props);
    this.handleApply = this.handleApply.bind(this);
    this.state = {
      selectedClass: props.educator.classDetailData
        ? props.educator.classDetailData["id"]
        : "",
      // startDate: moment().clone().startOf("week"),
      // endDate: moment(),
      startDate:
        props.insightData.insightDateRangeData &&
        props.insightData.insightDateRangeData.startDate
          ? props.educator.selectedTimelineTag === "All Time"
            ? ""
            : props.insightData.insightDateRangeData.startDate
          : props.educator.selectedTimelineTag === "All Time"
          ? ""
          : moment().clone().startOf("week"),
      endDate:
        props.insightData.insightDateRangeData &&
        props.insightData.insightDateRangeData.endDate
          ? props.insightData.insightDateRangeData.endDate
          : moment(),
      page: 1,
      isOpenEducatorResponseModal: false,
      selected_status_id: "",
      // selctedtagList: [],

      // tagList: [
      //   { tid: 0, isChecked: false, text: "Family" },
      //   { tid: 1, isChecked: false, text: "Friends" },
      //   { tid: 2, isChecked: false, text: "Health" },
      //   { tid: 3, isChecked: false, text: "School" },
      //   { tid: 4, isChecked: false, text: "Other" },
      // ],
      keyword_filter: [],
      tags_filter: [],
      selected_timeline_tag: props.educator.selectedTimelineTag || "This Week",
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
  isOpenEducatorResponseModal = () => {
    this.setState({ isOpenEducatorResponseModal: false });
  };

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
          this.getFlaggedLogData();
        } else {
          this.handleSelectMultipleClassOptionSubmit();
        }
      }
    );
  }

  componentDidUpdate(prevState, prevProps) {
    if (
      prevState.startDate &&
      this.props.insightData &&
      prevState.startDate !==
        this.props.insightData.insightDateRangeData.startDate
    ) {
      
      if (this.props.insightData.multipleClass.type === "single") {
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
            this.getFlaggedLogData();
          }
        );
      } else {
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
            this.handleSelectMultipleClassOptionSubmit();
          }
        );
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
      prevProps.utcStartTime !== this.props.insightData.insightDateRangeData.utcStartTime && prevProps.utcEndTime !==  this.props.insightData.insightDateRangeData.utcEndTime
    ) {
      this.setState({
        utcStartTime:this.props.insightData.insightDateRangeData.utcStartTime,
        utcEndTime:this.props.insightData.insightDateRangeData.utcEndTime,
        startAmPm:this.props.insightData.insightDateRangeData.startAmPm,
        endAmPm:this.props.insightData.insightDateRangeData.endAmPm,
        startTimeHour:this.props.insightData.insightDateRangeData.startTimeHour,
        endTimeHour:this.props.insightData.insightDateRangeData.endTimeHour,
        startTimeMin:this.props.insightData.insightDateRangeData.startTimeMin,
        endTimeMin:this.props.insightData.insightDateRangeData.endTimeMin,
        isTimeperiodFilterApplied:this.props.insightData.insightDateRangeData.isTimeperiodFilterApplied,
      },()=>{this.getFlaggedLogData();})
      
    }
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
        if (this.props.insightData) {
          if (this.props.insightData.multipleClass.type === "single") {
            this.getFlaggedLogData();
          } else {
            this.handleSelectMultipleClassOptionSubmit();
          }
        }
      }
    );
  };
  handleuniqlist = (keyword) => {
    var listkeyword = [];
    if(keyword!== undefined){
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
  handleSelectMultipleClassOptionSubmit = () => {
    var ids = this.props.insightData.multipleClass.data
      .map((a) => {
        return a.id;
      })
      .join(",");
    const { tags_filter, keyword_filter } = this.state;
    const params = {
      start_date: this.state.startDate
        ? this.state.startDate.format("YYYY-MM-DD")
        : "",
      end_date: this.state.endDate.format("YYYY-MM-DD"),
      class_id: ids,
      page: this.state.page,
      tags: tags_filter,
      keywords: keyword_filter,
    };

    this.props.getFlaggedLogDataMultiple(params);
  };

  getFlaggedLogData = (value) => {
    // if (this.state.selectedClass) {
    // const classId = this.state.selectedClass;
    const classId = localStorage.getItem("classid");
    const { tags_filter, keyword_filter } = this.state;
    const data = {
      start_date: this.state.startDate
        ? this.state.startDate.format("YYYY-MM-DD")
        : "",
      end_date: this.state.endDate.format("YYYY-MM-DD"),
      class_id: classId,
      page: this.state.page,
      tags: tags_filter,
      keywords: keyword_filter,
      start_time:this.state.utcStartTime,
      end_time:this.state.utcEndTime,
    };
    this.props.setInsightDateRangeData(this.state);
    this.props.getFlaggedLogData(data);
    // this.props.setInsightDateRangeData(this.state);
    // }
  };

  handleNextLogs = (page) => {
    this.setState({ page: page }, () => {
      if (this.props.insightData) {
        if (this.props.insightData.multipleClass.type === "single") {
          this.getFlaggedLogData();
        } else {
          this.handleSelectMultipleClassOptionSubmit();
        }
      }
    });
  };
  // handleChangeCheckbox = (index) => {

  //   let tempTagList = [...this.state.tagList];
  //   tempTagList[index].isChecked = !tempTagList[index].isChecked;
  //   let selectedTagList = [...this.state.selctedtagList];
  //   if (tempTagList[index].isChecked)
  //     selectedTagList.push(tempTagList[index].text);
  //   else selectedTagList.pop(tempTagList[index].text);

  //   this.setState({
  //     tagList: tempTagList,
  //     selctedtagList: selectedTagList,
  //   },()=>{
  //     this.getFlaggedLogData();
  //   });
  // };

  handleKewordFilter = (data) => {
    const update_mood_data = [...this.state.keyword_filter];
    if (this.state.keyword_filter.includes(data)) {
      var index = update_mood_data.indexOf(data)
      update_mood_data.splice(index,1)
      // update_mood_data.pop(data);
    } else {
      update_mood_data.push(data);
    }
    this.setState(
      {
        keyword_filter: update_mood_data,
        page: 1,
      },
      () => {
        if (this.props.insightData) {
          if (this.props.insightData.multipleClass.type === "single") {
            this.getFlaggedLogData();
          } else {
            this.handleSelectMultipleClassOptionSubmit();
          }
        }
      }
    );
  };
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
            this.getFlaggedLogData();
          } else {
            this.handleSelectMultipleClassOptionSubmit();
          }
        }
      }
    );
  };

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
                    this.getFlaggedLogData();
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
              this.getFlaggedLogData();
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
              this.getFlaggedLogData();
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
              this.getFlaggedLogData();
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
              this.getFlaggedLogData();
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
    var start_time = value? value.starttime : ''
    var end_time =value? value.endtime : ''
    this.setState({
      starttime: start_time,
      endtime:end_time,
    }, ()=>{
      this.getFlaggedLogData();
    } )
  }

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
            this.getFlaggedLogData();
          } else {
            this.handleSelectMultipleClassOptionSubmit();
          }
        }
      }
    );
  };

  render() {
    const { educator, insightData } = this.props;
    // const { startDate, endDate } = this.state;
    return (
      <>
        <div className="container-main-root insight-container-main-root insight-dashboard-inner-container">
          {this.props.authenticate.loading ? <Spinner /> : null}
          <div className="container">
            <div className="container-inner-root">
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <div className="yh-tab-header-div">
                    <div className="back-to-group-box">
                      <Link
                        to="/educator/insight-dashboard"
                        className="back-to-link"
                        onClick={() => this.handleSteps(0)}>
                        <span className="back-icon-span">
                          {" "}
                          <span className="custom-icon back-icon"></span>{" "}
                        </span>
                      </Link>
                    </div>
                    <div className="yh-tab-header-center-div">
                      <ul className="tab-list-ul">
                        <li className="tab-item">
                          <Link
                            onClick={() => {
                              this.handleSteps(0);
                              this.props.history.push("/educator/home");
                            }}
                            to="#"
                            className="link">
                            {" "}
                            Admin{" "}
                          </Link>
                        </li>
                        <li className="tab-item active">
                          <Link
                            to="/educator/insight-dashboard"
                            className="link">
                            {" "}
                            Insight{" "}
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="studentView_mainHeading">
                    <h3>Flagged Logs</h3>
                    {console.log("insightData.multipleClass",insightData.multipleClass)}
                    {console.log("insightData.multipleClass=======",insightData?.insightAdminData)}
                    {insightData.multipleClass.type === "multiple" ? (
                      insightData.multipleClass.data.map(
                        (data, index) => {
                          return <h5 key={`$classe_name_{index}`}>{data.name}</h5>;
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
                              <div className="col-lg-3 col-md-3">
                                <FilterComponent
                                  // Handle keyword

                                  keywords
                                  keyword_filter={this.state.keyword_filter}
                                  keywordDetail={
                                    insightData.flaggedLogsData
                                      .class_flag_topics
                                  }
                                  handleKewordFilter={(e, data) =>
                                    this.handleKewordFilter(data)
                                  }
                                  title="Flagged Topics"
                                  // Handle Tags
                                  tag_filter={this.state.tags_filter}
                                  handleChangeTagFilter={(e, data) =>
                                    this.handleTagsFilter(data)
                                  }
                                  // Send start and end date to filter comp
                                  startDate={this.state.startDate}
                                  endDate={this.state.endDate}
                                  selected_tag={
                                    this.state.selected_timeline_tag
                                  }
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
                                setInsightDateRangeDataUpdate={(data)=>{this.props.setInsightDateRangeData(data)}}
                                // handleTimeapplyFunc={this.getIndividualStudentData}
                               
                                />
                                {/* <div
                                  className="yh_log_sidebarWrapper"
                                  style={{ marginTop: "0px" }}
                                >
                                  <div className="yh_list_wrapper">
                                    <div className="yl_list_block yh_timeline_list">
                                      <h3>Timeline</h3>
                                      <ul>
                                        <li>
                                          <p>This Week</p>
                                        </li>
                                        <li>
                                          <p>Last Week</p>
                                        </li>
                                        <li>
                                          <p>30 Days</p>
                                        </li>
                                        <li className="active">
                                          <p>All Time</p>
                                        </li>
                                        <li>
                                          <div className="icon-box date-icon-box">
                                            <DateRangePicker
                                              locale={{ format: "DD MMM YYYY" }}
                                              maxDate={moment().format(
                                                "DD MMM YYYY"
                                              )}
                                              initialSettings={{
                                                startDate: this.props.startDate,
                                                endDate: this.props.endDate,
                                              }}
                                              startDate={this.props.startDate}
                                              endDate={this.props.endDate}
                                              onApply={this.handleApply}
                                            >
                                              <div className="input-inline-group">
                                                <input
                                                  type="text"
                                                  className="form-control form-date"
                                                  id="date-picker-01"
                                                  name="daterange"
                                                  value={`${
                                                    this.props.startDate
                                                      ? this.props.startDate.format(
                                                          "DD MMM YYYY"
                                                        )
                                                      : ""
                                                  } - ${
                                                    this.props.endDate
                                                      ? this.props.endDate.format(
                                                          "DD MMM YYYY"
                                                        )
                                                      : ""
                                                  }`}
                                                  onChange={() =>
                                                    console.log("CHANGE")
                                                  }
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
                                    <div className="yl_list_block yh_mood_list">
                                      <h3 className="red_color">
                                        {" "}
                                        <span className="block">
                                          This Class’
                                        </span>
                                        <span className="block">
                                          Flagged Topics
                                        </span>
                                      </h3>
                                      <ul>
                                        {insightData.flaggedLogsData &&
                                        insightData.flaggedLogsData
                                          .class_flag_topics
                                          ? insightData.flaggedLogsData.class_flag_topics.map(
                                              (log, index) => {
                                                return (
                                                  <li>
                                                    <div className="moodCheckbox_block">
                                                      <input
                                                        type="checkbox"
                                                        name="mood"
                                                        id={`mood${index}`}
                                                        checked
                                                      />
                                                      <label
                                                        for={`mood${index}`}
                                                        key={index}
                                                      >
                                                        {log.keyword__name}
                                                      </label>
                                                    </div>
                                                  </li>
                                                );
                                              }
                                            )
                                          : null}
                                      </ul>
                                    </div>
                                    <div className="yl_list_block yh_tags_list">
                                      <h3>Tags</h3>
                                      <ul>
                                        {this.state.tagList.map((item, i) => (
                                          <li key={item.id}>
                                            <div className="moodCheckbox_block">
                                              <input
                                                type="checkbox"
                                                name={item.tid}
                                                checked={item.isChecked}
                                                id={item.tid}
                                                // onChange={console.log('here :>> ')}
                                                onChange={() =>
                                                  this.handleChangeCheckbox(
                                                    item.tid
                                                  )
                                                }
                                              />
                                              <label for={item.tid}>
                                                {item.text}
                                              </label>
                                            </div>
                                          </li>
                                        ))}
                                      
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                             
                              */}
                              </div>
                              {insightData.flaggedLogsData &&
                              insightData.flaggedLogsData.log_result?.length >
                                0 ? (
                                <div className="col-lg-9 col-md-9">
                                  <div className="center-logs-details">
                                    <div className="logs-row">
                                      {insightData.flaggedLogsData &&
                                      insightData.flaggedLogsData.log_result
                                        ? insightData.flaggedLogsData.log_result.map(
                                            (result, index) => {
                                              var flaglog = this.handleuniqlist(
                                                result.flag_keywords
                                              );
                                              console.log("flaglog", flaglog);
                                              return (
                                                <div
                                                  className="log-box log-custom-box"
                                                  key={index}>
                                                  <div className="log-top-box">
                                                    <div className="log-icon-box">
                                                      <span
                                                        className={`mood-icon mood-${
                                                          result.mood.parent ===
                                                          null
                                                            ? result.mood.slug
                                                            : result.mood.parent
                                                                .slug
                                                        }-icon`}></span>
                                                    </div>
                                                    <div className="log-text-box-top">
                                                      <div className="log-left-text-box-top">
                                                        <p className="user-text">
                                                          <span className="user-name bold-span">
                                                            {result.username}
                                                            &nbsp;
                                                          </span>
                                                          was {result.mood.name}
                                                          &nbsp;about&nbsp;
                                                          {flaglog.length ===
                                                            1 && (
                                                            <b>{flaglog[0]}</b>
                                                          )}
                                                          {flaglog.length ===
                                                            2 && (
                                                              <span>
                                                              <b>{`${flaglog[0]}`}</b>&nbsp;and&nbsp;
                                                              <b>{`${flaglog[1]}`}</b>
                                                            </span>
                                                            // <b>{`${flaglog[0]} and ${flaglog[1]}`}</b>
                                                          )}
                                                          {flaglog.length >=
                                                            3 &&
                                                            
                                                            this.handleflagkeyword(
                                                              flaglog
                                                            )}
                                                          
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="log-bottom-box">
                                                    <div className="log-desc-text-box">
                                                      <p>
                                                        {result.text}
                                                        {/* <span className="bold-span">bullying</span> */}
                                                      </p>
                                                    </div>
                                                  </div>
                                                  <div className="logDate">
                                                    <h5>
                                                      {moment(
                                                        result.date_created
                                                      ).format("D MMM")}
                                                      <span className="time-span">
                                                        {moment(
                                                          new Date(
                                                            result.web_utc
                                                          ),
                                                          "hh:mm A"
                                                        ).format("h:mma")}
                                                        {/* {moment(
                                                          result.date_created
                                                        ).format("h:mma")} */}
                                                      </span>
                                                    </h5>
                                                  </div>
                                                  <div className="yh_logBox_tag">
                                                    <ul>
                                                      {result.tags &&
                                                      result.tags.length !== 0
                                                        ? result.tags.map(
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

                                                  <div className="flag-icon-box-abs">
                                                    <span className="custom-icon flag-icon"></span>
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
                                                          result.status_id,
                                                      })
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
                                                </div>
                                              );
                                            }
                                          )
                                        : null}
                                    </div>

                                    <div className="logs-row btn-show-more-root">
                                      {insightData.flaggedLogsData
                                        .total_records > 10 && (
                                        <div className="btn-show-more-center">
                                          <div className="text-div">
                                            <p>
                                              {insightData.flaggedLogsData &&
                                              insightData.flaggedLogsData
                                                .log_result
                                                ? insightData.flaggedLogsData
                                                    .per_page
                                                : ""}
                                              /
                                              {insightData.flaggedLogsData &&
                                              insightData.flaggedLogsData
                                                .log_result
                                                ? insightData.flaggedLogsData
                                                    .total_records
                                                : ""}{" "}
                                              Logs
                                            </p>
                                          </div>
                                          {insightData.flaggedLogsData &&
                                          insightData.flaggedLogsData
                                            .next_link ? (
                                            <div className="btn-row-div">
                                              <Link
                                                to="#"
                                                className="btn-common btn-show-more"
                                                onClick={() => {
                                                  this.handleNextLogs(
                                                    insightData.flaggedLogsData
                                                      .current_page + 1
                                                  );
                                                }}>
                                                Show more logs
                                              </Link>
                                            </div>
                                          ) : null}
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
                                          src={flaggedLogs}
                                          alt="flaggedLogs"
                                        />
                                      </div>
                                      {/* <h3>No flagged topics yet!</h3> */}
                                      <h3>No Flagged Logs!</h3>
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
      </>
    );
  }
}

export default FlaggedLogs;
