import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import Spinner from "../../../Spinner/Spinner";
import "../../Student.scss";
import "../../../../styles/custom.css";

class StudentJournal extends React.Component {
  componentDidMount() {
    localStorage.setItem("const_url","")
    // localStorage.setItem('noRedirect', true)
    this.props.viewJournal();
    // this.props.viewResponseJournal(localStorage.getItem('journalid'));
  }

  handleSteps = (step) => {
    this.props.setStudentMoodDetailCount(step);
  };
  handleresponseshow=  (data) =>{
    // if(data.unread_count > 0) {
      // await
       this.props.ReadResponse(data.id);
      this.handleSteps(7);
      localStorage.setItem("journalid",data.id);
    // } else {
    //   this.handleSteps(7);
    //   localStorage.setItem("journalid",data.id);
    // }
    
  }
  render() {
    const { student } = this.props;
    return (
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
                        onClick={() => this.handleSteps(3)}
                      >
                        <span className="custom-icon backward-icon2"></span>
                      </Link>
                    </div>
                  </div>
                  <div className="app-center-right-div">
                    <div className="text-main-group">
                      <h1>Your Journal</h1>
                    </div>
                  </div>
                  <div className="app-top-right-div"></div>
                </div>
              </div>

              <div className="app-middle-area-div pt-100">
                <div className="app-middle-area-root app-student-journal-area-root min-height-m100">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-lg-12 col-md-12 p0">
                        <div className="student-journal-middle-area">
                          <div className="center-detail-main-root">
                            <div className="student-center-logs-details">
                              {student.studentJournalData &&
                              student.studentJournalData.result &&
                              student.studentJournalData.result.length > 0 ? (
                                student.studentJournalData.result.map(
                                  (res, index) => (
                                    <div className="logs-row" key={index}>
                                      <div className="log-title-heading-box">
                                        <h4 style={{color:'#ffffff'}}>
                                          {parseInt(
                                            moment
                                              .duration(
                                                moment().diff(
                                                  moment(
                                                    moment(res.date).format(
                                                      "YYYY-MM-DD"
                                                    ),
                                                    "YYYY-MM-DD"
                                                  ).startOf("day")
                                                )
                                              )
                                              .asDays()
                                          ) === 0
                                            ? "TODAY"
                                            : parseInt(
                                                moment
                                                  .duration(
                                                    moment().diff(
                                                      moment(
                                                        moment(res.date).format(
                                                          "YYYY-MM-DD"
                                                        ),
                                                        "YYYY-MM-DD"
                                                      ).startOf("day")
                                                    )
                                                  )
                                                  .asDays()
                                              ) === 1
                                            ? "YESTERDAY"
                                            : moment(res.date).isSame(
                                                new Date(),
                                                "year"
                                              )
                                            ? moment(res.date)
                                                .format("dddd, DD MMMM")
                                                .toUpperCase()
                                            : moment(res.date)
                                                .format("dddd, DD MMMM YYYY")
                                                .toUpperCase()}
                                        </h4>
                                      </div>
                                      {res.journal.map((data) => (
                                        <div
                                          className={data.unread_count>0?`log-journal-box ${data.mood?.parent?.slug || data.mood.slug}-journal-box respose`:`log-journal-box ${data.mood?.parent?.slug || data.mood.slug}-journal-box`}
                                          key={data.id}
                                        >
                                          <div className="log-top-box">
                                            <div className="log-icon-box studentjournal">
                                              {data.unread_count>0 && 
                                               <span className="yh-responsecount">{data.unread_count}</span>
                                              }
                                             
                                              <span
                                                className={`mood-icon mood-${data.mood?.parent?.slug ||data.mood.slug}-icon`}
                                              ></span>
                                            </div>
                                            
                                            <div className="log-text-box-top">
                                              <div className="log-left-text-box-top">
                                                <h3 className="title-text">
                                                  <span className="title-name bold-span">
                                                    Feeling&nbsp;
                                                    {data.mood.name}
                                                  </span >
                                                  {data.unread_count !==0?
                                                  <Link to="#"  onClick={() =>this.handleresponseshow(data) }>
                                                  <span>
                                                  <svg width="13px" height="18px" viewBox="0 0 13 18" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                            <title>Response</title>
                                                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                <g id="1.10a-Student-Journal" transform="translate(-702.000000, -643.000000)" fill="#A895A0">
                                                                    <path d="M715.020513,645.745455 C715.020513,643.93302 712.97309,642.907508 711.556199,644.01025 L703.556199,650.236513 C702.431694,651.111695 702.431694,652.831739 703.556199,653.706922 L711.556199,659.933184 C712.97309,661.035927 715.020513,660.010414 715.020513,658.19798 L715.020513,645.745455 L715.020513,645.745455 Z" id="Back" transform="translate(708.866667, 651.971717) scale(-1, 1) translate(-708.866667, -651.971717) "></path>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                  </span>
                                                  
                                                  </Link>:
                                                  ""
                                                  
                                                  }
                                                </h3>
                                                <p>{data.text}</p>
                                                <div className="logDate_studEnt">
                                                          <h5>
                                                          {moment(new Date(data.date_created_web_utc), "hh:mm A").format("h:mma")}
                                                              {/* {moment(
                                                               data.date_created,"hh mm A"
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
                                                                    {res.name}
                                                                  </span>
                                                                </li>
                                                              );
                                                            }
                                                          )
                                                        : ""}
                                                    </ul>
                                                  </div>
                                            
                                              </div>
                                              
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )
                                )
                              ) : (
                                <div className="logs-row">
                                  <div className="student-log-title-heading-box d-flex align-item-center justify-content-center m-4">
                                    <h4>NO DATA AVAILABLE</h4>
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
          </section>
        </div>
      </div>
    );
  }
}

export default StudentJournal;
