import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import Spinner from "../../../Spinner/Spinner";
import "../../Student.scss";
import "../../../../styles/custom.css";
import miniLogo from "../../../../assets/images/mini_logo_new.svg";

class StudentJournalResponseContainer extends React.Component {
  componentDidMount() {
    localStorage.setItem("const_url","")
    // localStorage.setItem('noRedirect', true)
    this.props.viewResponseJournal(localStorage.getItem('journalid'));
  }

  handleSteps = (step) => {
    this.props.setStudentMoodDetailCount(step);
  };

  render() {

    const { student } = this.props;
    return (
      <>
      {student?.studentJournalResponseData &&
        <div id="wrapper" className="wrapper">
        {this.props.authenticate.loading ? <Spinner /> : null}
        <div className="main-middle-area">
          <section className="app-main-area-section">
            <div className="app-main-area-div">
              <div className="app-top-bar-div app-top-white-bar-div">
                <div className="app-top-row">
                  <div className="app-top-left-div">
                    <div className="icon-group backward-icon-group">
                      <Link
                        to="#"
                        className="link-icon backward-link"
                        onClick={() => this.handleSteps(6)}
                      >
                        <span className="custom-icon backward-icon2"></span>
                      </Link>
                    </div>
                  </div>
                  <div className="app-center-right-div">
                    <div className="text-main-group">
                      <h1>Responses</h1>
                    </div>
                  </div>
                  <div className="app-top-right-div"></div>
                </div>
              </div>

              <div className="mid-wrapper-mood">
                <div className="moodJournal_header">
                  <h3>What did your educators say?</h3>
                </div>
                <div className="moodJournal_wrapper">
                  <ul>
                    <li>
                      <div className="moodJournal_block">
                        <div className="moodJournal_thumb">
                        <span
                            className={`mood-icon mood-${
                              student?.studentJournalResponseData?.mood?.parent
                                ? student?.studentJournalResponseData?.mood?.parent?.slug
                                : student?.studentJournalResponseData?.mood?.slug
                            }-icon`}
                          ></span>
                        </div>
                        <div className={student?.studentJournalResponseData.unread_count>0?`log-journalresponse-box ${student?.studentJournalResponseData.mood?.parent?.slug || student?.studentJournalResponseData.mood.slug}-journalresponse-box respose`:`log-journalresponse-box ${student?.studentJournalResponseData.mood?.parent?.slug || student?.studentJournalResponseData.mood.slug}-journalresponse-box`}
                                          key={student?.studentJournalResponseData.id}
                                        >
                        <div className={`moodJournal_content `}>
                          {/* <h3 className="feeling-color"><span>
                              {student?.studentJournalResponseData?.owner ? student?.studentJournalResponseData?.owner.full_name : ""}
                            </span>{" "}
                            was {student?.studentJournalResponseData?.mood? student?.studentJournalResponseData?.mood?.name : ""} */}
                            {/* {this.state.status_id?.is_flag?.name ? (
                              <>
                                {" about "}
                                <span>{this.state.status_id.is_flag.name}</span>
                              </>
                            ) : (
                              ""
                            )} */}
                            {/* {this.state.status_id?.is_topics?.name ? (
                              <>
                                {" about "}
                                <span>
                                  {this.state.status_id.is_topics.name}
                                </span>
                              </>
                            ) : (
                              ""
                            )} */}
                            {/* </h3> */}
                            <h3 className="feeling-color">
                                                  <span className="title-name bold-span" style={{fontWeight:"500"}}>
                                                    Feeling&nbsp;
                                                    {student?.studentJournalResponseData.mood.name}
                                                  </span >
                                                 
                             </h3>                    
                          <p>{student?.studentJournalResponseData?.text}</p>
                          <h5>  {moment(
                                 student?.studentJournalResponseData.date
                                 ).format("D MMM")}{" "}
                           
                            <span>
                            {moment(new Date(student?.studentJournalResponseData.date_created_web_utc), "hh:mm A").format("h:mma")}
                              {/* {moment(student?.studentJournalResponseData.time, "hh:mm A").format("h:mma")} */}
                            </span></h5>
                        </div>
                     </div>
                      </div>

                    </li>
                    {student?.studentJournalResponseData?.responses?.length !== 0
                        ? student.studentJournalResponseData.responses?.map((res, i) => {
                   
                   
                            return (
                              <li>
                      <div className="moodJournal_block">
                        <div className="moodJournal_thumb">
                          <span>  <img src={miniLogo} alt="logo" /></span>
                        </div>
                        <div    className={
                                  student?.studentJournalResponseData?.responses?.length - 1 === i
                                    ? "moodJournal_content"
                                    : "moodJournal_content educator-response-reply"
                                } >

                                  <h3>
                                    {res.educator.professor_name}{" "}
                                   <span> said:</span>
                                  </h3>
                                  <p>
                                 {res.text}</p>
                                  <h5>
                                  {moment(
                                 res.date
                                 ).format("D MMM")}{" "}
                                    <span>
                                    {moment(new Date(res.date_created_web_utc), "hh:mm A").format("h:mma")}
                                      {/* {moment(res.time, "hh mm A").format(
                                        "h:mma"
                                      )} */}
                                    </span>
                                  </h5>
                         
                                </div>
                              </div>
                              </li>
                            );
                          
                       
                        
                
                    })
                     : ""}
                  </ul>
                </div>
              </div>
           
            </div>
          </section>
        </div>
      </div>
  
      }
      </>
      );
  }
}

export default StudentJournalResponseContainer;
