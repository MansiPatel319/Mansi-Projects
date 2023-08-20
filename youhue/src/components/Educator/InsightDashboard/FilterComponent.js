import React, { Component } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import moment from "moment";
import watch from "../../../assets/images/icons/watch.svg";
import { Link } from "react-router-dom";
class FilterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mood: this.mood,
      tag: this.tag,
      timeline: this.timeline,
      selectedTag: this.props.selectedTag,
      isTimepopupActive: false,
      hoursError: false,
      minutesError: false,
      endTimeHourerror: false,
      endTimeminutesError: false,
      isstartHourActive: false,
      isendHourActive: false,
      isstartMinActive: false,
      isendMinActive: false,
      isTimeperiodFilterApplied: this.props.isTimeperiodFilterApplied,
      startAmPm: this.props.startAmPm,
      endAmPm: this.props.endAmPm,
      startTimeHour: this.props.startTimeHour,
      startTimeMin: this.props.startTimeMin,
      endTimeHour: this.props.endTimeHour,
      endTimeMin: this.props.endTimeMin,
      startTime: this.props.startTime,
      endTime: this.props.endTime,
      utcStartTime: this.props.utcStartTime,
      utcEndTime: this.props.utcEndTime,
    };
    this.handleApply = this.handleApply.bind(this);
    this.timewrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
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
  };

  handleApply = (event, picker) => {
    this.props.handlePickerDataFilter(picker.startDate, picker.endDate);
  };

  handleTimePopup = () => {
    this.setState({
      isTimepopupActive: !this.state.isTimepopupActive,
    });
  };

  handleTimereset = () => {
    if (this.state.isTimeperiodFilterApplied) {
      this.setState({
        isTimepopupActive: false,
        isTimeperiodFilterApplied: false,
        startAmPm: "",
        endAmPm: "",
        utcStartTime: undefined,
        utcEndTime: undefined,
        startTimeHour: "",
        startTimeMin: "",
        endTimeMin: "",
        endTimeHour: "",
        hoursError: false,
        minutesError: false,
        endTimeHourerror: false,
        endTimeminutesError: false,
        isstartHourActive: false,
        isendHourActive: false,
        isstartMinActive: false,
        isendMinActive: false,
      },()=>{
        this.props.setInsightDateRangeDataUpdate(this.state);
      });
    }
  };

  handleClickOutside = (event) => {
    if (!this.timewrapperRef?.current?.contains(event.target)) {
      this.setState({
        isTimepopupActive: false,
      });
    }
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
            isTimepopupActive: false,
            isTimeperiodFilterApplied: true,
          },
          () => {
            this.props.setInsightDateRangeDataUpdate(this.state);
          }
        );
      }
    }
  };
  componentDidMount() {
    document.addEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
  }

  componentWillUnmount() {
    document.removeEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
  }

  render() {
    const { mood_details } = this.state.mood;
    const { tag_details } = this.state.tag;
    const { timeline_details } = this.state.timeline;
    const { keywordDetail } = this.props;
    console.log(this.props,"sssssssssssssss")
    return (
      <>
        <div className="yh_log_sidebarWrapper">
          <div className="yh_list_wrapper">
            <div className="yl_list_block yh_timeline_list">
              <h3>
                <div class="icon-box date-icon-box calendar_icon_box">
                  <span className="custom-icon calendar-icon mr-2"></span>
                </div>
                {this.props.selected_tag==="Today"?"Today":this.props.startDate && this.props.endDate
                  ? `${this.props.startDate.format(
                      "DD MMM YYYY"
                    )} - ${this.props.endDate.format("DD MMM YYYY")}`
                  : ""}
              </h3>
              <ul>
                {timeline_details && timeline_details.length !== 0
                  ? timeline_details.map((data) => {
                      return (
                        <li
                          className={`${
                            this.props.selected_tag === data.name
                              ? "active"
                              : ""
                          }`}
                          key={data.id}
                        >
                          <div
                            onClick={(e) =>
                              this.props.handleTimelineTag(e, data.name)
                            }
                          >
                            <p value="This Week">{data.name}</p>
                          </div>
                        </li>
                      );
                    })
                  : ""}
                <li className={`${
                            this.props.selected_tag === "Date Range"
                              ? "active"
                              : ""
                          }`}>
                  {" "}
                  <DateRangePicker
                    locale={{ format: "DD MMM YYYY" }}
                    maxDate={moment().format("DD MMM YYYY")}
                    minDate="today"
                    initialSettings={{
                      startDate: this.props.startDate,
                      endDate: this.props.endDate,
                      maxDate: moment().toDate(),
                    }}
                    startDate={this.props.startDate}
                    endDate={this.props.endDate}
                    onApply={this.handleApply}
                  >
                    <div className="input-inline-group" onClick={(e) =>
                              this.props.handleTimelineTag(e, "Date Range")
                            }>
                      <input
                        type="text"
                        className="form-control form-date"
                        style={{ display: "none" }}
                        id="date-picker-01"
                        name="daterange"
                        value={`${
                          this.props.startDate
                            ? this.props.startDate.format("DD MMM YYYY")
                            : ""
                        } - ${
                          this.props.endDate
                            ? this.props.endDate.format("DD MMM YYYY")
                            : ""
                        }`}
                        onChange={() => console.log("CHANGE")}
                      />
                      <p className="label-arrow">Date Range</p>
                    </div>
                  </DateRangePicker>
                </li>
              </ul>
            </div>
            <div class="yl_list_block yh_time_list">
              <ul>
                <li>
                  <img src={watch} alt="image" />
                  {this.state.isTimeperiodFilterApplied
                    ? `${this.state.startTimeHour}:${this.state.startTimeMin} ${this.state.startAmPm} - ${this.state.endTimeHour}:${this.state.endTimeMin} ${this.state.endAmPm}`
                    : ""}
                </li>
                <li ref={this.timewrapperRef}>
                  <div className="moodCheckbox_block">
                    <input
                      type="checkbox"
                      name="mood"
                      onClick={
                        this.state.isTimeperiodFilterApplied
                          ? this.handleTimereset
                          : this.handleTimePopup
                      }
                      id="timeperiodinp"
                      checked={
                        this.state.isTimepopupActive ||
                        this.state.isTimeperiodFilterApplied
                          ? "true"
                          : ""
                      }
                    />
                    <label for="timeperiodinp" className="time_period">
                      Time period
                    </label>
                  </div>
                  <div
                    className={`time_period_popup time_period_popup_fix ${
                      this.state.isTimepopupActive ? "active" : ""
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
                              : ""
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
                          onChange={(e) => this.handleHourInput(e)}
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
                              : ""
                          }`}
                          style={
                            this.state.minutesError
                              ? { border: "1px solid red" }
                              : null
                          }
                          placeholder="MM"
                          value={this.state.startTimeMin}
                          onChange={(e) => this.handleMinuteInput(e)}
                        />
                        <div className="tp_radio">
                          <input
                            type="radio"
                            id="am"
                            name="tp_lbl1"
                            checked={this.state.startAmPm === "am"}
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
                          <label for="am" className="tp_lbl">
                            am
                          </label>
                          <span className="vl"></span>
                          <input
                            type="radio"
                            id="pm"
                            name="tp_lbl1"
                            checked={this.state.startAmPm === "pm"}
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
                          <label for="pm" className="tp_lbl">
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
                              : ""
                          }`}
                          style={
                            this.state.endTimeHourerror
                              ? { border: "1px solid red" }
                              : null
                          }
                          placeholder="HH"
                          value={this.state.endTimeHour}
                          onChange={(e) => this.handleHourInput(e)}
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
                              : ""
                          }`}
                          style={
                            this.state.endTimeminutesError
                              ? { border: "1px solid red" }
                              : null
                          }
                          placeholder="MM"
                          value={this.state.endTimeMin}
                          onChange={(e) => this.handleMinuteInput(e)}
                        />
                        <div className="tp_radio">
                          <input
                            type="radio"
                            id="am2"
                            name="tp_lbl2"
                            checked={this.state.endAmPm === "am"}
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
                          <label for="am2" className="tp_lbl">
                            am
                          </label>
                          <span className="vl"></span>
                          <input
                            type="radio"
                            id="pm2"
                            name="tp_lbl2"
                            checked={this.state.endAmPm === "pm"}
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
                          <label for="pm2" className="tp_lbl">
                            pm
                          </label>
                        </div>
                      </div>
                    </div>
                    <ul className="tp_btns">
                      <li>
                        <a
                          href="#"
                          onClick={() => {
                            this.setState({ isTimepopupActive: false });
                          }}
                        >
                          cancel
                        </a>
                      </li>
                      <li>
                        <Link
                          to="#"
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
                          onClick={() => {
                            this.handleTimeApply();
                          }}
                        >
                          apply
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
            {this.props.keywords ? (
              <div className="yl_list_block yh_mood_list">
                <h3 className="red_color">
                  {" "}
                  <span className="block">This Class’</span>
                  <span className="block">{this.props.title}</span>
                </h3>
                <ul>
                  {keywordDetail?.map((data, index) => {
                    return (
                      <li>
                        <div className="moodCheckbox_block">
                          <input
                            type="checkbox"
                            name={`keyword${index}`}
                            id={`keyword${index}`}
                            checked={this.props.keyword_filter.includes(
                              data.keyword__name
                            )}
                            // onClick={(e) => this.handleTagsClick(tag.id)}
                            onClick={(e) => {
                              this.props.handleKewordFilter(
                                e,
                                data.keyword__name
                              );
                            }}
                          />
                          <label for={`keyword${index}`} key={index}>
                            {data.keyword__name}
                          </label>
                        </div>
                      </li>
                    );
                  })}
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
                                onClick={(e) => {
                                  this.props.handleChangeMoodFilter(
                                    e,
                                    data.name
                                  );
                                }}
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
                              checked={this.props.tag_filter.includes(
                                data.name
                              )}
                              onClick={(e) => {
                                this.props.handleChangeTagFilter(e, data.name);
                              }}
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
                        checked={this.props.is_flag}
                        onClick={this.props.handleIsFlagged}
                      />
                      <label for="flagged_logs">Flagged Logs</label>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default FilterComponent;
