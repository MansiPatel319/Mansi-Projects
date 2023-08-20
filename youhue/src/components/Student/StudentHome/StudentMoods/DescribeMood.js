import React,{ useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import LogoApp from "../../../../assets/images/Student/logo-app.svg";
import Spinner from "../../../Spinner/Spinner";
import HappyCharacter from "../../../../assets/images/Student/character/character-happy.svg";
// import HappyCharacter from "../../../../assets/images/Student/character/Happy.png";
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

class DescribeMood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        describe_mood:
          props.student.isEditEnable && props.student.moodDescriptionData
            ? props.student.moodDescriptionData.text
            : "",
        tags:
          props.student.isEditEnable && props.student.moodDescriptionData
            ? props.student.moodDescriptionData.tags
            : "",
        
      },
      tagsList:[
        {id:0,text:'Family',active:false, value:'family'},
        {id:1,text:'Friends',active:false, value:'friends'},
        {id:2,text:'Health',active:false, value:'health'},
        {id:3,text:'School',active:false, value:'school'},
        {id:4,text:'Other',active:false, value:'other'},
      ],
      tags_lst: [],
      formError: {
        describe_mood_error: false,
        describe_mood_message: "",
      
      },
    };
    this.textInput=React.createRef()
  }
   AlwaysScrollToBottom = () => {
    
    var ref=this.elementRef.current.scrollIntoView();
    return <div className="test "  ref={ref} />;
  };
  componentDidMount() {
    localStorage.setItem("const_url","")
    // localStorage.setItem('noRedirect', true)
    this.scrollToBottom();
  }

  handleSteps = (step) => {
    this.props.setStudentMoodDetailCount(step);
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

  validateForm = (data) => {
    let isFormValid = true;
    const formError = { ...this.state.formError };
    if (data.describe_mood.trim() === "" || data.describe_mood === undefined) {
      formError.describe_mood_error = true;
      formError.describe_mood_message = "Please Describe Your Mood";
      isFormValid = false;
    } else {
      formError.describe_mood_error = false;
      formError.describe_mood_message = "";
    }
    this.setState({ formError });
    return isFormValid;
  };

  handleChangedField = (name, value) => {
    const formError = { ...this.state.formError };
    if (name === "describe_mood") {
      formError[`${name}_error`] = true;
      if (value.trim() === "" || value === undefined) {
        formError[`${name}_message`] = "Please Describe Your Mood";
      } else {
        formError[`${name}_error`] = false;
        formError[`${name}_message`] = "";
      }
    }
    this.setState({ formError });
  };

  handleFieldChange = (event) => {
    const { name, value } = event.target;
    const formData = { ...this.state.formData };
    formData[name] = value;
    this.setState({ formData }, () => {
      this.handleChangedField(name, value);
      this.setState({ forwardButtonEnable: true });
    });
  };

  submitForm = () => {
    
    const { formData } = this.state;
    const { student } = this.props;
    this.scrollToBottom();
    var isValid = true;
    if(this.props.loading === false){
      if (isValid) {
        // const moodData =this.state.tagsList.filter((item)=> {
        //   if (item.active) {
        //     console.log(`item.active`, item.active)
        //     return item.title        
        //   }
        
        // })
        const moodData =this.state.tagsList.filter((item)=> item.active)
        // const moodData = this.state.tagsList.filter((item)=>
        // item.active===true && item.title )
        const moodDataNew =[]
         moodData.map((item)=>{
          moodDataNew.push(item.text)
        })
        const data = {
          mood:
            student.botResponseData && student.botResponseData.mood
              ? student.botResponseData.mood.id
              : "",
          text: formData["describe_mood"],
          tags: moodDataNew.join(),
        };
        if (student.isEditEnable) {
          const moodDescriptionId = student.moodDescriptionData.id;
          this.props
            .editEmotion(moodDescriptionId, data)
            .then((res) => {
              if (res.status) {
                // this.props.addToast(res.message, { appearance: 'success', autoDismiss: true });
                this.handleSteps(5);
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
        } else {
          this.props
            .addEmotion(data)
            .then((res) => {
              if (res.status) {
                // this.props.addToast(res.message, { appearance: 'success', autoDismiss: true });
                this.handleSteps(5);
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
        }
      }
    }
    
  };

  handleTagsClick = (id) => {
    const tempTags = [...this.state.tagsList];
    tempTags.forEach((item) => {
      item.active = item.id===id ? !item.active : item.active;
    });
   this.setState({
    tagsList:tempTags
   })

  };
  scrollToBottom = () => {
    this.textInput.current.scrollIntoView({ behavior: 'smooth' })
  }

  render() {
    const { student } = this.props;
    const { formData, formError } = this.state;
    return (
      <div id="wrapper" className="wrapper">
         {this.props.loading ? <Spinner /> : null}
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
                            <div className="chat-message-root" ref={this.textInput}>
                              <div className="chat-box chat-right-box">
                                <div className="chat-box-inner">
                                  <span>
                                    {/* Change moodId to moodName when available in API */}
                                    I'm feeling&nbsp;
                                    <span
                                      className={`${
                                        student.botResponseData &&
                                        student.botResponseData.mood
                                          ? student.botResponseData.mood.parent
                                            ? student.botResponseData.mood
                                                .parent.slug
                                            : student.botResponseData.mood.slug
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
                                          ? student.botResponseData.mood.parent
                                            ? student.botResponseData.mood
                                                .parent.slug
                                            : student.botResponseData.mood.slug
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
                                  {console.log("this.textInput",this.textInput)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bottom-area-div send-message-bottom-area-div">
                    <div className="yh_tags_row">
                      <ul>
                        {this.state.tagsList.map((tag)=>(
                          <li
                          className={`${
                            tag.active
                              ? "active"
                              : ""
                          }`}
                        >
                          <Link                            
                            value={tag.value}
                            onClick={(e) => this.handleTagsClick(tag.id)}
                            to="#"
                          >
                            {tag.text}
                          </Link>
                        </li>
                        ))}
                        {/* <li
                          className={`${
                            this.state.tags_lst.includes("Family")
                              ? "active"
                              : ""
                          }`}
                        >
                          <Link
                            to="#"
                            value="'family'"
                            onClick={(e) => this.handleTagsClick(e)}
                          >
                            Family
                          </Link>
                        </li>
                        <li
                          className={`${
                            this.state.tags_lst.includes("Friends")
                              ? "active"
                              : ""
                          }`}
                        >
                          <Link
                            to="#"
                            value="friends"
                            onClick={(e) => this.handleTagsClick(e)}
                          >
                            Friends
                          </Link>
                        </li>
                        <li
                          className={`${
                            this.state.tags_lst.includes("Health")
                              ? "active"
                              : ""
                          }`}
                        >
                          <Link
                            to="#"
                            value="health"
                            onClick={(e) => this.handleTagsClick(e)}
                          >
                            Health
                          </Link>
                        </li>
                        <li
                          className={`${
                            this.state.tags_lst.includes("School")
                              ? "active"
                              : ""
                          }`}
                        >
                          <Link
                            to="#"
                            value="school"
                            onClick={(e) => this.handleTagsClick(e)}
                          >
                            School
                          </Link>
                        </li>
                        <li
                          className={`${
                            this.state.tags_lst.includes("Other")
                              ? "active"
                              : ""
                          }`}
                        >
                          <Link
                            to="#"
                            value="other"
                            onClick={(e) => this.handleTagsClick(e)}
                          >
                            Other
                          </Link>
                        </li>
                      
                       */}
                      </ul>
                    </div>
                    <div className="message-area-row">
                      <div className="message-input-box">
                        <div className="form-group">
                          <textarea
                            className="form-control"
                            name="describe_mood"
                            id="describe_mood"
                            cols="30"
                            rows="5"
                            value={
                              formData.describe_mood
                                ? formData.describe_mood
                                : ""
                            }
                            onChange={this.handleFieldChange}
                          />
                        </div>
                        <div className="error-div">
                          <p>Your message may not be seen right away.</p>
                        </div>
                        {/* {formError.describe_mood_error ? (
                          <div className="error-div">
                            <p>Please Describe Your Mood</p>
                          </div>
                        ) : null} */}
                      </div>
                    </div>
                    {/* <div className="bottom-area-row">
                      <div className="left-text-div">
                        <p>Your message may not be seen right away.</p>
                      </div>
                    </div> */}
                    <div className="yh_educatorBtn_wrapper">
                      <Link
                        to="#"
                        onClick={this.submitForm}
                        className="educator_btn"
                      >
                        Share with Educator
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DescribeMood;
