import React from "react";
import { Link } from "react-router-dom";
import LogoApp from "../../../../assets/images/Student/logo-app.svg";

import HappyCharacter from "../../../../assets/images/Student/character/character-happy.svg";
import ExcitedCharacter from "../../../../assets/images/Student/character/character-excited.svg";
import LovedCharacter from "../../../../assets/images/Student/character/character-loved.svg";
import CalmCharacter from "../../../../assets/images/Student/character/character-calm.svg";
import OKCharacter from "../../../../assets/images/Student/character/character-ok.svg";
import OkayCharacter from "../../../../assets/images/Student/character/character-okay.svg";
import ConfusedCharacter from "../../../../assets/images/Student/character/character-confused.svg";
import AnxiousCharacter from "../../../../assets/images/Student/character/character-anxious.svg";
import SadCharacter from "../../../../assets/images/Student/character/character-sad.svg";
import AngryCharacter from "../../../../assets/images/Student/character/character-angry.svg";

import "../../Student.scss";

class MoodDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noMoreEdit: false,
    };
  }

  componentDidMount() {
    localStorage.setItem("const_url","")
    // localStorage.setItem('noRedirect', true)
    this.latestEmotion();
  }

  handleSteps = (step) => {
    this.props.setStudentMoodDetailCount(step);
  };

  handleNoEdit = () => {
    this.setState({ noMoreEdit: true });
    this.props.setEditEnable(false);
  };

  latestEmotion = () => {
    this.props.latestEmotion();
  };

  getCharacter = (mood_name) => {
    if (mood_name === "Happy") {
      return HappyCharacter;
    } else if (mood_name === "Excited") {
      return ExcitedCharacter;
    } else if (mood_name === "Loved") {
      return LovedCharacter;
    } else if (mood_name === "Calm") {
      return CalmCharacter;
    } else if (mood_name === "OK") {
      return OKCharacter;
    } else if (mood_name === "Okay") {
      return OkayCharacter;
    } else if (mood_name === "Confused") {
      return ConfusedCharacter;
    } else if (mood_name === "Anxious") {
      return AnxiousCharacter;
    } else if (mood_name === "Sad") {
      return SadCharacter;
    } else if (mood_name === "Angry") {
      return AngryCharacter;
    }
  };

  render() {
    const { student } = this.props;
    return (
      <div id="wrapper" className="wrapper custom_background">
        <div className="main-middle-area">
          <div className="app-main-area-section">
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
                    <div className="icon-group history-icon-group">
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
              </div>

              <div className="app-middle-area-div pt-100">
                <div className="app-middle-area-root app-log-mood-area-root min-height-m100">
                  <div className="container container-md">
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <div className="chat-middle-area log-mood-middle-area min-height-m285">
                          <div className="chat-div chat-log-mood-div">
                            <div className="chat-message-root">
                              {student.moodDescriptionData &&
                              student.moodDescriptionData.text ? (
                                <div>
                                  <div className="chat-box chat-right-box">
                                    <div className="chat-box-inner">
                                      <span>
                                        {/* Change moodId to moodName when available in API */}
                                        I'm feeling&nbsp;
                                        <span
                                          className={`${
                                            student.botResponseData &&
                                            student.botResponseData.mood
                                              ? student.botResponseData.mood
                                                  .parent
                                                ? student.botResponseData.mood
                                                    .parent.slug
                                                : student.botResponseData.mood
                                                    .slug
                                              : ""
                                          }-box`}
                                        >
                                          {student.botResponseData &&
                                          student.botResponseData.mood
                                            ? student.botResponseData.mood.name
                                            : ""}
                                        </span>
                                        .
                                      </span>
                                      <div className="thumb-img back-thumb-div">
                                        <div className="img-thumb">
                                          {/* <img src={`${student.botResponseData  && student.botResponseData.mood 
                                                                        ? student.botResponseData.mood.name : ''}Character`} className="img-fluid img-char" alt="confused" /> */}
                                          <img
                                            src={this.getCharacter(
                                              student.botResponseData &&
                                                student.botResponseData.mood
                                                ? student.botResponseData.mood
                                                    .parent
                                                  ? student.botResponseData.mood
                                                      .parent.name
                                                  : student.botResponseData.mood
                                                      .name
                                                : ""
                                            )}
                                            className="img-fluid img-char"
                                            alt="confused"
                                          />
                                        </div>
                                        <Link
                                          to="#"
                                          className="back-home"
                                          onClick={() => this.handleSteps(3)}
                                        >
                                          <span className="custom-icon undo-icon"></span>
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="chat-box chat-left-box">
                                    <div className="chat-box-inner">
                                      <span>
                                        Why do you think you're feeling&nbsp;
                                        <span
                                          className={`${
                                            student.botResponseData &&
                                            student.botResponseData.mood
                                              ? student.botResponseData.mood
                                                  .parent
                                                ? student.botResponseData.mood
                                                    .parent.slug
                                                : student.botResponseData.mood
                                                    .slug
                                              : ""
                                          }-box`}
                                        >
                                          {student.botResponseData &&
                                          student.botResponseData.mood
                                            ? student.botResponseData.mood.name.toLowerCase()
                                            : ""}
                                        </span>
                                        ?
                                        {/* {student.botResponseData
                                      ? student.botResponseData.text
                                      : ""} */}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="chat-box chat-right-box">
                                    <div className="chat-box-inner">
                                      <span style={{ wordWrap: "break-word" }}>
                                        {student.moodDescriptionData.text}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ) : null}
                              {!student.isEditEnable ? (
                                <>
                                  <div className="chat-box chat-left-box">
                                    <div className="chat-box-inner">
                                      <span>
                                        Thank you for expressing yourself.{" "}
                                      </span>
                                    </div>
                                  </div>

                                  {student.latestMoodData &&
                                  student.latestMoodData.emotion_list &&
                                  student.latestMoodData.emotion_list.length ===
                                    3 ? (
                                    <div className="chat-box chat-left-box">
                                      <div className="chat-box-inner">
                                        <span>
                                          Did you know your last three YouHue
                                          expressions were{" "}
                                          {
                                            student.latestMoodData
                                              .emotion_list[0].mood.name
                                          }
                                          ,{" "}
                                          {
                                            student.latestMoodData
                                              .emotion_list[1].mood.name
                                          }
                                          , and{" "}
                                          {
                                            student.latestMoodData
                                              .emotion_list[2].mood.name
                                          }
                                          ?
                                        </span>
                                      </div>
                                    </div>
                                  ) : null}
                                </>
                              ) : (
                                <div className="chat-box chat-left-box">
                                  <div className="chat-box-inner">
                                    <span>Is there more you want to say?</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {!student.isEditEnable ? (
                    <div className="bottom-area-div view-my-bottom-area-div">
                      <div className="yh_emotion_btnWrapper">
                        <Link
                          to="#"
                          onClick={() => this.handleSteps(6)}
                          className="emotion_btn notify"
                        >
                          Mood Journal
                        </Link>
                        {/* <Link to="#" className="emotion_btn">
                        My Insight
                      </Link> */}
                      </div>
                    </div>
                  ) : (
                    // <div className="bottom-area-div send-message-bottom-area-div">
                    //   <div className="button-area-row">
                    //     <div className="center-box">
                    //       <button
                    //         className="btn btn-outline-general btn-ans-group"
                    //         onClick={() => this.handleSteps(6)}
                    //       >
                    //         View My Journal
                    //       </button>
                    //     </div>
                    //   </div>
                    // </div>
                    <div className="bottom-area-div view-my-bottom-area-div send-message-bottom-area-div">
                      <div className="yh_emotion_btnWrapper">
                        {/* <div className="center-box"> */}
                        <Link
                          to="#"
                          className="emotion_btn"
                          onClick={() => this.handleNoEdit()}
                        >
                          No
                        </Link>
                        <Link
                          to="#"
                          className={`emotion_btn ${
                            student.isEditEnable ? "" : "disabled"
                          }`}
                          onClick={() => this.handleSteps(4)}
                        >
                          Yes
                        </Link>
                        {/* </div> */}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MoodDetail;
