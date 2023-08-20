import React from "react";
import { Link } from "react-router-dom";

import LogoApp from "../../../../assets/images/Student/logo-app.svg";

import "../../Student.scss";

class MoodList extends React.Component {
  state = {
    selectedMode: "",
  };
  emotionRefWrap = React.createRef();
  componentDidMount() {
    localStorage.setItem("const_url","")
    this.props.getMoodList();
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (
      this.emotionRefWrap &&
      !this.emotionRefWrap.current.contains(event.target)
    ) {
      this.setState({ selectedMode: "" });
    }
  };

  handleSteps = (step) => {
    this.props.setStudentMoodDetailCount(step);
  };

  handleMood = (moodId) => {
    this.props.setMoodDescriptionData({});
    this.props
      .getBotResponse(moodId)
      .then((res) => {
        if (res.status) {
          // this.props.addToast(res.message, { appearance: 'success', autoDismiss: true });
          this.handleSteps(4);
        } else {
          // this.props.addToast(res.message, {
          //   appearance: "error",
          //   autoDismiss: true,
          // });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleOpenSubMood = (moodId) => {
    this.setState({ selectedMode: moodId });
  };
  render() {
    const { student } = this.props;
    return (
      <div id="wrapper" className="wrapper">
        <div className="main-middle-area">
          <section className="app-main-area-section">
            <div className="app-main-area-div">
              <div className="app-top-bar-div">
                <div className="app-top-row">
                  <div className="app-top-left-div">
                    <div className="icon-group logout-icon-group">
                      <Link
                        to="#"
                        className="link-icon logout-link"
                        onClick={() => this.handleSteps(1)}
                      >
                        <span className="custom-icon logout-icon"></span>
                      </Link>
                    </div>
                  </div>
                  <div className="app-center-right-div">
                    <div className="logo-group">
                      <Link to="#" className="logo-link">
                        <img
                          src={LogoApp}
                          alt="logo-app"
                          className="img-fluid img-logo"
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="app-top-right-div">
                    <Link
                      to="#"
                      onClick={() => this.handleSteps(3)}
                      className="link-icon history-icon-link"
                    >
                      <span className="custom-icon history-icon"></span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="app-middle-area-div pt-100">
                <div className="app-middle-area-root app-chat-home-area-root min-height-m100">
                  <div className="max_height_chat MoodList_height">
                    <div className="container container-md">
                      <div className="row">
                        <div className="col-lg-12 col-md-12">
                          <div className="chat-middle-area min-height-m200">
                            <div className="chat-div">
                              <div className="chat-message-root">
                                <div className="chat-box chat-left-box">
                                  <div className="chat-box-inner">
                                    <span>
                                      Welcome back,{" "}
                                      {student.studentData &&
                                      student.studentData.data
                                        ? student.studentData.data.username
                                        : ""}
                                      !{" "}
                                    </span>
                                  </div>
                                </div>

                                <div className="chat-box chat-left-box">
                                  <div className="chat-box-inner">
                                    <span>How are you feeling?</span>
                                  </div>
                                </div>
                              </div>

                              <div className="emotion-box-root">
                                <div className="emotion-box-heading">
                                  <h2>
                                    Choose an Emotion{" "}
                                    <Link to="#" className="link link-quest">
                                      {" "}
                                      <span className="custom-icon question-icon"></span>{" "}
                                    </Link>{" "}
                                  </h2>
                                </div>
                                <div className="emotion-box-body">
                                  {student.moodListData
                                    ? student.moodListData.map((res) => (
                                        <div
                                          className={`emotion-box ${res.slug}-box`}
                                          key={res.id}
                                        >
                                          <Link to="#" className="emotion-link">
                                            <div className="img-icon">
                                              <span
                                                onClick={() =>
                                                  this.handleMood(res.id)
                                                }
                                                // onClick={() =>
                                                //   this.handleOpenSubMood(res.id)
                                                // }
                                                className={`mood-icon mood-${res.slug}-icon`}
                                              ></span>
                                            </div>
                                            <div className="text-div">
                                              <h4>
                                                <span
                                                  onClick={() =>
                                                    this.handleMood(res.id)
                                                  }
                                                >
                                                  {res.name}{" "}
                                                </span>
                                                <span
                                                  onClick={() =>
                                                    this.handleOpenSubMood(
                                                      res.id
                                                    )
                                                  }
                                                >
                                                  <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    className="feather feather-edit"
                                                  >
                                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                  </svg>
                                                </span>
                                              </h4>
                                            </div>
                                          </Link>
                                          <div
                                            ref={this.emotionRefWrap}
                                            className={
                                              this.state.selectedMode === res.id
                                                ? "yh_emotion_changer active"
                                                : "yh_emotion_changer"
                                            }
                                          >
                                            <div className="emotion_changer_icon">
                                              <span
                                                className={`mood-icon mood-${res.slug}-icon`}
                                              ></span>
                                            </div>
                                            <ul>
                                              {res.sub_moods.map(
                                                (data, index) => {
                                                  return (
                                                    <li
                                                      onClick={() =>
                                                        this.handleMood(data.id)
                                                      }
                                                      key={`sub_mood_${index}`}
                                                    >
                                                      <Link to="#">
                                                        {data.name}
                                                      </Link>
                                                    </li>
                                                  );
                                                }
                                              )}
                                            </ul>
                                          </div>
                                        </div>
                                      ))
                                    : null}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bottom-area-div view-my-bottom-area-div">
                    <div className="yh_emotion_btnWrapper">
                      <Link
                        to="#"
                        className="emotion_btn notify"
                        onClick={() => this.handleSteps(6)}
                      >
                        Mood Journal
                      </Link>
                      {/* <Link to="#" className="emotion_btn">
                        My Insight
                      </Link> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default MoodList;
