import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import imgIcon1 from "../../../assets/images/icons/creator-icons/img-icon01.png";
import imgIcon2 from "../../../assets/images/icons/creator-icons/img-icon02.png";
import imgIcon3 from "../../../assets/images/icons/creator-icons/img-icon03.png";

function SchedualStreamSectionComponent() {
  const creatorData = useSelector((state) => state.authUser.creatoruser);
  const [isActiveUrl, setisActiveUrl] = useState('');
  const history = useHistory();

  const setRedirection = (e, url) => {
    e.preventDefault();
    const prevUrl = window.location.pathname;
    localStorage.setItem('prev_url', prevUrl);
    history.push(url);
  };
  useEffect(() => {
    let url = localStorage.getItem('next_url');
    if (url !== null) {
      setisActiveUrl(url);
    }
    else {
      let initialUrl = "/creator-schedule-stream"
      setisActiveUrl(initialUrl);
    }

  }, [])
  return (
    <React.Fragment>
      <section className="schedule-main-creator-section" id="schedule-main-creator-section">
        <div className="schedule-main-creator-div">
          <div className="container container-1200">
            <div className="row mlr-10">
              <div className="col-lg-12 col-md-12 plr-10">
                <div className="heading-inner-div">
                  <div className="content-root">
                    <h1>{`Hello ${creatorData.username === undefined ? '' : creatorData.username
                      },`}</h1>
                    <p>What do you want to do today?</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 plr-10">
                <div className="button-tab-div">
                  <div className="row mlr-14">
                    <div className="col-lg-4 col-md-4 plr-14">
                      <div className="button-tab-box">
                        <Link
                          onClick={(e) => setRedirection(e, '/creator-schedule-stream')}
                          className={isActiveUrl === "/creator-schedule-stream" ? "btn btn-big-black active" : "btn btn-big-black"}
                          to="#"
                        >
                          <span className="text">+Schedule a Stream</span>
                          <span className="img-span"> <img src={imgIcon1} className="img-fluid img-icon" alt="img" /> </span>
                        </Link>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-4 plr-14">
                      <div className="button-tab-box">
                        <Link
                          to="#"
                          onClick={(e) => setRedirection(e, '/creator-add-a-class')}
                          className={isActiveUrl === "/creator-add-a-class" ? "btn btn-big-black active" : "btn btn-big-black"}
                        >
                          <span className="text">+Add a Class</span>
                          <span className="img-span"> <img src={imgIcon2} className="img-fluid img-icon" alt="img" /> </span>
                        </Link>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-4 plr-14">
                      <div className="button-tab-box">
                        <Link
                          to="#"
                          onClick={(e) => setRedirection(e, '/creator-add-material')}
                          className={isActiveUrl === "/creator-add-material" ? "btn btn-big-black active" : "btn btn-big-black"}
                        >
                          <span className="text">+ Add Materials</span>
                          <span className="img-span"> <img src={imgIcon3} className="img-fluid img-icon" alt="img" /> </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </React.Fragment>
  );
}

export default SchedualStreamSectionComponent;
