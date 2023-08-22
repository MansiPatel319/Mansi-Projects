/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import convertUTCDateToLocalDate from '../../../hooks/TimeZoneConversion';
import noImgData from '../../../assets/images/no-post-imge.png';
import { post, remove, get } from '../../../network/requests';
import { getUrl } from '../../../network/url';
import { toast } from 'react-toastify';
import { isAuthenticated } from '../../../services/auth';
import { useHistory } from 'react-router-dom';
import { tokenExpire } from '../../../services/auth';
import CreatorsReviewComponent from '../../CreatorsReviewComponent/CreatorsReviewComponent';
toast.configure();
function UserClassDetailsBannerComponent({ creatorId }) {
  const [userClassDetail, setclassDetail] = useState();
  const [paused, setpaused] = useState(true);
  const myInput = useRef(null);
  const history = useHistory();

  const [isActiveTab, setisActiveTab] = useState('Description');
  const tabs = [
    { id: 1, tabName: 'Description' },
    { id: 2, tabName: 'Comments' },
  ];
  const handleTabClick = (e, activeTab) => {
    e.preventDefault();
    setisActiveTab(activeTab);
  };

  const getCreatorData = async () => {
    if (creatorId) {
      const url = getUrl('userCreatorClassDetails');
      return get(`${url}/${creatorId}/`, true)
        .then((response) => {
          const {
            data: { code, data, status, message },
          } = response;
          switch (code) {
            case 200:
              if (status === true) {
                setclassDetail(data);
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
          tokenExpire(error.response, history);
        });
    }
  };

  const handleClick = (e, id, isFav) => {
    e.preventDefault();
    if (isFav) {
      const url = getUrl('removeFavClass');
      return remove(`${url}${id}/`, true)
        .then((response) => {
          const {
            data: { code, status, message },
          } = response;
          switch (code) {
            case 200:
              if (status === true) {
                toast.success(message);
                getCreatorData();
              }
              break;
            case 400:
              toast.error(message);
              break;
            default:
              toast.error(message);
          }
        })
        .catch((error) => {
          tokenExpire(error.response, history);
        });
    }
    const url = getUrl('postFavClass');
    return post(`${url}${id}/`, {}, true)
      .then((response) => {
        const {
          data: { code, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              toast.success(message);
              getCreatorData();
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
        tokenExpire(error.response, history);
      });
  };

  const getUserPlanDetails = () => {
    // vidRef.play();
    play();
    localStorage.removeItem('location');
    // const url = getUrl('user-plan');
    // get(url, true)
    //   .then((response) => {
    //     const {
    //       data: { code, message },
    //     } = response;
    //     switch (code) {
    //       case 200:
    //         play();
    //         localStorage.removeItem('location');
    //         break;
    //       case 400:
    //         play();
    //         break;
    //       default:
    //         toast.error(message, {
    //           pauseOnHover: false,
    //           position: toast.POSITION.TOP_RIGHT,
    //         });
    //     }
    //   })
    //   .catch((error) => {
    //     tokenExpire(error.response, history);
    //   });
  };

  const handleVideoPlay = () => {
    if (paused === true) {
      if (myInput.current !== null) {
        myInput.current.play();
        setpaused(false);
      }
    }
  };

  const handleNotLogin = () => {
    history.push('/user/login');
  };
  const handleVideoPause = () => {
    if (myInput.current !== null) {
      myInput.current.pause();
      setpaused(true);
    }
  };

  useEffect(() => {
    getCreatorData();
  }, [creatorId]);

  const play = () => {
    setpaused(!paused);
    if (paused === true) {
      if (myInput.current !== null) {
        myInput.current.play();
        setpaused(false);
      }
    } else {
      if (myInput.current !== null) {
        myInput.current.pause();
        setpaused(true);
      }
    }
  };
  return (
    <div className="container container-1200">
      {userClassDetail && (
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="single-course-div">
              <div className="single-course-top">
                <div className="single-course-top-row">
                  <div className="heading-top-div">
                    <h2>{userClassDetail.title}</h2>
                  </div>
                  {
                    <div className="video-view-div">
                      <div className="video-view-center-div">
                        <video
                          className="video-full-div"
                          id="live-video-stream-play"
                          controls
                          disablePictureInPicture
                          controlsList="nodownload"
                          muted={false}
                          ref={myInput}
                          onPlay={() => handleVideoPlay()}
                          onPause={handleVideoPause}
                          onContextMenu={(e) => {
                            e.preventDefault();
                            return false;
                          }}
                          poster={userClassDetail.thumbnail_file}
                        >
                          <source src={userClassDetail.transcoded_class_file} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        <div className="btn-video-btn-center">
                          <button
                            className="btn-video-custom"
                            id="video-btn"
                            onClick={() => getUserPlanDetails()}
                          >
                            {' '}
                            <span
                              className={
                                paused
                                  ? 'bg-custom-icon video-play-new-icon'
                                  : 'bg-custom-icon video-pause-new-icon'
                              }
                            ></span>{' '}
                          </button>
                        </div>
                      </div>
                    </div>
                  }

                  <div className="single-category-row">
                    <div className="single-category-left">
                      <div className="category-inner">
                        <ul className="cate-list-ul">
                          {userClassDetail.class_keywords.length > 0 &&
                            userClassDetail.class_keywords.map((skillsData, index) => {
                              return (
                                <li key={index}>
                                  <Link to="#" className="category-link">
                                    <span className="span-text">{skillsData.keyword}</span>
                                  </Link>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                      <div className="link-div">
                        <Link to="#" className="link-custom-primary" style={{ color: '#fff' }}>
                          <span className="span-text">
                            Video Duration : {userClassDetail.video_duration}
                          </span>
                        </Link>
                      </div>
                    </div>
                    <div className="single-category-right">
                      <div className="link-div">
                        <Link
                          to="#"
                          className="link link-custom-primary"
                          onClick={
                            isAuthenticated()
                              ? (e) => {
                                  handleClick(e, userClassDetail.id, userClassDetail.is_favourite);
                                }
                              : () => {
                                  handleNotLogin();
                                }
                          }
                        >
                          {!userClassDetail.is_favourite
                            ? ' + Add to favorites'
                            : ' Remove from favorites'}
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="our-content-bottom-row">
                    <div className="our-content-bottom-left">
                      <div className="our-content-left">
                        <div className="thumb-img">
                          <Link
                            to={`/user-creators-details/${userClassDetail.creator.id}`}
                            className="link"
                          >
                            <img
                              src={
                                userClassDetail.creator.thumb_image_creator_small === null ||
                                userClassDetail.creator.thumb_image_creator_small === undefined ||
                                userClassDetail.creator.thumb_image_creator_small ===
                                  'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg'
                                  ? noImgData
                                  : userClassDetail.creator.thumb_image_creator_small
                              }
                              className="img-fluid user"
                              alt="user"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="our-content-right">
                        <h3>
                          <Link
                            to={`/user-creators-details/${userClassDetail.creator.id}`}
                            className="link"
                          >
                            {userClassDetail.creator.full_name}{' '}
                            <span className="icon-rounded-span check-icon-rounded">
                              <span className="material-icons">done</span>{' '}
                            </span>
                          </Link>
                        </h3>
                        <p>{userClassDetail.creator.key_skill}</p>
                      </div>
                    </div>
                    <div className="our-content-bottom-right">
                      <h4>
                        <span className="material-icons">schedule</span>{' '}
                        <span className="txt">
                          {'Posted '}
                          <Moment fromNow ago>
                            {convertUTCDateToLocalDate(new Date(userClassDetail.created_at))}
                          </Moment>
                          {' ago'}
                        </span>{' '}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="single-course-body">
                <div className="single-course-body-row">
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <div className="tabs-root-common">
                        <div className="tabs-header-common">
                          <ul className="nav nav-tabs">
                            {tabs.length > 0 &&
                              tabs.map((tabsData) => {
                                return (
                                  <li
                                    className="nav-item"
                                    key={tabsData.id}
                                    onClick={(e) => {
                                      handleTabClick(e, tabsData.tabName);
                                    }}
                                  >
                                    <Link
                                      className={`nav-link text-uppercase ${
                                        isActiveTab === tabsData.tabName ? 'active show' : ''
                                      }`}
                                      data-toggle="tab"
                                      to="#"
                                    >
                                      {tabsData.tabName === 'Comments'
                                        ? `${tabsData.tabName} (${userClassDetail.class_reviews.length})`
                                        : tabsData.tabName}
                                    </Link>
                                  </li>
                                );
                              })}
                          </ul>
                        </div>

                        <div className="tabs-body-common">
                          <div className="tab-content">
                            <div
                              id="user-single-course-tab-01"
                              className={`tab-pane fade ${
                                isActiveTab === 'Description' ? 'active show' : ''
                              }`}
                            >
                              {isActiveTab === 'Description' && (
                                <div className="tab-pane-inner">
                                  <div className="us-course-tab max-width-770">
                                    <div className="us-course-tab-inner">
                                      <div className="ques-box-row">
                                        <div className="heading-title">
                                          <h3>What you will learn?</h3>
                                        </div>
                                        <div className="ques-box">
                                          <div className="desc-inner-box">
                                            <ul className="check-list-ul">
                                              {userClassDetail.class_covers.length > 0 &&
                                                userClassDetail.class_covers.map(
                                                  (skillOption, i) => {
                                                    return (
                                                      <li className="width-50" key={i}>
                                                        {skillOption}
                                                      </li>
                                                    );
                                                  },
                                                )}
                                            </ul>
                                          </div>
                                        </div>
                                        <div className="text-div">
                                          <p>
                                            {userClassDetail.class_description !== '' ||
                                            userClassDetail.class_description !== null ||
                                            userClassDetail.class_description !== undefined
                                              ? userClassDetail.class_description
                                              : ''}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div
                              id="user-single-course-tab-02"
                              className={`tab-pane fade ${
                                isActiveTab === 'Comments' ? 'active show' : ''
                              }`}
                            >
                              {isActiveTab === 'Comments' && (
                                <CreatorsReviewComponent
                                  creatorId={userClassDetail.id}
                                  isClassReview={true}
                                />
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
          </div>
        </div>
      )}
    </div>
  );
}

export default UserClassDetailsBannerComponent;

UserClassDetailsBannerComponent.propTypes = {
  creatorId: PropTypes.any,
};
