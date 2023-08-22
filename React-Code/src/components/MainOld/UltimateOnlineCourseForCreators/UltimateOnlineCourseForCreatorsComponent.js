import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../../assets/css/style.css";
import "../../../assets/css/owl-slider-style.css";
import { ultimateData } from '../../../staticData/landingPageData';

function UltimateOnlineCourseForCreatorsComponent() {
  const [isModal, setModal] = useState(false);
  const handleModal = () => {
    setModal(true);
  };
  const handleModalClose = () => { setModal(!isModal); }

  return (
    <React.Fragment>
      <section
        className="the-ultimate-online-section"
        id="the-ultimate-online-section"
      >
        <div className="the-ultimate-online-div">
          <div className="heading-div">
            <div className="container container-1000">
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <div className="heading-inner-div">
                    <h2>The Ultimate Online Course for Creators</h2>
                    <p>Play to watch a video</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ultimate-video-listing-root">
            <div className="container container-1000">
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <div className="video-box-play">
                    <div className="video-button-div">
                      <Link
                        to="#"
                        className="video-button-link"
                        onClick={handleModal}
                      >
                        <i className="fa fa-play"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ultimate-video-list-row">
                <div className="row mlr-8">
                  {ultimateData.length > 0 && ultimateData.map((data, i) => {
                    return (
                      <div className="col-lg-4 col-md-4 plr-8" key={i}>
                        <div className={`ultimate-video-box ${i === 0 ? "active" : ""}`} key={i}>
                          <div className="ultimate-video-thumb">
                            <div className="img-thumb">
                              <img
                                src={data.ultimateOnlineImg}
                                className="img-fluid img-responsive"
                                alt="ultimateUser"
                              />
                            </div>
                            <div className="video-button-div">
                              <Link to="/" className="video-link">
                                <i className="fa fa-play"></i>
                              </Link>
                            </div>
                          </div>
                          <div className="our-content-div">
                            <span className="black-text-label">
                              <span className="text">{data.time}</span>
                            </span>
                            <h3>
                              <Link to="/" className="link">
                                The Ultimate Online Course for Creators
                          </Link>
                            </h3>
                          </div>
                        </div>
                      </div>
                    )
                  })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {isModal ? (
        <div className="modal video-player-modal fade show" id="ultimate-video-modal" style={{ display: "block", paddingRight: '16px' }}>
          <div className="modal-dialog modal-dialog-centered modal-large">
            <div className="modal-content">
              <button type="button" className="close" data-dismiss="modal" onClick={handleModalClose}>
                <i className="fe fe-x"></i>
              </button>
              <div className="modal-body">
                <div className="video-event-div">
                  <div className="video-event-inner">
                    <iframe
                      className="iframe-video-cover"
                      src="https://player.vimeo.com/video/435440338?app_id=122963&amp;autoplay=0"
                      width="426"
                      height="240"
                      frameBorder="0"
                      allow="autoplay; fullscreen"
                      allowFullScreen=""
                      title="CREATOR CLASSES"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : ""}
    </React.Fragment>
  );
}

export default UltimateOnlineCourseForCreatorsComponent;
