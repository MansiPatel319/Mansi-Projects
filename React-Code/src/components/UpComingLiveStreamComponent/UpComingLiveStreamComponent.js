/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import moment from 'moment';
import userProfileImg from "../../assets/images/profile.png";
import { get } from "../../network/requests";
import { getUrl } from "../../network/url";
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";

import { tokenExpire } from "../../services/auth";
toast.configure();
const UpComingLiveStreamComponent = ({ header, searchKeyword, handleLoader, searchInput, viewall}) => {
  const [upcomingStreamData, setstreamData] = useState([]);

  const [flag, setflag] = useState(0);
  const history = useHistory();
  const options = {
    loop:false,
    nav: false,
    dots: false,
    stagePadding: 0,
    margin: 30,
    autoplay: false,
    smartSpeed: 2000,
    responsive: {
      0: {
        items: 1.2,
        autoplay: true,
        dots: true,
        margin: 15,
      },
      600: {
        items: 2,
      },
      1200: {
        items: 3,
      },
      1600: {
        items: 3,
      },

    },
  }
  const getStreamData = () => {
    handleLoader(true);
    const url = getUrl("getUpcomingStreamList");
    const input = searchInput === undefined ? "" : searchInput
    const searchKey = searchKeyword === undefined ? "" : searchKeyword

    return get(`${url}search=${input}&stream_keyword=${searchKey}`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;

        handleLoader(false);
        switch (code) {
          case 200:
            if (status === true) {
              setflag(flag + 1);
              setstreamData(data);
            }
            break;
          case 400:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
            break;
          default:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
        }
      })
      .catch((error) => {
        handleLoader(false);
        tokenExpire(error.response, history);
      });
  }
  
  // const isPlanPurchesesOrNot = (e) => {
  //   e.preventDefault();
  //   const url = getUrl('user-plan');
  //   if (isAuthenticated()) {
  //     get(url, true)
  //       .then((response) => {
  //         const {
  //           data: { code, message },
  //         } = response;
  //         switch (code) {
  //           case 200:
  //             localStorage.removeItem('location');
  //             history.push(`/user-live-stream`);
  //             // handleDownload(fileUrl);
  //             // redirectToCreatorClasses();
  //             break;
  //           case 400:
  //             // localStorage.setItem('location', window.location.pathname);
  //             // history.push('/flexible-plans');
  //             isHandleOpenModal();
  //             break;
  //           default:
  //             toast.error(message, {
  //               pauseOnHover: false,
  //               position: toast.POSITION.TOP_RIGHT,
  //             });
  //         }
  //       })
  //       .catch((error) => {
  //         history.push('/user/login');
  //         tokenExpire(error.response, history);
  //       });
  //   }
  //   if (!isAuthenticated()) {
  //     localStorage.setItem('location', window.location.pathname);
  //     history.push('/user/login');
  //   }
  // };
  useEffect(() => {
    getStreamData();
  }, [searchInput, searchKeyword]);
  return (
    <React.Fragment>
      <div className="container container-1200">
        {upcomingStreamData && upcomingStreamData.length > 0 ? (
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="upcoming-live-str-div-new">
                <div className="common-heading-div">
                  <div className="common-heading-inner-div">
                    <div className="common-heading-title-row">
                      <div className="common-heading-title-left">
                        <h2>{header}</h2>
                      </div>
                      <div className="common-heading-title-right">
                      {viewall && (
                        <Link to="/user-live-stream"  className="btn btn-primary-outline btn-primary-outline-n45">
                          <span className="text">View all</span>
                        </Link>
                      )}
                      
                      </div>
                
                    </div>
                  </div>
                </div>

                <div className="upc-streams-slider-new-main-div">
                  <div className="upc-streams-slider-new-root">
                    {(
                      <OwlCarousel
                        className="owl-carousel owl-theme our-pop-classes-owl"
                        id="upcoming-owl-theme-new"
                        loop={false}
                        autoplay={false}
                        autoplayTimeout={5000}
                        autoplayHoverPause={true}
                        {...options}
                      >
                        {upcomingStreamData.map((data) => {
                          return (
                            <div className="item" key={data.id}>
                              <div className="our-video-common-slider-box">
                                <div className="our-video-img-thumb w-100">
                                  <div className="img-thumb w-100"> <img src={data.thumb_image_stream} className="img-fluid img-responsive" alt="image" /> </div>
                                </div>
                                <div className="our-content-div">
                                  <div className="label-div" style={{ minHeight: '106px' }} >
                                    <ul>
                                      {data.stream_keywords.map(
                                        (skillData, i) => {
                                          return (
                                            <li key={i}>
                                              <Link to="#" className="link link-black">
                                                {skillData}
                                              </Link>
                                            </li>
                                          );
                                        },
                                      )}
                                    </ul>
                                  </div>

                                  <div className="our-content-row">
                                    <div className="our-content-full">
                                      <h4> <Link to={`/user-creator-class-detail/${data.id}`} className="link">
                                        {data.title}
                                      </Link>
                                      </h4>
                                    </div>

                                    <div className="our-content-row-ls">
                                      <div className="our-content-row-ls-left">
                                        <div className="our-content-left">
                                          <div className="thumb-img">
                                            <Link to={`/user-creator-class-detail/${data.id}`} className="link">
                                              <img src={data.creator.thumb_image_creator_small === undefined || data.creator.thumb_image_creator_small === null || data.creator.thumb_image_creator_small === "https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg" ? userProfileImg : data.creator.thumb_image_creator_small} className="img-fluid user" alt="user" />
                                            </Link>
                                          </div>
                                        </div>
                                        <div className="our-content-right">
                                          <h3><Link to={`/user-creator-class-detail/${data.id}`} className="link">
                                            {` ${(data.creator.full_name === "" || data.creator.full_name === null) ? data.creator.username : data.creator.full_name}`}
                                          </Link></h3>
                                        </div>
                                      </div>

                                      <div className="our-content-row-ls-right">
                                        <div className="time-row">
                                          <div className="time-box">
                                            <span className="icon-span"><i className="bg-custom-icon calendar-time-icon-new"></i></span>
                                            <span className="text">
                                        {moment(data.stream_datetime.substr(0,data.stream_datetime.length-1)).format('MMM DD hh:mm A')}
                                        {` ${data.tz_value !== null ? data.tz_value : ''}`}
                                      </span>
                                         
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="our-content-bottom-row">
                                    <div className="btn-div-group">
                                      <Link to={`/user-creator-class-detail/${data.id}`} className="btn btn-primary-outline-icon-text">
                                        <span className="icon-span"><i className="bg-custom-icon invoice-icon-new"></i></span>
                                        <span className="text">Book Now</span>
                                      </Link>
                                    </div>
                                  </div>

                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </OwlCarousel>
                    )}

                  </div>
                </div>

              </div>
            </div>
          </div>
        ) : (
          // <img src={noDataImg} className="img-fluid img-responsive" width={355} />
          <p style={{ color: 'white', fontSize: '18px', margin: '10px' }}>No data available </p>
        )}
      </div>


    </React.Fragment>




  );
};

export default UpComingLiveStreamComponent;

UpComingLiveStreamComponent.propTypes = {
  header: PropTypes.string,
  searchKeyword: PropTypes.string,
  handleLoader: PropTypes.func,
  searchInput: PropTypes.string,
  isHandleOpenModal: PropTypes.func
};
