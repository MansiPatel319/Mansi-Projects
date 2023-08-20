import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import InputComponent from "../../../UI/InputComponent";
import { doAskHowAreYou } from "../../../../store/network/Educator/insightData";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions/index";
import empty_state from "../../../../assets/images/empty_state.svg";
import moment from "moment";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

class AskMyStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      multileSelectedStudent: [],
    };
  }

  renderStudentItem = (data, index) => {
    const key = this.state.multileSelectedStudent.findIndex(
      (a) => a.id === data.id
    );
    return (
      <>
        <label className="studentcheckbox" htmlFor={data.username}>
          <InputComponent
            inputType="checkbox"
            inputName={data.username}
            inputID={data.username}
          />
          <div
            className={
              key !== -1
                ? `${
                    data.is_flag
                      ? "my-student-box active newActive"
                      : "my-student-box active"
                  }`
                : `${
                    data.is_flag ? "my-student-box newActive" : "my-student-box"
                  }`
            }
          >
            <Link
              to="insight-individual-student-view.html"
              className="link-full"
            >
              <div className="stu-info-box">
                <h3>{data.username}</h3>

                <p>
                  <span className="date-span">
                    {data.ask_date_created_web_utc
                      ? moment(
                          new Date(data.ask_date_created_web_utc)
                        ).fromNow()
                      : data.time_ago}

                    {/* {data.ask_date_created_web_utc}
                    {data.time_ago} */}
                  </span>
                </p>
              </div>
              <div className="action-mood-box">
                <div className="mood-icon-box">
                  {" "}
                  <span
                    className={`mood-icon mood-${
                      data.mood?.parent?.slug || data.mood?.slug
                    }-icon`}
                  ></span>{" "}
                </div>
                {data.is_flag ? (
                  <div className="flag-icon-box">
                    <span className="custom-icon flag-icon"></span>
                  </div>
                ) : null}
              </div>
            </Link>
          </div>
        </label>
      </>
    );
  };

  handleSelectStudent = (e, data, index) => {
    e.preventDefault();
    let newArray = [...this.state.multileSelectedStudent];
    const key = newArray.findIndex((item) => item.id === data.id);
    if (key.toString() !== "-1") {
      newArray.splice(key, 1);
    } else {
      newArray.push(data);
    }
    this.setState({ multileSelectedStudent: newArray });
  };

  handleSelectAllStudent = () => {
    if (
      this.state.multileSelectedStudent.length ===
      this.props.studentDetails?.length
    ) {
      this.setState({
        multileSelectedStudent: [],
      });
    } else {
      this.setState({
        multileSelectedStudent: this.props.studentDetails,
      });
    }
  };

  handleAskStudent = async () => {
    var keyArray = this.state.multileSelectedStudent.map(function (item) {
      return `${item["class_id"]}||${item["id"]}`;
    });
    const body = {
      educator: this.props.educator.educatorData.id,
      students: JSON.stringify(keyArray),
    };
    this.props.doAskHowAreYou(body).then((res) => {
      if (res.code === 201 && res.status === true) {
        this.props.onClose();
      }
      if (res.code === 400) {
      }
    });
  };

  handleScrollForAskStudentList = () => {
    // studentDetails
    this.props.askstudentlistfunc();
  };

  render() {
    console.log("studentDetails", this.props.studentDetails, this.props.props);

    return (
      <>
        {/* <div
          className="modal modal-custom modal-custom-new insightAdmin_modal fade show"
          id="askstudent"
          style={{paddingRight: '15px', display: 'block'}}
        > */}
        <Modal
          className="modal modal-custom modal-custom-new insightAdmin_modal fade show"
          id="askstudent"
          style={{ paddingRight: "15px", display: "block" }}
          size="lg"
          show={this.props.show}
          onHide={this.props.close}
          centered
        >
          <div className="modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  onClick={this.props.onClose}
                  data-dismiss="modal"
                >
                  <span className="custom-icon cancel-new-icon-01"></span>
                </button>
                <div className="heading-title-div">
                  <div className="link-div">
                    <button
                      onClick={this.handleSelectAllStudent}
                      className="link"
                    >
                      {/* Select All */}
                      {this.state.multileSelectedStudent.length ===
                      this.props.studentDetails?.length
                        ? "None"
                        : "Select All"}
                    </button>
                  </div>
                  <h2 className="modal-title" style={{ color: "#ffffff" }}>
                    My Students
                  </h2>
                </div>
              </div>

              <div className="modal-body">
                <div
                  className="insight_myStudent_moodListWrapper"
                  id="insight_myStudent_moodListWrapperask"
                >
                  <InfiniteScroll
                    style={{ overflow: "hidden" }}
                    dataLength={this.props.studentDetails.length}
                    next={this.handleScrollForAskStudentList}
                    hasMore={true}
                    scrollableTarget={"insight_myStudent_moodListWrapperask"}
                  >
                    <div className="students-box-list">
                      {this.props.studentDetails?.length > 0 ? (
                        <div className="row mlr-5">
                          {this.props.studentDetails.map((data, index) => {
                            return (
                              <div
                                onClick={(e) =>
                                  this.handleSelectStudent(e, data, index)
                                }
                                className="col-lg-6 col-md-6 plr-5"
                                key={`ask_how_${index}`}
                              >
                                {this.renderStudentItem(data, index)}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="insight_myStudent_moodListWrapper noLogs">
                          <div className="noLogs_wrapper">
                            <img src={empty_state} alt="empty" />
                            <h6>You have no students in your class.</h6>
                          </div>
                        </div>
                      )}
                    </div>
                  </InfiniteScroll>
                </div>
              </div>
              <div className="modal-footer">
                <Link
                  // to={"javascript:void()"}
                  onClick={this.handleAskStudent}
                  className="askstudent_btn"
                >
                  {" "}
                  <span className="text-span">
                    {this.state.multileSelectedStudent.length === 0
                      ? "Ask Students"
                      : this.state.multileSelectedStudent.length === 1
                      ? `Ask ${this.state.multileSelectedStudent.length} Student`
                      : `Ask ${this.state.multileSelectedStudent.length} Students`}
                  </span>{" "}
                </Link>
              </div>
            </div>
          </div>
        </Modal>
        {/* </div> */}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    doAskHowAreYou: (data) => dispatch(actions.doAskHowAreYou(data)),
  };
};

export default connect(null, mapDispatchToProps)(AskMyStudent);
