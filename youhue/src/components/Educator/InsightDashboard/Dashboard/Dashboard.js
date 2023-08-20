/* eslint-disable no-unused-expressions */
import React from "react";
import { Link } from "react-router-dom";
import Select2 from "react-select2-wrapper";
import DateRangePicker from "react-bootstrap-daterangepicker";
import moment from "moment";
import { Doughnut, HorizontalBar } from "react-chartjs-2";
import InfiniteScroll from "react-infinite-scroll-component";

import Spinner from "../../../Spinner/Spinner";
import { moodByDayDataSets } from "../../../../utils/constant";
import "../InsightDashboard.scss";
import AskMyStudent from "../../Modal/AskMyStudent/AskMyStudent";
import empty_state from "../../../../assets/images/empty_state.svg";
import * as rdd from "react-device-detect";
import Pagination from "react-js-pagination";
import Skeleton from "react-loading-skeleton";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { data } from "jquery";
import watchTime from "../../../../assets/images/icons/watch.svg";

// import "bootstrap/less/bootstrap.less";
const moodByOptionStatic = {
  chart: {
    type: "bar",
    height: 400,
  },
  title: {
    text: "",
  },
  xAxis: {
    categories: [],
    labels: {
      formatter: function formatter() {
        return "<b>" + this.value + " </b>";
      },
      style: {
        color: "black",
        fontSize: "14px",
        fontFamily: "omnis",
      },
      align: "left",
      reserveSpace: true,
    },
    lineWidth: 0,
    minorGridLineWidth: 0,
    lineColor: "transparent",
    minorTickLength: 0,
    tickLength: 0,
  },
  yAxis: {
    title: {
      enabled: false,
    },
    labels: {
      enabled: false,
    },
    gridLineColor: "transparent",
  },
  legend: {
    enabled: false,
    reversed: true,
    margin: 30,
    itemStyle: {
      fontSize: "14px",
      textTransform: "capitalize",
      fontFamily: "Lato",
    },
  },
  plotOptions: {
    series: {
      stacking: "normal",
      pointPadding: 0,
    },
  },
  colors: [
    "#ffac00",
    "#F77D2C",
    "#ef659f",
    "#7dcdf8",
    "#c2a5ef",
    "#6bcd83",
    "#dd89e0",
    "#6599fe",
    "#e25674",
    // colors: [
    //   "#FFAE01",
    //   "#F87D27",
    //   "#DF6FA0",
    //   "#69CDF4",
    //   "#BFA8EA",
    //   "#84CB8B",
    //   "#D290DC",
    //   "#6F9AF7",
    //   "#d25e75",
  ].reverse(),
  series: moodByDayDataSets,
  credits: {
    enabled: false,
  },
  tooltip: {
    formatter: function formatter() {
      return "hello";
    },
    style: {
      color: "black",
      fontSize: "14px",
      fontFamily: "omnis",
    },
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    useHTML: true,
    padding: 5,
  },
};
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.handleApply = this.handleApply.bind(this);
    this.state = {
      selectedClass: props.educator.classDetailData
        ? props.educator.classDetailData["id"]
        : "",
      selectedClassName: props.educator.classDetailData
        ? props.educator.classDetailData["name"]
        : "",
      multileSelectedClass: [],
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
      totalCount: 0,
      lastPage: 0,
      isOpenAskMyStudentModal: false,
      selectedTag: props.educator.selectedTimelineTag || "This Week",
      toogleMultipleClassDropdown: false,
      isgraph: true,
      isuser: false,
      isTimePeriodModalActive: false,
      userCount: 0,
      isEnableSelectMultiClass: false,
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
      timeLineArray: [
        {
          id: 1,
          name: "Today",
        },
        {
          id: 2,
          name: "This Week",
        },
        {
          id: 3,
          name: "Last Week",
        },
        {
          id: 4,
          name: "30 days",
        },
        {
          id: 5,
          name: "All Time",
        },
      ],
      optionsForMoodbyDay: moodByOptionStatic,
      hoursError: false,
      minutesError: false,
      endTimeHourerror: false,
      endTimeminutesError: false,
      studentlinkdata: {},
      studentweblistdata: [],
      askstudentlinkdata: {},
      askstudentweblistdata: [],
      isstartHourActive: false,
      isendHourActive: false,
      isstartMinActive: false,
      isendMinActive: false,
      isTimeperiodFilterApplied:
        props.insightData.insightDateRangeData &&
        props.insightData.insightDateRangeData.isTimeperiodFilterApplied
          ? props.insightData.insightDateRangeData.isTimeperiodFilterApplied
          : false,
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
    };

    this.wrapperRef = React.createRef();
    this.timewrapperRef = React.createRef();
  }

  componentDidMount() {
    localStorage.setItem("const_url", "");
    this.props.getAccountDetails();
    if (this.props.insightData.multipleClass.type === "multiple") {
      this.setState(
        { multileSelectedClass: this.props.insightData.multipleClass.data },
        () => {
          this.props.setMultipleSelectedClass({
            type: "multiple",
            data: this.state.multileSelectedClass,
          });
          this.props.getAllClass();
          this.handleSelectMultipleClassOptionSubmit();
          this.setState({
            toogleMultipleClassDropdown: false,
            isEnableSelectMultiClass: false,
          });
        }
      );
    } else if (this.state.selectedClass) {
      // console.log("single one");
      this.props.setMultipleSelectedClass({
        type: "single",
        data: this.state.selectedClass,
      });
      this.props.getAllClass();
      this.getInsightAdminData();
      this.getinsightmoodbyday();
      // console.log("called from com did");
      this.getstudentWeblist(this.state.selectedClass);
      this.getaskstudentWeblist(this.state.selectedClass);
    } else {
      this.getAllClass();
    }
    document.addEventListener("mousedown", this.handleClickOutside);
    localStorage.setItem("classid", this.state.selectedClass);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState({
        toogleMultipleClassDropdown: false,
        isEnableSelectMultiClass: false,
      });
    }
    if (
      this.timewrapperRef &&
      !this.timewrapperRef.current.contains(event.target)
    ) {
      this.setState({
        isTimePeriodModalActive: false,
      });
    }
  };

  getAllClass = async () => {
    await this.props.getAllClass();
    // console.log(
    //   "classListAdmin",
    //   this.props.educator.classListAdmin,
    //   this.props.educator.classDetailData
    // );
    this.setState(
      {
        selectedClass:
          this.props?.educator?.classListAdmin.length > 0
            ? this.props.educator.classListAdmin[0]["id"]
            : this.props.educator.classDetailData["id"],
        selectedClassName:
          this.props?.educator?.classListAdmin.length > 0
            ? this.props.educator.classListAdmin[0]["name"]
            : this.props.educator.classDetailData["name"],
      },
      () => {
        const data = {
          id: this.state.selectedClass,
          name: this.state.selectedClassName,
        };
        this.handleSelectedClass(data);
        if (this.state.multileSelectedClass.length === 0) {
          this.getInsightAdminData();
          this.getstudentWeblist();
          this.getaskstudentWeblist();
          this.getinsightmoodbyday();
        } else {
          this.handleSelectMultipleClassOptionSubmit();
        }
      }
    );
  };
  getstudentWeblist = (id) => {
    var classId = "";
    var pageno;
    if (this.state.selectedClass) {
      if (id === undefined) {
        classId = this.state.selectedClass;
      } else {
        classId = id;
      }
      if (
        this.state.studentlinkdata.next === undefined ||
        this.state.studentlinkdata.next === 0
      ) {
        pageno = 1;
      } else {
        pageno = this.state.studentlinkdata.next;
      }
      const data = {
        class_id: classId,
        page: pageno,
      };
      this.props.getstudentWeblist(data);
    }
  };
  getaskstudentWeblist = (id) => {
    var classId = "";
    var pageno;
    if (this.state.selectedClass) {
      if (id === undefined) {
        classId = this.state.selectedClass;
      } else {
        classId = id;
      }
      if (
        this.state.askstudentlinkdata.next === undefined ||
        this.state.askstudentlinkdata.next === 0
      ) {
        pageno = 1;
      } else {
        pageno = this.state.askstudentlinkdata.next;
      }

      const data = {
        class_id: classId,
        page: pageno,
      };
      return this.props.getaskstudentWeblist(data);
    }
  };
  getinsightmoodbyday = () => {
    // console.log("======api call======", moodByOptionStatic);
    
    if (this.state.selectedClass) {
      const classId = this.state.selectedClass;
      var ids =
        this.state.multileSelectedClass.length > 0 &&
        this.state.multileSelectedClass
          .map((a) => {
            return a.id;
          })
          .join(",");
      const data = {
        start_date: this.state.startDate
          ? this.props.educator.selectedTimelineTag === "All Time"
            ? ""
            : this.state.startDate.format("YYYY-MM-DD")
          : "",
        end_date: this.state.endDate.format("YYYY-MM-DD"),
        class_id: this.state.multileSelectedClass.length > 0 ? ids : classId,
        page: this.state.page,
        start_time:
          this.state.utcStartTime !== undefined && this.state.utcStartTime,
        end_time: this.state.utcEndTime !== undefined && this.state.utcEndTime,
      };
      let newData = JSON.parse(JSON.stringify(moodByOptionStatic));
      this.setState(
        {
          optionsForMoodbyDay: newData,
        },
        () => {
          this.props.getinsightmoodbyday(data).then((res) => {
            this.getMoodByDayLables(res);
          });
        }
      );

      // this.props.setMultipleSelectedClass({
      //   type: "single",
      //   data: this.state.selectedClass,
      // });
      this.handleSelectMultipleOption =
        this.handleSelectMultipleOption.bind(this);
    }
  };

  getInsightAdminData = () => {
    if (this.state.selectedClass) {
      const classId = this.state.selectedClass;
      const data = {
        start_date: this.state.startDate
          ? this.props.educator.selectedTimelineTag === "All Time"
            ? ""
            : this.state.startDate.format("YYYY-MM-DD")
          : "",
        end_date: this.state.endDate.format("YYYY-MM-DD"),
        class_id: classId,
        page: this.state.page,
        start_time:
          this.state.utcStartTime !== undefined && this.state.utcStartTime,
        end_time: this.state.utcEndTime !== undefined && this.state.utcEndTime,
      };
      this.props.setInsightDateRangeData(this.state);
      this.props.getInsightAdminData(data);

      // this.props.setMultipleSelectedClass({
      //   type: "single",
      //   data: this.state.selectedClass,
      // });
      this.handleSelectMultipleOption =
        this.handleSelectMultipleOption.bind(this);
    }
  };

  handleSelectedClass = (data) => {
    this.setState(
      { selectedClass: data.id, selectedClassName: data.name },
      async () => {
        this.props.setMultipleSelectedClass({
          type: "single",
          data: this.state.selectedClass,
        });
        localStorage.setItem("classid", data.id);
        this.getstudentWeblist(this.state.selectedClass);
        this.setState({
          studentweblistdata: [],
        });
        this.getaskstudentWeblist(this.state.selectedClass);
        this.setState({ multileSelectedClass: [] });
        this.handleToogleMultipleSelectClasses(false);
        if (data) {
          await this.props.getClassDetails(data.id);
          this.getInsightAdminData();
          this.getinsightmoodbyday();
          this.handleToogleMultipleSelectClasses(false);
        }
      }
    );
  };

  handleSteps = (step) => {
    this.props.setInsightDashboardStepCount(step);
  };

  handleLoadMoreLogs = (page) => {
    this.setState({ page: page }, () => {
      this.getInsightAdminData();
      this.getinsightmoodbyday();
    });
  };

  handleApply = (event, picker) => {
    this.setState(
      {
        selectedTag: "Date Range",
        startDate: picker.startDate,
        endDate: picker.endDate,
        page: 1,
      },
      () => {
        this.getInsightAdminData();
        this.getinsightmoodbyday();
        this.props.setTimelineTag("Date Range");
      }
    );
  };

  handleIndividualStudentData = (classid, uuid) => {
    localStorage.setItem("studentclassid", classid);
    this.props.setSelectedStudentData(uuid);
    this.handleSteps(4);
  };

  getMoodData = () => {
    const { insightData } = this.props;
    let data = [];
    if (insightData.insightAdminData && insightData.insightAdminData.mood) {
      data = Object.values(insightData.insightAdminData.mood);
    }
    return data;
  };

  getMoodLables = () => {
    const { insightData } = this.props;
    let data = [];
    if (insightData.insightAdminData && insightData.insightAdminData.mood) {
      data = Object.keys(insightData.insightAdminData.mood);
    }
    return data;
  };

  getMoodByDayLables = (res) => {
    const moodbyday = res?.data;
    let data = [];
    moodbyday?.mood_by_day.map((i) => data.push(i.date));
    data = data.map((date) => moment(new Date(date)).format("ddd, DD MMM"));
    this.getMoodByDayDatasets(res, data);
  };

  handleOnChangePaginationForMoodByDay = (number) => {
    let newData = moodByOptionStatic;
    newData.series.map((data) => {
      data.data = [];
    });
    this.setState({ page: number, optionsForMoodbyDay: newData }, () => {
      this.getinsightmoodbyday();
    });
  };

  isOpenAskMyStudentModal = () => {
    this.setState({ isOpenAskMyStudentModal: false });
    this.getaskstudentWeblist();
  };

  handleOpenAskMyStudentModal = () => {
    this.setState({ isOpenAskMyStudentModal: true });
  };
  handleclickuser = () => {
    this.setState({ isgraph: false });
    this.setState({ isuser: true });
  };
  handleclickgraph = () => {
    this.setState({ isgraph: true });
    this.setState({ isuser: false });
  };
  componentDidUpdate(prevState, prevProps) {
    if (
      prevState.startDate &&
      this.props.insightData &&
      prevState.startDate !==
        this.props.insightData.insightDateRangeData.startDate
    ) {
      if (this.state.multileSelectedClass.length > 0) {
        this.getInsightAdminData();
        this.getinsightmoodbyday();
      } else {
        this.handleSelectMultipleClassOptionSubmit();
      }
    }
    if (prevProps.selectedTag !== this.props.educator.selectedTimelineTag) {
      this.setState({ selectedTag: this.props.educator.selectedTimelineTag });
    }
    if (prevState.selectedClassToRemove !== this.props.selectedClassToRemove) {
      // console.log("selectedClassToRemove", this.props.selectedClassToRemove);
      this.setState({ selectedClassName: "", selectedClass: "" });
    }
    if (
      prevState.authenticate.studentweblistlink !==
      this.props.authenticate.studentweblistlink
    ) {
      // console.log("selectedClassToRemove", this.props.selectedClassToRemove);
      let tempdata = [
        ...this.state.studentweblistdata,
        ...this.props.studentweblist,
      ];
      this.setState({
        studentlinkdata: this.props.authenticate.studentweblistlink,
        studentweblistdata: tempdata,
      });
    }
    if (
      prevState.authenticate.askstudentweblistlink !==
      this.props.authenticate.askstudentweblistlink
    ) {
      // console.log("selectedClassToRemove", this.props.selectedClassToRemove);
      let tempdata = [
        ...this.state.askstudentweblistdata,
        ...this.props.askstudentweblist,
      ];
      this.setState({
        askstudentweblistdata: this.props.authenticate.askstudentweblistlink,
        askstudentweblistdata: tempdata,
      });
    }
    // askstudentweblistdata
    // if (
    //   prevState.utcStartTime !==
    //     this.props.insightData.insightDateRangeData.utcStartTime &&
    //     prevState.utcEndTime !==
    //     this.props.insightData.insightDateRangeData.utcEndTime
    // ) {this.getinsightmoodbyday();
      // this.setState(
      //   {
      //     utcStartTime:
      //       this.props.insightData.insightDateRangeData.utcStartTime,
      //     utcEndTime: this.props.insightData.insightDateRangeData.utcEndTime,
      //   },
      //   () => {
      //     this.getinsightmoodbyday();
      //   }
      // );
    // }
  }

  handleTimelineTag = (e, data) => {
    e.preventDefault();
    if (data.name === "Today") {
      let newData = moodByOptionStatic;
      newData.series.map((data) => {
        data.data = [];
      });
      this.setState(
        {
          selectedTag: data.name,
          startDate: moment(),
          endDate: moment(),
          page: 1,
          optionsForMoodbyDay: newData,
        },
        () => {
          if (this.state.multileSelectedClass.length === 0) {
            this.getInsightAdminData();
            this.getinsightmoodbyday();
          } else {
            this.handleSelectMultipleClassOptionSubmit();
          }
        }
      );
    }

    if (data.name === "This Week") {
      let newData = moodByOptionStatic;
      newData.series.map((data) => {
        data.data = [];
      });
      this.setState(
        {
          selectedTag: data.name,
          startDate: moment().clone().startOf("week"),
          endDate: moment(),
          page: 1,
          optionsForMoodbyDay: newData,
        },
        () => {
          if (this.state.multileSelectedClass.length === 0) {
            // this.setState({
            //   selectedClassName: this.props.educator.classDetailData
            //     ? this.props.educator.classDetailData["name"]
            //     : "",
            // });

            this.getInsightAdminData();
            this.getinsightmoodbyday();
          } else {
            this.handleSelectMultipleClassOptionSubmit();
          }
        }
      );
    }
    if (data.name === "Last Week") {
      let newData = moodByOptionStatic;
      newData.series.map((data) => {
        data.data = [];
      });
      var currentDate = moment().subtract(1, "week");
      this.setState(
        {
          selectedTag: data.name,
          startDate: currentDate.clone().startOf("week"),
          endDate: currentDate.clone().endOf("week"),
          page: 1,
          optionsForMoodbyDay: newData,
        },
        () => {
          if (this.state.multileSelectedClass.length === 0) {
            // this.setState({
            //   selectedClassName: this.props.educator.classDetailData
            //     ? this.props.educator.classDetailData["name"]
            //     : "",
            // });
            this.getInsightAdminData();
            this.getinsightmoodbyday();
          } else {
            this.handleSelectMultipleClassOptionSubmit();
          }
        }
      );
    }
    if (data.name === "30 days") {
      let newData = moodByOptionStatic;
      newData.series.map((data) => {
        data.data = [];
      });
      this.setState(
        {
          selectedTag: data.name,
          startDate: moment().subtract(30, "days"),
          endDate: moment(),
          page: 1,
          optionsForMoodbyDay: newData,
        },
        () => {
          if (this.state.multileSelectedClass.length === 0) {
            // this.setState({
            //   selectedClassName: this.props.educator.classDetailData
            //     ? this.props.educator.classDetailData["name"]
            //     : "",
            // });
            this.getInsightAdminData();
            this.getinsightmoodbyday();
          } else {
            this.handleSelectMultipleClassOptionSubmit();
          }
        }
      );
    }
    if (data.name === "All Time") {
      let newData = moodByOptionStatic;
      newData.series.map((data) => {
        data.data = [];
      });
      this.setState(
        {
          selectedTag: data.name,
          startDate: "",
          endDate: moment(),
          page: 1,
          optionsForMoodbyDay: newData,
        },
        () => {
          if (this.state.multileSelectedClass.length === 0) {
            // this.setState({
            //   selectedClassName: this.props.educator.classDetailData
            //     ? this.props.educator.classDetailData["name"]
            //     : "",
            // });
            this.getInsightAdminData();
            this.getinsightmoodbyday();
          } else {
            this.handleSelectMultipleClassOptionSubmit();
          }
        }
      );
    }
    this.props.setTimelineTag(data.name);
  };

  handleToogleMultipleSelectClasses = (flag) => {
    this.setState({ toogleMultipleClassDropdown: flag });
  };

  handleSelectMultipleClassOption = () => {
    this.setState({
      isEnableSelectMultiClass: !this.state.isEnableSelectMultiClass,
    });
  };

  handleSelectMultipleOption(e, data) {
    e.preventDefault();

    let newArray = [...this.state.multileSelectedClass];
    const index = newArray.findIndex((item) => item.id === data.id);
    if (index.toString() !== "-1") {
      newArray.splice(index, 1);
    } else {
      newArray.push(data);
    }
    this.setState({ multileSelectedClass: newArray }, () => {
      this.props.setMultipleSelectedClass({
        type: "multiple",
        data: this.state.multileSelectedClass,
      });
    });
    this.handleToogleMultipleSelectClasses(true);
  }

  handleSelectAllOptions = (type) => {
    if (type === "None") {
      this.setState(
        {
          multileSelectedClass: [],
          selectedClass: this.props.educator.classListAdmin[0]["id"],
          selectedClassName: this.props.educator.classListAdmin[0]["name"],
        },
        () => {
          // console.log("single five");
          this.props.setMultipleSelectedClass({
            type: "single",
            data: this.state.selectedClass,
          });
          this.getInsightAdminData();
          this.getinsightmoodbyday();
          this.handleSelectMultipleClassOption();
          this.handleToogleMultipleSelectClasses(false);
        }
      );
    } else {
      this.setState(
        {
          multileSelectedClass: this.props.educator.classListAdmin,
          selectedClassName: `${this.props.educator.classListAdmin.length} Classes selected`,
        },
        () => {
          this.props.setMultipleSelectedClass({
            type: "multiple",
            data: this.state.multileSelectedClass,
          });
        }
      );
    }
  };

  handleSelectMultipleClassOptionSubmit = () => {
    var ids = this.state.multileSelectedClass
      .map((a) => {
        return a.id;
      })
      .join(",");
    const params = {
      start_date: this.state.startDate
        ? this.props.educator.selectedTimelineTag === "All Time"
          ? ""
          : this.state.startDate.format("YYYY-MM-DD")
        : "",
      end_date: this.state.endDate.format("YYYY-MM-DD"),
      class_id: ids,
      page: this.state.page,
    };
    localStorage.setItem("classid", ids);

    this.getstudentWeblist(ids);
    this.setState({
      studentweblistdata: [],
    });
    this.getaskstudentWeblist(ids);
    // console.log("params",params);

    this.handleSelectMultipleClassOption();
    this.handleToogleMultipleSelectClasses(false);
    if (this.state.multileSelectedClass.length !== 0) {
      if (this.state.multileSelectedClass.length === 1) {
        // console.log('first')
        this.setState({
          selectedClassName: `${this.state.multileSelectedClass[0].name}`,
        });
        this.props.setMultipleSelectedClass({
          type: "single",
          data: this.state.multileSelectedClass,
        });
        this.getInsightAdminData();
        this.getinsightmoodbyday();
      } else {
        // console.log('second')
        // console.log('this.state.multileSelectedClass',this.state.multileSelectedClass)
        this.props.setMultipleSelectedClass({
          type: "multiple",
          data: this.state.multileSelectedClass,
        });
        this.setState({
          selectedClassName: `${this.state.multileSelectedClass.length} Classes selected`,
        });
        this.props.doGetMultipleClasses(params);
        // this.getInsightAdminData();
        this.getinsightmoodbyday();
      }
    } else {
      this.setState({
        selectedClassName: this.props.educator.classListAdmin[0].name,
      });
      // console.log('third')
      this.props.setMultipleSelectedClass({
        type: "single",
        data: this.state.multileSelectedClass,
      });

      this.getInsightAdminData();
      this.getinsightmoodbyday();
    }

    // this.setState({
    //   selectedClassName: `${this.state.multileSelectedClass.length} Classes selected`,
    // });
  };

  getMoodByDayDatasets = (res, labels) => {
    const moodbyday = res?.data;
    // console.log(
    //   "this.state.optionsForMoodbyDay.series",
    //   this.state.optionsForMoodbyDay.series,
    //   moodbyday
    // );
    let dataSetsNew = [...this.state.optionsForMoodbyDay.series];
    let apiData = moodbyday ? moodbyday.mood_by_day : [];
    dataSetsNew.map((data) => {
      for (let i = 0; i < apiData.length > 0; i++) {
        apiData[i].data.map((k) => {
          if (k.mood_name === data.name) {
            data?.data.push(parseInt(k.count));
          }
        });
      }
    });
    // console.log("dataSets", dataSetsNew);
    this.setState(
      {
        totalCount: moodbyday?.links?.total,
        lastPage: moodbyday?.links?.last,
        optionsForMoodbyDay: {
          xAxis: {
            categories: labels,
          },
          series: dataSetsNew.reverse(),
          tooltip: {
            formatter: function formatter() {
              var message =
                this.y > 1
                  ? "<strong>" + this.y + "</strong> logs <strong>"
                  : "<strong>" + this.y + "</strong> log <strong>";
              return message;
            },
          },
        },
      },
      () => {
        dataSetsNew = [];
      }
    );
  };

  handleOpenTimePeriod = () => {
    this.setState({
      isTimePeriodModalActive: !this.state.isTimePeriodModalActive,
    });
  };

  handleTimereset = () => {
    if (this.state.isTimeperiodFilterApplied) {
      this.setState(
        {
          isTimePeriodModalActive: false,
          hoursError: false,
          minutesError: false,
          endTimeHourerror: false,
          endTimeminutesError: false,
          isstartHourActive: false,
          isendHourActive: false,
          isstartMinActive: false,
          isendMinActive: false,
          isTimeperiodFilterApplied: false,
          startTime: undefined,
          endTime: undefined,
          startAmPm: "",
          endAmPm: "",
          startTimeHour: "",
          startTimeMin: "",
          endTimeMin: "",
          endTimeHour: "",
          utcEndTime: "",
          utcStartTime: "",
        },
        () => {
          this.getInsightAdminData();
          this.getinsightmoodbyday();
        }
      );
    }
  };

  convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }
    if (modifier === "pm") {
      hours = parseInt(hours, 10) + 12;
    }

    return [parseInt(hours), parseInt(minutes)];
  };

  handleHourInput = (e) => {
    let name = e.target.name;
    let hours = parseInt(e.target.value);
    if (name === "hours") {
      this.setState({
        isendHourActive: false,
        isendMinActive: false,
        isstartMinActive: false,
        minutesError: false,
        endTimeHourerror: false,
        endTimeminutesError: false,
      });
      if (hours > 12) {
        this.setState({
          hoursError: true,
        });
      } else {
        this.setState({
          hoursError: false,
          startTimeHour: hours,
          isstartHourActive: true,
        });
      }
    } else if (name === "endhours") {
      this.setState({
        isendMinActive: false,
        isstartMinActive: false,
        isstartHourActive: false,
        minutesError: false,
        hoursError: false,
        endTimeminutesError: false,
      });
      if (hours > 12) {
        this.setState({
          endTimeHourerror: true,
        });
      } else {
        this.setState({
          endTimeHourerror: false,
          endTimeHour: hours,
          isendHourActive: true,
        });
      }
    }
  };

  handleMinuteInput = (e) => {
    let name = e.target.name;
    let minutes = e.target.value;
    if (name === "minutes") {
      this.setState({
        isstartHourActive: false,
        isendHourActive: false,
        isendMinActive: false,
        endTimeminutesError: false,
        endTimeHourerror: false,
        hoursError: false,
      });
      if (minutes > 60) {
        this.setState({
          minutesError: true,
        });
      } else {
        this.setState({
          minutesError: false,
          startTimeMin: minutes,
          isstartMinActive: true,
        });
      }
    }
    if (name === "endminutes") {
      this.setState({
        isstartHourActive: false,
        isstartMinActive: false,
        isendHourActive: false,
        endTimeHourerror: false,
        hoursError: false,
        minutesError: false,
      });
      if (minutes > 60) {
        this.setState({
          endTimeminutesError: true,
        });
      } else {
        this.setState({
          endTimeminutesError: false,
          endTimeMin: minutes,
          isendMinActive: true,
        });
      }
    }
  };

  handleScrollForStudentList = () => {
    this.getstudentWeblist();
  };

  handleTimeApply = () => {
    if (
      this.state.startTimeHour &&
      this.state.startTimeMin &&
      this.state.startAmPm &&
      this.state.endTimeHour &&
      this.state.endTimeMin &&
      this.state.endAmPm
    ) {
      const newDateStart = this.convertTime12to24(
        this.state.startTimeHour +
          ":" +
          this.state.startTimeMin +
          " " +
          this.state.startAmPm
      );
      const newDateEnd = this.convertTime12to24(
        this.state.endTimeHour +
          ":" +
          this.state.endTimeMin +
          " " +
          this.state.endAmPm
      );

      const sdate = new Date(
        21,
        1,
        5,
        newDateStart[0],
        newDateStart[1],
        0
      ).toISOString();
      const edate = new Date(
        21,
        1,
        5,
        newDateEnd[0],
        newDateEnd[1],
        0
      ).toISOString();
      const UTCStartTime =
        new Date(sdate).getUTCHours() + ":" + new Date(sdate).getUTCMinutes();
      const UTCEndTime =
        new Date(edate).getUTCHours() + ":" + new Date(edate).getUTCMinutes();
      const compareEndTime = new Date(
        "1/1/2011 " +
          this.state.endTimeHour +
          ":" +
          this.state.endTimeMin +
          " " +
          this.state.endAmPm
      );
      const compareStartTime = new Date(
        "1/1/2011 " +
          this.state.startTimeHour +
          ":" +
          this.state.startTimeMin +
          " " +
          this.state.startAmPm
      );
      if (compareEndTime - compareStartTime < 0) {
        this.setState({
          hoursError: true,
          minutesError: true,
          endTimeHourerror: true,
          endTimeminutesError: true,
        });
      } else {
        this.setState(
          {
            hoursError: false,
            minutesError: false,
            endTimeHourerror: false,
            endTimeminutesError: false,
            utcStartTime: UTCStartTime,
            utcEndTime: UTCEndTime,
            isTimePeriodModalActive: false,
            isTimeperiodFilterApplied: true,
          },
          () => {
            this.props.setInsightDateRangeData(this.state);
            this.getInsightAdminData();
            this.getinsightmoodbyday();
          }
        );
      }
    }
  };

  render() {
    console.log(this.state,"sss")
    console.log(this.props,"ppp")
    const {
      educator,
      insightData,
      moodbyday,
      studentweblist,
      askstudentweblist,
    } = this.props;

    const { startDate, endDate } = this.state;
    var currentYear = new Date().getFullYear();
    var currentMonth = new Date().getMonth();
    var currentDay = new Date().getDate();
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
        insightData.insightAdminData && insightData.insightAdminData.total_logs
          ? insightData.insightAdminData.total_logs
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
        fontFamily: "omnies",
        displayColors: false,
        alignItems: "left",
        justifyContent: "space-between",
        titleFontStyle: "normal",
        titleAlign: "center",
        bodyAlign: "left",
        padding: 100,
        callbacks: {
          title: function (tooltipItem, data) {
            let moodName = data?.labels[tooltipItem[0]["index"]];
            let subMoods =
              insightData?.insightAdminData?.mood_count?.[moodName];
            let moodCount = "";
            Object.keys(subMoods)?.map((data, index) => {
              if (index === 1) {
                moodCount = subMoods[data];
              }
            });
            return moodCount + " logs";
          },
          label: function (tooltipItem, data) {
            let moodName = data.labels[tooltipItem["index"]];
            let subMoods = insightData?.insightAdminData?.mood_count[moodName];
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
      <div className="insight-container-main-root container-main-root">
        {this.props.authenticate.loading ? <Spinner /> : null}
        <div className="container">
          <div className="container-inner-root">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="yh-tab-header-div">
                  <div className="yh-tab-header-center-div">
                    <ul className="tab-list-ul">
                      <li className="tab-item">
                        <Link
                          onClick={() => {
                            this.setState({
                              selectedClass: "",
                              selectedClassName: "",
                            });
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
                        <Link to="#" className="link">
                          {" "}
                          Insight{" "}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="top-info-header-group-div">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 left-6">
                      <div
                        className={
                          this.state.selectedTag !== "All Time"
                            ? " top-info-header-group-left"
                            : "header-left-nodate"
                        }
                      >
                        <div className="dropdown-group-div">
                          <div className="dropdown_group_block tp_ml">
                            <div
                              ref={this.wrapperRef}
                              className="dropdown-group-box user-dropdown-group-box tp_dropdown_block mr-fix-10"
                              style={{ width: "100%" }}
                            >
                              <div
                                className={`multiClass_select${
                                  !this.state.isEnableSelectMultiClass
                                    ? ""
                                    : " multiCheckbox"
                                }`}
                              >
                                <div className="dropdown">
                                  {this.state.isEnableSelectMultiClass ? (
                                    <button
                                      onClick={
                                        (e) => {}
                                        // this.handleSelectMultipleOption(
                                        //   e,
                                        //   this.props.educator.classListAdmin[0]
                                        // )
                                      }
                                      className="btn btn-secondary dropdown-toggle"
                                      type="button"
                                      id="dropdownMenuButton"
                                      data-toggle="dropdown"
                                      aria-haspopup="true"
                                      aria-expanded="false"
                                      style={{ color: "#3C454C" }}
                                    >
                                      <span className="custom-icon user-icon"></span>
                                      <div
                                        style={{
                                          borderLeft:
                                            "1px solid rgba(226, 208, 208, 0.75)",
                                          height: "36px",
                                          position: "absolute",
                                          left: "9.5%",
                                          top: "0px",
                                        }}
                                      ></div>
                                      {this.state.selectedClassName !== ""
                                        ? this.state.selectedClassName
                                        : "Name Your Class"}
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() =>
                                        this.handleToogleMultipleSelectClasses(
                                          true
                                        )
                                      }
                                      className="btn btn-secondary dropdown-toggle"
                                      type="button"
                                      id="dropdownMenuButton"
                                      data-toggle="dropdown"
                                      aria-haspopup="true"
                                      aria-expanded="false"
                                      style={{ color: "#3C454C" }}
                                    >
                                      <span className="custom-icon user-icon"></span>
                                      <div
                                        className="dropBorder"
                                        style={{
                                          borderLeft:
                                            "1px solid rgba(226, 208, 208, 0.75)",
                                          height: "36px",
                                          position: "absolute",
                                          left: "9.5%",
                                          top: "0px",
                                        }}
                                      ></div>
                                      {this.state.selectedClassName !== ""
                                        ? this.state.selectedClassName
                                        : "Name Your Class"}
                                    </button>
                                  )}
                                  <ul
                                    className={
                                      this.state.toogleMultipleClassDropdown
                                        ? "dropdown-menu show"
                                        : "dropdown-menu"
                                    }
                                    aria-labelledby="dropdownMenuButton"
                                  >
                                    {this.state.isEnableSelectMultiClass ? (
                                      <>
                                        {this.props?.educator?.classListAdmin
                                          .length > 0 &&
                                          this.props.educator.classListAdmin.map(
                                            (data, index) => {
                                              const key =
                                                this.state.multileSelectedClass.findIndex(
                                                  (a) => a.id === data.id
                                                );
                                              return (
                                                <li
                                                  onClick={(e) =>
                                                    this.handleSelectMultipleOption(
                                                      e,
                                                      data
                                                    )
                                                  }
                                                  key={`index_select_${index}`}
                                                  className={`dropdown-item ${
                                                    key.toString() !== "-1"
                                                      ? " checked"
                                                      : ""
                                                  }`}
                                                >
                                                  <input
                                                    type="checkbox"
                                                    name={data.name}
                                                    id={data.name}
                                                  />
                                                  <label htmlFor={data.name}>
                                                    {data.name}
                                                  </label>
                                                </li>
                                              );
                                            }
                                          )}

                                        <Link
                                          onClick={() =>
                                            this.props?.educator?.classListAdmin
                                              .length ===
                                            this.state.multileSelectedClass
                                              .length
                                              ? this.handleSelectAllOptions(
                                                  "None"
                                                )
                                              : this.handleSelectAllOptions(
                                                  "Select All"
                                                )
                                          }
                                          className="dropdown_link"
                                          to="#"
                                        >
                                          {this.props?.educator?.classListAdmin
                                            .length ===
                                          this.state.multileSelectedClass.length
                                            ? "None"
                                            : "Select All"}
                                        </Link>

                                        <Link
                                          onClick={
                                            this.state.multileSelectedClass
                                              ? this
                                                  .handleSelectMultipleClassOptionSubmit
                                              : this
                                                  .handleSelectMultipleClassOption
                                          }
                                          className="dropdown_btn"
                                          to="#"
                                        >
                                          {this.state.multileSelectedClass
                                            .length > 0
                                            ? "Done"
                                            : "Cancel"}
                                        </Link>
                                      </>
                                    ) : (
                                      <>
                                        {this.props?.educator?.classListAdmin
                                          .length > 0 &&
                                          this.props.educator.classListAdmin.map(
                                            (data, index) => {
                                              return (
                                                <li
                                                  onClick={() =>
                                                    this.handleSelectedClass(
                                                      data
                                                    )
                                                  }
                                                  key={`index_single_${index}`}
                                                  className="dropdown-item"
                                                >
                                                  <Link to="#">
                                                    <span className="custom-icon user-icon"></span>{" "}
                                                    {data.name}
                                                  </Link>
                                                </li>
                                              );
                                            }
                                          )}

                                        {/* <li className="dropdown-item">
                                              <Link to="#">
                                                  <span className="custom-icon user-icon"></span> Ms. Green’s 4th Grade
                                              </Link>
                                            </li>
                                            <li className="dropdown-item">
                                              <Link to="#">
                                                  <span className="custom-icon user-icon"></span> Ms. Green’s 4th Grade
                                              </Link>
                                            </li> */}
                                        <Link
                                          onClick={
                                            this.handleSelectMultipleClassOption
                                          }
                                          className="dropdown_link"
                                          to="#"
                                        >
                                          Select Multiple Classes
                                        </Link>
                                      </>
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="tp_box">
                            <div className="icon-box date-icon-box calendar_icon_box">
                              <label className="label-arrow">
                                <span className="custom-icon calendar-icon"></span>
                              </label>
                            </div>
                            <div className="dropdown_group_block">
                              <div className="dropdown-group-box date-dropdown-group-box mr-10-fix">
                                <div className="input-inline-group">
                                  {this.state.timeLineArray.length > 0 && (
                                    <ul className="tp_list">
                                      {this.state.timeLineArray.map(
                                        (timeline) => {
                                          return (
                                            <li
                                              id={timeline.id}
                                              onClick={(e) =>
                                                this.handleTimelineTag(
                                                  e,
                                                  timeline
                                                )
                                              }
                                            >
                                              <Link
                                                to="#"
                                                className={`${
                                                  this.state.selectedTag ===
                                                  timeline.name
                                                    ? "active"
                                                    : timeline.id === 4
                                                    ? ""
                                                    : "add-border"
                                                }`}
                                                value="1"
                                              >
                                                {timeline.name}
                                              </Link>
                                            </li>
                                          );
                                        }
                                      )}
                                      <li>
                                        <DateRangePicker
                                          locale={{ format: "DD MMM YYYY" }}
                                          initialSettings={{
                                            startDate: startDate,
                                            endDate: new Date(),
                                            maxDate: moment().toDate(),
                                          }}
                                          minDate="today"
                                          startDate={startDate}
                                          endDate={endDate}
                                          maxDate={
                                            new Date(
                                              currentYear,
                                              currentMonth,
                                              currentDay
                                            )
                                          }
                                          onApply={this.handleApply}
                                        >
                                          <div className="input-inline-group">
                                            <a
                                              href="#"
                                              className={`${
                                                this.state.selectedTag ===
                                                "Date Range"
                                                  ? "active"
                                                  : ""
                                              }`}
                                            >
                                              Date Range
                                            </a>
                                          </div>
                                        </DateRangePicker>
                                      </li>
                                    </ul>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="yh_log_sidebarWrapper tp_log_sidebar">
                            <div
                              className="yh_list_wrapper"
                              
                            >
                              <div className="yl_list_block yh_time_list">
                                <ul>
                                  <li className="insight_timelist_checkbox ">
                                    <span style={{display:"flex",alignItems:"center"}} ref={this.timewrapperRef}>
                                    <img src={watchTime} alt="image" />
                                    <div className="moodCheckbox_block">
                                      <input
                                        type="checkbox"
                                        name="mood"
                                        id="mood1"
                                        onClick={
                                          this.state.isTimeperiodFilterApplied
                                            ? this.handleTimereset
                                            : this.handleOpenTimePeriod
                                        }
                                        checked={
                                          this.state.isTimePeriodModalActive ||
                                          this.state.isTimeperiodFilterApplied
                                            ? "true"
                                            : ""
                                        }
                                      />
                                      <label
                                        htmlFor="mood1"
                                        className="time_period"
                                      >
                                        {" "}
                                        {this.state.isTimeperiodFilterApplied
                                          ? `${this.state.startTimeHour}:${this.state.startTimeMin} ${this.state.startAmPm} - ${this.state.endTimeHour}:${this.state.endTimeMin} ${this.state.endAmPm}`
                                          : "Time Period"}
                                      </label>
                                    </div>
                                    <div
                                      className={`time_period_popup ${
                                        this.state.isTimePeriodModalActive
                                          ? "active"
                                          : ""
                                      }`}
                                    >
                                      <div className="time_period_popup_inner">
                                        <h6>View moods by time</h6>
                                        <div className="time_period_input">
                                          <label for="">from</label>
                                          <input
                                            className={`${
                                              this.state.isstartHourActive
                                                ? "time_period_input_violate"
                                                : "mfix"
                                            }`}
                                            type="number"
                                            maxLength="2"
                                            min="0"
                                            max="12"
                                            name="hours"
                                            style={
                                              this.state.hoursError
                                                ? { border: "1px solid red" }
                                                : null
                                            }
                                            placeholder="HH"
                                            value={this.state.startTimeHour}
                                            onChange={(e) =>
                                              this.handleHourInput(e)
                                            }
                                          />
                                          <span>:</span>
                                          <input
                                            type="number"
                                            maxLength="2"
                                            min="0"
                                            max="60"
                                            name="minutes"
                                            className={`${
                                              this.state.isstartMinActive
                                                ? "time_period_input_violate"
                                                : "mfix"
                                            }`}
                                            style={
                                              this.state.minutesError
                                                ? { border: "1px solid red" }
                                                : null
                                            }
                                            placeholder="MM"
                                            value={this.state.startTimeMin}
                                            onChange={(e) =>
                                              this.handleMinuteInput(e)
                                            }
                                          />
                                          <div className="tp_radio">
                                            <input
                                              type="radio"
                                              id="am"
                                              name="tp_lbl1"
                                              checked={
                                                this.state.startAmPm === "am"
                                              }
                                              onChange={() =>
                                                this.setState({
                                                  startAmPm: "am",
                                                  isstartHourActive: false,
                                                  isendHourActive: false,
                                                  isendMinActive: false,
                                                  isstartMinActive: false,
                                                  hoursError: false,
                                                  minutesError: false,
                                                  endTimeHourerror: false,
                                                  endTimeminutesError: false,
                                                })
                                              }
                                            />
                                            <label for="am" className="tp_lbl1">
                                              am
                                            </label>
                                            <span className="vl"></span>
                                            <input
                                              type="radio"
                                              id="pm"
                                              name="tp_lbl1"
                                              checked={
                                                this.state.startAmPm === "pm"
                                              }
                                              onChange={() =>
                                                this.setState({
                                                  startAmPm: "pm",
                                                  isstartHourActive: false,
                                                  isendHourActive: false,
                                                  isendMinActive: false,
                                                  isstartMinActive: false,
                                                  hoursError: false,
                                                  minutesError: false,
                                                  endTimeHourerror: false,
                                                  endTimeminutesError: false,
                                                })
                                              }
                                            />
                                            <label for="pm" className="tp_lbl1">
                                              pm
                                            </label>
                                          </div>
                                        </div>
                                        <div className="time_period_input">
                                          <label for="">To</label>
                                          <input
                                            type="number"
                                            maxLength="2"
                                            min="0"
                                            max="12"
                                            name="endhours"
                                            className={`${
                                              this.state.isendHourActive
                                                ? "time_period_input_violate"
                                                : "mfix"
                                            }`}
                                            style={
                                              this.state.endTimeHourerror
                                                ? { border: "1px solid red" }
                                                : null
                                            }
                                            placeholder="HH"
                                            value={this.state.endTimeHour}
                                            onChange={(e) =>
                                              this.handleHourInput(e)
                                            }
                                          />
                                          <span>:</span>
                                          <input
                                            type="number"
                                            maxLength="2"
                                            min="0"
                                            max="60"
                                            name="endminutes"
                                            className={`${
                                              this.state.isendMinActive
                                                ? "time_period_input_violate"
                                                : "mfix"
                                            }`}
                                            style={
                                              this.state.endTimeminutesError
                                                ? { border: "1px solid red" }
                                                : null
                                            }
                                            placeholder="MM"
                                            value={this.state.endTimeMin}
                                            onChange={(e) =>
                                              this.handleMinuteInput(e)
                                            }
                                          />
                                          <div className="tp_radio">
                                            <input
                                              type="radio"
                                              id="am2"
                                              name="tp_lbl2"
                                              checked={
                                                this.state.endAmPm === "am"
                                              }
                                              onChange={() =>
                                                this.setState({
                                                  endAmPm: "am",
                                                  isstartHourActive: false,
                                                  isendHourActive: false,
                                                  isendMinActive: false,
                                                  isstartMinActive: false,
                                                  hoursError: false,
                                                  minutesError: false,
                                                  endTimeHourerror: false,
                                                  endTimeminutesError: false,
                                                })
                                              }
                                            />
                                            <label
                                              for="am2"
                                              className="tp_lbl2"
                                            >
                                              am
                                            </label>
                                            <span className="vl"></span>
                                            <input
                                              type="radio"
                                              id="pm2"
                                              name="tp_lbl2"
                                              checked={
                                                this.state.endAmPm === "pm"
                                              }
                                              onChange={() =>
                                                this.setState({
                                                  endAmPm: "pm",
                                                  isstartHourActive: false,
                                                  isendHourActive: false,
                                                  isendMinActive: false,
                                                  isstartMinActive: false,
                                                  hoursError: false,
                                                  minutesError: false,
                                                  endTimeHourerror: false,
                                                  endTimeminutesError: false,
                                                })
                                              }
                                            />
                                            <label
                                              for="pm2"
                                              className="tp_lbl2"
                                            >
                                              pm
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                      <ul className="tp_btns">
                                        <li>
                                          <a
                                            href="#"
                                            onClick={(e) => {
                                              this.setState({
                                                isTimePeriodModalActive: false,
                                              });
                                            }}
                                          >
                                            cancel
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            href="#"
                                            className="cancel"
                                            style={
                                              !this.state.endTimeHourerror &&
                                              !this.state.endTimeminutesError &&
                                              !this.state.hoursError &&
                                              !this.state.minutesError &&
                                              this.state.startTimeHour &&
                                              this.state.startTimeMin &&
                                              this.state.endTimeHour &&
                                              this.state.endTimeMin &&
                                              this.state.endAmPm &&
                                              this.state.startAmPm
                                                ? { backgroundColor: "#652d90" }
                                                : null
                                            }
                                            onClick={this.handleTimeApply}
                                          >
                                            apply
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                    </span>
                                   
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 left-6">
                      <div className="top-info-header-group-right">
                        <div
                          className={
                            this.state.selectedTag !== "All Time"
                              ? "header-date-info"
                              : "header-date-info-nodate"
                          }
                        >
                          <span>
                            {this.state.selectedTag == "Today"
                              ? "Today"
                              : this.state.selectedTag == "All Time" ? '': this.state.startDate && this.state.endDate && this.state.startDate !== ''
                              ? `${this.state.startDate.format(
                                  "DD MMM YYYY"
                                )} - ${this.state.endDate.format(
                                  "DD MMM YYYY"
                                )}`
                              : ""}
                          </span>
                        </div>
                        <div className="count-view-list count-view-list2">
                          <div className="count-view-box student-box">
                            <h2>
                              {insightData.insightAdminData
                                ? insightData.insightAdminData.total_students
                                : 0}
                            </h2>
                            <p>Students</p>
                          </div>
                          <div className="count-view-box logs-box">
                            <Link
                              to="#"
                              //   href="insight-view-all-logs-class-journal.html"
                              className="link-count"
                              onClick={() => this.handleSteps(1)}
                            >
                              <h2>
                                {insightData.insightAdminData
                                  ? insightData.insightAdminData.total_logs
                                  : 0}
                              </h2>
                              <p>Logs</p>
                            </Link>
                          </div>
                          <div className="count-view-box flagged-logs-box">
                            <Link
                              to="#"
                              //   href="flagged-logs.html"
                              className="link-count"
                              onClick={() => this.handleSteps(3)}
                            >
                              <h2>
                                {" "}
                                {insightData.insightAdminData
                                  ? insightData.insightAdminData.flagged_logs
                                  : 0}
                              </h2>
                              <p>Flagged Logs</p>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                                  {/* <img
                                    src="assets/images/adminGraph.png"
                                    className="img-fluid img-graph"
                                    alt="graph"
                                  /> */}
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
                            {insightData.insightAdminData &&
                            !insightData.insightAdminData.mood_count ? (
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
                                      {insightData.insightAdminData &&
                                      insightData.insightAdminData.mood_count
                                        ? Object.keys(
                                            insightData.insightAdminData
                                              .mood_count
                                          ).map((keyName, i) => (
                                            <div
                                              className="mood-field-item"
                                              onBlur={() =>
                                                this.setState({
                                                  isgraph: true,
                                                  isuser: false,
                                                })
                                              }
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
                                                        .insightAdminData.mood[
                                                        keyName
                                                      ]
                                                    }
                                                    %
                                                  </span>
                                                </span>
                                              </div>
                                              <div className="mood-expander-wrapper">
                                                <div className="mood-toggle">
                                                  <ul>
                                                    <li
                                                      className={
                                                        this.state.isgraph &&
                                                        "active"
                                                      }
                                                      onClick={() =>
                                                        this.handleclickgraph()
                                                      }
                                                    >
                                                      <Link to="#">
                                                        <svg
                                                          xmlns="http://www.w3.org/2000/svg"
                                                          width="13.391"
                                                          height="13.417"
                                                          viewBox="0 0 13.391 13.417"
                                                        >
                                                          <g
                                                            id="Group_1"
                                                            data-name="Group 1"
                                                            transform="translate(-9.565 -4.33)"
                                                          >
                                                            <g
                                                              id="Group"
                                                              transform="translate(9.565 4.33)"
                                                            >
                                                              <g id="noun_chart_2391125">
                                                                <path
                                                                  id="Path"
                                                                  d="M6.265,6.244V0L6.24,0a6.26,6.26,0,0,0,.008,12.521A6.194,6.194,0,0,0,12.5,6.244Z"
                                                                  transform="translate(0 0.896)"
                                                                  fill="#652d90"
                                                                />
                                                                <path
                                                                  id="Path-2"
                                                                  data-name="Path"
                                                                  d="M6.232,6.242s-.011.011-.011.005A6.157,6.157,0,0,0,0,0V6.241H6.232Z"
                                                                  transform="translate(7.16)"
                                                                  fill="#652d90"
                                                                />
                                                              </g>
                                                            </g>
                                                          </g>
                                                        </svg>
                                                      </Link>
                                                    </li>
                                                    <li
                                                      className={
                                                        this.state.isuser &&
                                                        "active"
                                                      }
                                                      onClick={() =>
                                                        this.handleclickuser()
                                                      }
                                                    >
                                                      <Link to="#">
                                                        <svg
                                                          id="noun_users_791122"
                                                          xmlns="http://www.w3.org/2000/svg"
                                                          width="11.027"
                                                          height="13.546"
                                                          viewBox="0 0 11.027 13.546"
                                                        >
                                                          <ellipse
                                                            id="Oval"
                                                            cx="2.775"
                                                            cy="2.767"
                                                            rx="2.775"
                                                            ry="2.767"
                                                            transform="translate(2.739 0)"
                                                            fill="#652d90"
                                                          />
                                                          <path
                                                            id="Path"
                                                            d="M5.513,7.4c-3.043,0-5.72-.534-5.5-1.869C.6,2.039,2.422,0,5.513,0s4.917,2.063,5.5,5.535C11.233,6.87,8.556,7.4,5.513,7.4Z"
                                                            transform="translate(0 6.142)"
                                                            fill="#652d90"
                                                          />
                                                        </svg>
                                                      </Link>
                                                    </li>
                                                  </ul>
                                                </div>

                                                {this.state.isgraph && (
                                                  <div className="mood-expander">
                                                    <div className="mood_exIcon">
                                                      <span
                                                        className={`mood-icon mood-${keyName.toLowerCase()}-icon`}
                                                      ></span>
                                                      <span className="mood-field-percentage">
                                                        {
                                                          insightData
                                                            .insightAdminData
                                                            .mood[keyName]
                                                        }
                                                        %
                                                      </span>
                                                    </div>

                                                    <ul>
                                                      {/* <li><span>{keyName}</span>: <span className="mood-field-percentage">{insightData.insightAdminData.mood_count[keyName][keyName]}%</span></li> */}
                                                      {insightData.insightAdminData.mood_count[
                                                        keyName
                                                      ].sub_mood_per.map(
                                                        (data) => {
                                                          return Object.keys(
                                                            data
                                                          ).map(
                                                            (mood_i, index) =>
                                                              index === 0 ? (
                                                                <li>
                                                                  <span>
                                                                    {mood_i}
                                                                  </span>{" "}
                                                                  <span className="mood-field-percentage">
                                                                    {
                                                                      data[
                                                                        mood_i
                                                                      ]
                                                                    }
                                                                    %
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
                                                )}
                                                {insightData.insightAdminData &&
                                                  insightData.insightAdminData?.user_mood
                                                    .filter((item) => {
                                                      return (
                                                        item.mood == keyName
                                                      );
                                                    })

                                                    .map((studentdata, i) => (
                                                      <>
                                                        {this.state.isuser && (
                                                          <div className="mood-expander user">
                                                            <div className="mood_exIcon">
                                                              <span
                                                                className={`mood-icon mood-${studentdata.mood.toLowerCase()}-icon`}
                                                              ></span>
                                                              <span className="mood-field-percentage">
                                                                {
                                                                  insightData
                                                                    .insightAdminData
                                                                    .mood_count[
                                                                    keyName
                                                                  ].count
                                                                }
                                                              </span>
                                                            </div>

                                                            <ul>
                                                              {/* <li>{studentdata.data.student}: <span className="mood-field-percentage">{insightData.insightAdminData.user_mood.studentdata.data.count}</span></li> */}
                                                              {studentdata.data.map(
                                                                (data) => {
                                                                  return Object.keys(
                                                                    data
                                                                  ).map(
                                                                    (
                                                                      mood_i,
                                                                      index
                                                                    ) =>
                                                                      index ===
                                                                      0 ? (
                                                                        <li>
                                                                          <span>
                                                                            {
                                                                              data.student
                                                                            }
                                                                          </span>
                                                                          <span className="mood-field-percentage">
                                                                            {
                                                                              data.count
                                                                            }
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
                                                        )}
                                                      </>
                                                    ))}
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
                      <div className="yh_insight_myStudent_wrapper">
                        <div className="yh_insight_myStudent_heading">
                          <h3>My Students</h3>
                        </div>
                        <div
                          className="insight_myStudent_moodListWrapper"
                          id="insight_myStudent_moodListWrapper"
                        >
                          <InfiniteScroll
                            style={{ overflow: "hidden" }}
                            dataLength={this.state.studentweblistdata.length}
                            next={this.handleScrollForStudentList}
                            hasMore={this.state.studentlinkdata.next > 0}
                            scrollableTarget={
                              "insight_myStudent_moodListWrapper"
                            }
                          >
                            <div className="students-box-list">
                              <div
                                className="row"
                                style={{
                                  marginRight: "-5px",
                                  marginLeft: "-5px",
                                }}
                              >
                                {this.state.studentweblistdata &&
                                this.state.studentweblistdata &&
                                this.state.studentweblistdata.length > 0
                                  ? this.state.studentweblistdata.map(
                                      (res, index) =>
                                        res.is_status ? (
                                          <div
                                            className="col-lg-6 col-md-6 plr-5"
                                            key={index}
                                          >
                                            <div
                                              className={`my-student-box ${
                                                res.is_flag ? "active" : ""
                                              }`}
                                            >
                                              <Link
                                                to="#"
                                                className="link-full"
                                                onClick={() =>
                                                  this.handleIndividualStudentData(
                                                    res.class_id,
                                                    res.id
                                                  )
                                                }
                                                key={index}
                                              >
                                                <div className="stu-info-box">
                                                  <h3>{res.username}</h3>
                                                  <p>
                                                    {res.date && (
                                                      <span className="date-span">
                                                        {parseInt(
                                                          moment
                                                            .duration(
                                                              moment().diff(
                                                                moment(
                                                                  moment(
                                                                    res.date
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
                                                                        res.date
                                                                      ).format(
                                                                        "YYYY-MM-DD"
                                                                      ),
                                                                      "YYYY-MM-DD"
                                                                    ).startOf(
                                                                      "day"
                                                                    )
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
                                                                        res.date
                                                                      ).format(
                                                                        "YYYY-MM-DD"
                                                                      ),
                                                                      "YYYY-MM-DD"
                                                                    ).startOf(
                                                                      "day"
                                                                    )
                                                                  )
                                                                )
                                                                .asDays()
                                                            ) !== 0
                                                          ? moment(
                                                              res.data
                                                            ).format("YYYY") ===
                                                            moment(
                                                              new Date().getFullYear()
                                                            ).format("YYYY")
                                                            ? moment(
                                                                res.date
                                                              ).format(
                                                                "DD MMMM YYYY"
                                                              )
                                                            : moment(
                                                                res.date
                                                              ).format(
                                                                "dddd, DD MMMM"
                                                              )
                                                          : ""}
                                                      </span>
                                                    )}
                                                    {res.time && (
                                                      <span className="time-span">
                                                        {moment(
                                                          new Date(
                                                            res.status_date_created_web_utc
                                                          )
                                                        ).format("h:mm A")}
                                                      </span>
                                                    )}
                                                  </p>
                                                </div>
                                                <div className="action-mood-box">
                                                  <div className="mood-icon-box">
                                                    <span
                                                      className={`mood-icon mood-${
                                                        res?.mood?.parent
                                                          ?.slug ||
                                                        res.mood.slug
                                                      }-icon`}
                                                    ></span>
                                                  </div>
                                                  {res.is_flag ? (
                                                    <div className="flag-icon-box">
                                                      <span className="custom-icon flag-icon"></span>
                                                    </div>
                                                  ) : null}
                                                </div>
                                              </Link>
                                            </div>
                                          </div>
                                        ) : (
                                          ""
                                        )
                                    )
                                  : null}
                              </div>
                            </div>
                          </InfiniteScroll>
                        </div>
                        {studentweblist &&
                        studentweblist &&
                        studentweblist.length === 0 ? (
                          <div className="insight_myStudent_moodListWrapper noLogs">
                            <div className="noLogs_wrapper">
                              <img src={empty_state} alt="empty" />
                              <h6>You have no mood logs to view!</h6>
                            </div>
                          </div>
                        ) : null}
                        <div className="yh_insight_myStudent_btnWrapper">
                          <Link
                            to="#"
                            // href="javascript:;"
                            data-toggle="modal"
                            data-target="#askstudent"
                            className="insight_myStudent_btn"
                            onClick={this.handleOpenAskMyStudentModal}
                          >
                            Ask 'How are you?'
                          </Link>
                          <Link
                            to="#"
                            onClick={() => this.handleSteps(1)}
                            data-toggle="modal"
                            data-target="#askallstudent"
                            className="insight_myStudent_btn"
                          >
                            Mood Journal
                          </Link>
                        </div>
                      </div>

                      <div className="topics-box-root">
                        <div className="row">
                          <div className="col-lg-6 col-md-6">
                            <div className="topics-box-card flagged-topics-box-card">
                              <div className="topics-box-header">
                                <div className="topics-row">
                                  <div className="topics-box-col width-66">
                                    <h4 className="color1">Flagged Topics</h4>
                                  </div>
                                  <div className="topics-box-col width-33 topics-box-col-center">
                                    <h4>Date</h4>
                                  </div>
                                </div>
                              </div>

                              <div className="topics-box-body">
                                {insightData.insightAdminData &&
                                insightData.insightAdminData.flagged_topics &&
                                insightData.insightAdminData.flagged_topics
                                  .length > 0 ? (
                                  insightData.insightAdminData.flagged_topics.map(
                                    (res, index) => (
                                      <Link
                                        to="#"
                                        // href="flagged-logs.html"
                                        className="topic-link"
                                        onClick={() => this.handleSteps(3)}
                                        key={index}
                                      >
                                        <div className="topics-row">
                                          <div className="topics-box-col width-47">
                                            <p>{res.keyword__name}</p>
                                          </div>
                                          <div className="topics-box-col width-20">
                                            <div className="icon-mood-center">
                                              <span
                                                className={`mood-icon mood-${
                                                  res.status__mood__parent__name ===
                                                  null
                                                    ? res.status__mood__name.toLowerCase()
                                                    : res.status__mood__parent__name.toLowerCase()
                                                }-icon`}
                                              ></span>
                                            </div>
                                          </div>
                                          <div className="topics-box-col width-33 topics-box-col-center">
                                            <p>
                                              {moment(res.date_created).format(
                                                "DD MMM"
                                              )}
                                            </p>
                                          </div>
                                        </div>
                                      </Link>
                                    )
                                  )
                                ) : (
                                  <div className="noLogs_topic">
                                    {/* <h6>No flagged topics yet!</h6> */}
                                    <h6>No Flagged Logs!</h6>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="topics-box-card popular-topics-box-card">
                              <div className="topics-box-header">
                                <div className="topics-row">
                                  <div className="topics-box-col width-66">
                                    <h4>Popular Topics</h4>
                                  </div>
                                  <div className="topics-box-col width-33 topics-box-col-center">
                                    <h4>Mentions</h4>
                                  </div>
                                </div>
                              </div>

                              <div className="topics-box-body">
                                {insightData.insightAdminData &&
                                insightData.insightAdminData.popular_topics &&
                                insightData.insightAdminData.popular_topics
                                  .length > 0 ? (
                                  insightData.insightAdminData.popular_topics.map(
                                    (res, index) => (
                                      <Link
                                        to="#"
                                        // href="popular-topics-logs.html"
                                        className="topic-link"
                                        key={index}
                                        onClick={() => this.handleSteps(2)}
                                      >
                                        <div className="topics-row">
                                          <div className="topics-box-col width-47">
                                            <p>{res.topic_name}</p>
                                          </div>
                                          <div className="topics-box-col width-20">
                                            <div className="icon-mood-center">
                                              <span
                                                className={`mood-icon mood-${
                                                  res.mood_parent === null
                                                    ? res.mood.toLowerCase()
                                                    : res.mood_parent.toLowerCase()
                                                }-icon`}
                                              ></span>
                                              {/* className={`mood-icon mood-${
                                                  res?.mood?.parent?.slug ||
                                                  res.mood.toLowerCase()
                                                }-icon`}></span> */}
                                            </div>
                                          </div>
                                          <div className="topics-box-col width-33 topics-box-col-center">
                                            <p>{res.mentions}</p>
                                          </div>
                                        </div>
                                      </Link>
                                    )
                                  )
                                ) : (
                                  <div className="noLogs_topic">
                                    {/* <h6>No popular topics yet!</h6> */}
                                    <h6>No Popular Topics!</h6>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="yh_insight_myStudent_wrapper">
                        <div className="yh_insight_myStudent_heading">
                          <h3>Moods by Day</h3>
                        </div>
                        <div className="insight_myStudent_moodListWrapper">
                          <>
                            <HighchartsReact
                              highcharts={Highcharts}
                              options={this.state.optionsForMoodbyDay}
                            />
                            {/* {moodByDayData.datasets &&
                          moodByDayData.datasets
                            .map((res) => res.data.find((d) => d !== "0"))
                            .find((d) => d !== "0") ? (
                            <HorizontalBar
                              data={moodByDayData}
                              options={moodByDayDataOptions}
                              width={100}
                              height={20}
                            />
                          ) : (
                            <HorizontalBar
                              data={moodByDayData}
                              options={moodByDayDataOptions}
                              width={100}
                              height={20}
                            />
                          )} */}
                            {(this.state.selectedTag === "30 days" ||
                              this.state.selectedTag === "All Time" ||
                              this.state.selectedTag === "Date Range") && (
                              <Pagination
                                activePage={this.state.page}
                                itemsCountPerPage={7}
                                totalItemsCount={this.state.totalCount}
                                pageRangeDisplayed={10}
                                itemclassName="page-item"
                                linkclassName="page-link"
                                onChange={(number) =>
                                  this.handleOnChangePaginationForMoodByDay(
                                    number
                                  )
                                }
                              />
                            )}
                          </>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.isOpenAskMyStudentModal ? (
          <AskMyStudent
            show={this.state.isOpenAskMyStudentModal}
            onClose={this.isOpenAskMyStudentModal}
            props={this.props}
            studentDetails={this.state.askstudentweblistdata}
            selectedclassName={
              this.state.multileSelectedClass.length > 0
                ? this.state.multipleClass
                : this.state.selectedClass
            }
            educator={this.props.educator}
            askstudentlistfunc={this.getaskstudentWeblist}
            askstudentlinkdataobj={this.state.askstudentlinkdata}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Dashboard;
