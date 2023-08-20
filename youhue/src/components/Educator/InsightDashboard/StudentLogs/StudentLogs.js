/* eslint-disable no-unused-expressions */
import React from "react";
import { Link } from "react-router-dom";
// import DateRangePicker from "react-bootstrap-daterangepicker";
import moment from "moment";
import { Doughnut } from "react-chartjs-2";
import EducatorResponseView from "../../../../containers/Educator/Modal/EducatorResponse";
import { moodByDayDataSets } from "../../../../utils/constant";
import Spinner from "../../../Spinner/Spinner";
import "../InsightDashboard.scss";
import FilterComponent from "../FilterComponent";
import * as rdd from "react-device-detect";
import emptyState2 from "../../../../assets/images/emptyState2.png";
import Skeleton from "react-loading-skeleton";
import { param } from "jquery";

class StudentLogs extends React.Component {
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
      studentId: props.insightData.selectedStudentData,
      page: 1,
      mood_filter: [],
      tags_filter: [],
      selected_timeline_tag: props.educator.selectedTimelineTag || "This Week",
      is_flagged: false,
      isOpenEducatorResponseModal: false,
      selected_status_id: "",
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
     
      this.getIndividualStudentData();
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
       
      },()=>{this.getIndividualStudentData();})
      
    }
    if (
      prevProps.selected_timeline_tag !==
      this.props.educator.selectedTimelineTag
    ) {
      this.setState({
        selected_timeline_tag: this.props.educator.selectedTimelineTag,
      });
    }
  }
  componentDidMount() {
    localStorage.setItem("const_url", "");
    this.getIndividualStudentData();
  }

  handleSteps = (step) => {
    this.props.setInsightDashboardStepCount(step);
    this.props.setAdminDashboardStepCount(step);
  };

  handleApply = (event, picker) => {
    this.setState(
      {
        startDate: picker.startDate,
        endDate: picker.endDate,
        page: 1,
      },
      () => {
        this.props.setInsightDateRangeData(this.state);
        this.getIndividualStudentData();
      }
    );
  };
  handleuniqlist = (keyword) => {
    var listkeyword = [];
    let uniqueChars = [];
    if (keyword !== undefined) {
      keyword.map((data, index) => {
        listkeyword.push(data.name);
      });
      listkeyword.forEach((c) => {
        if (!uniqueChars.includes(c)) {
          uniqueChars.push(c);
        }
      });
    }

    return uniqueChars;
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

  handleMoodFilter = (data) => {
    const update_mood_data = [...this.state.mood_filter];
    if (this.state.mood_filter.includes(data)) {
      update_mood_data.pop(data);
    } else {
      update_mood_data.push(data);
    }
    this.setState(
      {
        mood_filter: update_mood_data,
        page: 1,
      },
      () => {
        this.getIndividualStudentData();
      }
    );
  };

  getIndividualStudentData = () => {
    const classId = localStorage.getItem("studentclassid");
    // if(this.state.selectedclassName===undefined)
    // const classId = this.state.selectedClass;
    const data = {
      start_date: this.state.startDate
        ? this.props.educator.selectedTimelineTag === "All Time"
          ? ""
          : this.state.startDate.format("YYYY-MM-DD")
        : "",
      end_date: this.state.endDate.format("YYYY-MM-DD"),
      class_id: classId,
      student_id: this.state.studentId,
      page: this.state.page,
      moods: this.state.mood_filter,
      tags: this.state.tags_filter,
      is_flag: this.state.is_flagged,
      start_time:this.state.utcStartTime,
      end_time:this.state.utcEndTime,
    };
    this.props.setInsightDateRangeData(this.state);
    this.props.getIndividualStudentData(data);
  };

  handleNextLogs = (page) => {
    this.setState({ page: page }, () => {
      this.getIndividualStudentData();
    });
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
        this.getIndividualStudentData();
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
        this.getIndividualStudentData();
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
        this.getIndividualStudentData();
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
          this.getIndividualStudentData();
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
          this.getIndividualStudentData();
        }
      );
      console.log(this.state,"aaaaaaaaaa")
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
          this.getIndividualStudentData();
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
          this.getIndividualStudentData();
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
          this.getIndividualStudentData();
        }
      );
    }
    this.props.setTimelineTag(data);
  };

  // Handle Picker Dates
  getMoodByDayDatasets = () => {
    const { insightData } = this.props;
    let dataSets = moodByDayDataSets;
    if (
      insightData.insightAdminData &&
      insightData.insightAdminData.mood_by_day
    ) {
      let moodByDay = insightData.insightAdminData.mood_by_day;
      dataSets.map(
        (res) =>
          (res.data = Object.keys(moodByDay).map(function (el) {
            return moodByDay[el][res.label];
          }))
      );
    }
    return dataSets;
  };
  handlePickerDates = (startDates, endDates) => {
    this.setState({ selected_timeline_tag: "" });
    this.setState(
      {
        startDate: startDates,
        endDate: endDates,
        page: 1,
      },
      () => {
        this.getIndividualStudentData();
      }
    );
  };
  getMoodData = () => {
    const { insightData } = this.props;
    let data = [];
    if (
      insightData.individualStudentData &&
      insightData.individualStudentData.mood
    ) {
      data = Object.values(insightData.individualStudentData.mood);
    }
    return data;
  };

  getMoodLables = () => {
    const { insightData } = this.props;
    let data = [];
    if (
      insightData.individualStudentData &&
      insightData.individualStudentData.mood
    ) {
      data = Object.keys(insightData.individualStudentData.mood);
    }
    return data;
  };
  getMoodByDayLables = () => {
    const { insightData } = this.props;
    let data = [];
    if (
      insightData.insightAdminData &&
      insightData.insightAdminData.mood_by_day
    ) {
      data = Object.keys(insightData.insightAdminData.mood_by_day);
      data = data.map((date) => moment(date).format("ddd, DD MMM"));
    }
    return data;
  };
  render() {
    console.log(this.state,"state")
    console.log(this.props,"state")
    // const { educator, insightData } = this.props;
    const { insightData } = this.props;
    // const { startDate, endDate } = this.state;
    const DoughnutChartPlugin = {
      beforeDraw: function (chart) {
        chart.canvas.parentNode.style.width = rdd.isTablet ? "380px" : "220px";
        chart.canvas.parentNode.style.width = rdd.isTablet ? "280px" : "380px";
        let width = chart.chart.width,
          height = chart.chart.height,
          ctx = chart.chart.ctx;
        ctx.restore();
        let fontSize = (height / 114).toFixed(2);
        ctx.font = fontSize + "em Omnes";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#713C97";
        let text = chart.options.centertext;
        let textTwo = chart.options.centertext2;
        let textX = Math.round((width - ctx.measureText(text).width) / 2);
        let textY = height / 2.3;
        let textX1 = Math.round((width - ctx.measureText(textTwo).width) / 2);
        ctx.fillText(text, textX, textY);
        ctx.fillText(textTwo, textX1, textY + 20);
        ctx.save();
      },
    };
    const borderColor = [
      "#A04F18",
      "#891818",
      "#991C5B",
      "#3976C0",
      "#652D90",
      "#126D2B",
      "#87259C",
      "#841238",
      "#1D499D",
    ];
    const moodData = {
      labels: this.getMoodLables(),
      datasets: [
        {
          label: "Moods",
          backgroundColor: [
            "#FFAE01",
            "#F87D27",
            "#DF6FA0",
            "#69CDF4",
            "#BFA8EA",
            "#84CB8B",
            "#D290DC",
            "#d25e75",
            "#6F9AF7",
          ],
          data: this.getMoodData(),
          hoverBackgroundColor: [
            "#FFAE01",
            "#F87D27",
            "#DF6FA0",
            "#69CDF4",
            "#BFA8EA",
            "#84CB8B",
            "#D290DC",
            "#d25e75",
            "#6F9AF7",
          ],
        },
      ],
    };
    const moodDataOptions = {
      centertext:
        insightData.individualStudentData &&
        insightData.individualStudentData?.total_logs
          ? insightData.individualStudentData.total_logs
          : 0,
      centertext2: "logs",
      legend: {
        display: false,
      },
      responsive: true,
      maintainAspectRatio: true,
      cutoutPercentage: 70, // inner radius,
      borderWidth: "0",
      tooltips: {
        mode: "label",
        backgroundColor: "#ffffff",
        borderWidth: 1,
        displayColors: false,
        alignItems: "left",
        justifyContent: "space-between",
        titleFontStyle: "normal",
        minWidth: "120px",
        maxWidth: "120px",
        titleAlign: "center",
        bodyAlign: "left",
        padding: 100,
        callbacks: {
          title: function (tooltipItem, data) {
            let moodName = data.labels[tooltipItem[0]["index"]];
            let subMoods =
              insightData?.individualStudentData?.sub_mood[moodName];
            let moodCount = "";
            Object.keys(subMoods).map((data, index) => {
              if (index === 1) {
                moodCount = subMoods[data];
              }
            });
            return moodCount + " logs";
          },
          label: function (tooltipItem, data) {
            let moodName = data.labels[tooltipItem["index"]];
            let subMoods =
              insightData?.individualStudentData?.sub_mood[moodName];
            let moodLabels = [];
            Object.keys(subMoods).map((data, index) => {
              if (index === 0) {
                moodLabels.push(`${data}: ${subMoods["mood_count"]}`);
              }
            });
            subMoods["sub_mood"].map((sub) => {
              Object.keys(sub).map((subMood, key) => {
                if (key === 0) {
                  moodLabels.push(`${subMood}: ${sub["count"]}`);
                }
              });
            });
            return moodLabels;
          },
          labelTextColor: function () {
            return "#3F3F44";
          },
        },
        custom: function (tooltip) {
          if (tooltip.dataPoints) {
            let index = tooltip.dataPoints[0].index;
            let color = borderColor[index];
            tooltip.borderColor = color;
            tooltip.titleFontColor = color;
          }
        },
      },
    };
    const moodByDayData = {
      labels: this.getMoodByDayLables().reverse(),
      datasets: this.getMoodByDayDatasets().reverse(),
    };
    const moodByDayDataOptions = {
      scales: {
        xAxes: [
          {
            stacked: true,
            gridLines: {
              display: false, //Remove lines on graph
            },
            ticks: {
              display: false, //Remove only the label
            },
          },
        ],
        yAxes: [
          {
            stacked: true,
            gridLines: {
              display: false,
            },
          },
        ],
      },
      responsive: true,
      legend: {
        display: false,
        position: "bottom",
        labels: {
          fontColor: "#3F3F44",
          fontWeight: 500,
          fontFamily: "Omnes",
          paddingLeft: 100,
          usePointStyle: true,
        },
      },
      // tooltips: {
      //   position: "average",
      // },
    };

    const staticmoodData = {
      labels: this.getMoodLables(),
      datasets: [
        {
          label: "Moods",
          backgroundColor: [
            "#FFAE01",
            "#F87D27",
            "#DF6FA0",
            "#69CDF4",
            "#BFA8EA",
            "#84CB8B",
            "#D290DC",
            "#d25e75",
            "#6F9AF7",
          ],
          data: ["1", "1", "1", "1", "1", "1", "1", "1", "1"],
          hoverBackgroundColor: [
            "#FFAE01",
            "#F87D27",
            "#DF6FA0",
            "#69CDF4",
            "#BFA8EA",
            "#84CB8B",
            "#D290DC",
            "#d25e75",
            "#6F9AF7",
          ],
        },
      ],
    };
    return (
      <div className="container-main-root insight-container-main-root insight-dashboard-inner-container">
        {this.props.authenticate.loading ? <Spinner /> : null}
        <div className="container">
          <div className="container-inner-root">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="yh-tab-header-div">
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

                  <div className="yh-tab-header-center-div">
                    <ul className="tab-list-ul">
                      <li
                        className="tab-item "
                        // className={`tab-item ${
                        //   window.location.pathname === "/educator"
                        //     ? "active"
                        //     : ""
                        // } `}
                      >
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
                      <li
                        className="tab-item active"
                        // className={`tab-item
                        //  ${
                        //   window.location.pathname ===
                        //   "/educator/insight-dashboard"
                        //     ? "active"
                        //     : ""
                        // } `}
                      >
                        <Link to="#" className="link">
                          {" "}
                          Insight{" "}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="studentView_mainHeading">
                  <h3>
                    {insightData.individualStudentData
                      ? insightData.individualStudentData.student_name
                      : ""}
                  </h3>
                  <h5>
                    {insightData.individualStudentData
                      ? insightData.individualStudentData.class_name
                      : ""}
                  </h5>
                </div>
                <div className="main-dashboard-body main-insight-dashboard-body">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 mb-4">
                      <div className="log-overview-graph-div">
                        <div className="log-overview-graph-root">
                          <div className="row">
                            <div className="col-lg-4 col-md-4 left-graph">
                              <div className="graph-div round-graph-div">
                                <div className="graph-img-thumb">
                                  {moodData.datasets[0].data &&
                                  moodData.datasets[0].data.find(
                                    (d) => d !== "0"
                                  ) ? (
                                    <div className="chart-container">
                                      <Doughnut
                                        data={moodData}
                                        options={moodDataOptions}
                                        plugins={[DoughnutChartPlugin]}
                                      />
                                    </div>
                                  ) : (
                                    <Doughnut
                                      data={staticmoodData}
                                      options={moodDataOptions}
                                      plugins={[DoughnutChartPlugin]}
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                            {insightData.individualStudentData &&
                            !insightData.individualStudentData.sub_mood ? (
                              <div className="col-lg-8 col-md-8 right-graph">
                                <div
                                  className="log-overview-part-root"
                                  style={{ width: "100%" }}
                                >
                                  <div
                                    className="log-overview-part-list"
                                    style={{ width: "100%" }}
                                  >
                                    <Skeleton
                                      style={{
                                        marginTop: "7.5px",
                                        marginBottom: "7.5px",
                                      }}
                                      count={3}
                                      height={44}
                                      width={"100%"}
                                    />
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="col-lg-8 col-md-8 right-graph">
                                <div className="log-overview-part-root">
                                  <div className="log-overview-part-list">
                                    <div className="mood-field">
                                      {insightData.individualStudentData &&
                                      insightData.individualStudentData.sub_mood
                                        ? Object.keys(
                                            insightData.individualStudentData
                                              .sub_mood
                                          ).map((keyName, i) => (
                                            <div
                                              className="mood-field-item"
                                              key={i}
                                            >
                                              <div className="mood-icon-box">
                                                <span
                                                  className={`mood-icon mood-${keyName.toLowerCase()}-icon`}
                                                ></span>
                                              </div>
                                              <div className="mood-text-box">
                                                <span className="mood-field-title">
                                                  {/* {keyName}&nbsp; */}
                                                  <span className="mood-field-percentage">
                                                    {
                                                      insightData
                                                        .individualStudentData
                                                        .mood[keyName]
                                                    }
                                                    %
                                                  </span>
                                                </span>
                                              </div>
                                              <div className="mood-expander-wrapper">
                                                <div className="mood-toggle"></div>

                                                <div className="mood-expander">
                                                  <div className="mood_exIcon">
                                                    <span
                                                      className={`mood-icon mood-${keyName.toLowerCase()}-icon`}
                                                    ></span>
                                                    <span className="mood-field-percentage">
                                                      {
                                                        insightData
                                                          .individualStudentData
                                                          .mood[keyName]
                                                      }
                                                      %
                                                    </span>
                                                  </div>

                                                  <ul>
                                                    {/* <li><span>{keyName}</span>: <span className="mood-field-percentage">{insightData.individualStudentData.sub_mood[keyName][keyName]}%</span></li> */}
                                                    {insightData.individualStudentData.sub_mood[
                                                      keyName
                                                    ].sub_mood_per.map(
                                                      (data) => {
                                                        return Object.keys(
                                                          data
                                                        ).map((mood_i, index) =>
                                                          index === 0 ? (
                                                            <li>
                                                              <span>
                                                                {mood_i}
                                                              </span>{" "}
                                                              <span className="mood-field-percentage">
                                                                {data[mood_i]}%
                                                              </span>
                                                            </li>
                                                          ) : (
                                                            ""
                                                          )
                                                        );
                                                      }
                                                    )}
                                                  </ul>
                                                </div>
                                              </div>
                                            </div>
                                          ))
                                        : null}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

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
                                setInsightDateRangeDataUpdate={(data)=>{this.props.setInsightDateRangeData(data)}}
                                // handleTimeapplyFunc={this.getIndividualStudentData}
                                
                              />
                            </div>
                            {/* Filter end */}
                            {insightData.individualStudentData?.log_result
                              ?.length > 0 ? (
                              <div className="col-lg-9 col-md-9">
                                <div className="center-logs-details">
                                  {insightData.individualStudentData &&
                                  insightData.individualStudentData.log_result
                                    ? insightData.individualStudentData.log_result.map(
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
                                                  <div
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
                                                              </span>
                                                              &nbsp;was{" "}
                                                              {data.mood.name}{" "}
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
                                                                    // <b>{`${popularlog[0]} and ${popularlog[1]}`}</b>
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
                                                              {/* <b>checkpoint</b> */}
                                                            </p>
                                                            {/* <p className="date-time-text">
                                                          {moment(
                                                            data.date_created
                                                          ).format("h:mm a")}
                                                        </p> */}
                                                          </div>
                                                        </div>
                                                      </div>
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

                                                    <div className="log-bottom-box">
                                                      <div className="log-desc-text-box">
                                                        <p>
                                                          {data.text}
                                                          {/* <span className="bold-span">checkpoint </span> */}
                                                        </p>
                                                      </div>
                                                    </div>

                                                    <div className="logDate">
                                                      <h5>
                                                        {moment(
                                                          new Date(
                                                            data.web_utc
                                                          ),
                                                          "hh:mm A"
                                                        ).format("h:mma")}
                                                        {/* {moment(
                                                                data.date_created
                                                              ).format(
                                                                "h:mma"
                                                              )} */}
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
                                                    {/* <div className="logDate">
                                                    <h5>
                                                      {moment(
                                                        data.date_created
                                                      ).format("h:mm A")}
                                                    </h5>
                                                  </div> */}
                                                    {data.is_flag.name ? (
                                                      <div className="flag-icon-box-abs">
                                                        <span className="custom-icon flag-icon"></span>
                                                      </div>
                                                    ) : null}
                                                  </div>
                                                );
                                              })}
                                            </div>
                                          );
                                        }
                                      )
                                    : "No data available"}
                                  <div className="logs-row btn-show-more-root">
                                    {insightData.individualStudentData
                                      .total_records > 10 && (
                                      <div className="btn-show-more-center">
                                        <div className="text-div">
                                          <p>
                                            {insightData.individualStudentData &&
                                            insightData.individualStudentData
                                              .log_result
                                              ? insightData
                                                  .individualStudentData
                                                  .per_page
                                              : ""}
                                            /
                                            {insightData.individualStudentData &&
                                            insightData.individualStudentData
                                              .log_result
                                              ? insightData
                                                  .individualStudentData
                                                  .total_records
                                              : ""}{" "}
                                            Logs
                                          </p>
                                        </div>
                                        {insightData.individualStudentData &&
                                        insightData.individualStudentData
                                          .next_link ? (
                                          <div className="btn-row-div">
                                            <Link
                                              to="#"
                                              className="btn-common btn-show-more"
                                              onClick={() => {
                                                this.handleNextLogs(
                                                  insightData
                                                    .individualStudentData
                                                    .current_page + 1
                                                );
                                              }}
                                            >
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

export default StudentLogs;
