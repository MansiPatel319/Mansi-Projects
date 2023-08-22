import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import convertUTCDateToLocalDate from '../../hooks/TimeZoneConversion';
import noDataImg from '../../assets/images/no-post-imge.png';
import { useParams, useHistory } from 'react-router-dom';
import { get, remove, post } from '../../network/requests';
import { getUrl } from '../../network/url';
import { toast } from 'react-toastify';
import { tokenExpire } from '../../services/auth';
import demoVideo from '../../assets/images/video/video.mp4';
import { isAuthenticated } from '../../services/auth';

toast.configure();
const CreatorDetailsBannerComponent = ({ handleShowModal }) => {
  const params = useParams();
  const myInputVideo = useRef(null);
  const [paused, setpaused] = useState(true);
  const history = useHistory();
  const [creatorDetail, setstreamCreatorDetails] = useState('');


  const getLivestreamCreatorData = () => {
    const url = getUrl('getUpcomingStreamDetails');
    return get(`${url}${params.id}/`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              setstreamCreatorDetails(data);
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
  const handleClickOnVideoPlay = () => {
    if (isAuthenticated()) {
      play();
    } else {
      handleShowModal(true);
    }
  };
  const handleVideoPlay = () => {
    if (paused === true && isAuthenticated()) {
      play();
    }
  };
  const handleVideoPause = () => {
    if (myInputVideo.current !== null) {
      myInputVideo.current.pause();
      setpaused(true);
    }
  };
  // const handleForgotPasswordOpen = (data) => {
  //   setisForgotPasswordModal(data);
  // }
  const play = () => {
    setpaused(!paused);
    if (paused === true) {
      if (myInputVideo.current !== null) {
        myInputVideo.current.play();
        setpaused(false);
      }
    } else {
      if (myInputVideo.current !== null) {
        myInputVideo.current.pause();
        setpaused(true);
      }
    }
  };

  const handleClickFavourite = (e, id, isFav) => {
    e.preventDefault();
    if (!isAuthenticated()) {
      history.push('/user/login');
    } else {
      if (isFav) {
        const url = getUrl('remove_fav_creator');
        return remove(`${url}${id}/`, true)
          .then((response) => {
            const {
              data: { code, status, message },
            } = response;
            switch (code) {
              case 200:
                if (status === true) {
                  toast.success(message);
                  getLivestreamCreatorData();
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
      } else {
        const url = getUrl('remove_fav_creator');
        return post(`${url}${id}/`, {}, true)
          .then((response) => {
            const {
              data: { code, status, message },
            } = response;
            switch (code) {
              case 200:
                if (status === true) {
                  toast.success(message);
                  getLivestreamCreatorData();
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
    }
  };

  useEffect(() => {
    getLivestreamCreatorData();
    window.scrollTo(0, 0);
  }, [params.id]);

  return (
    <>
      <div className="container container-1200">
        {creatorDetail && (
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="single-course-div">
                <div className="single-course-top">
                  <div className="single-course-top-row">
                    <div className="row">
                      <div className="col-lg-8 col-md-8">
                        <div className="heading-top-div">
                          <h2>{creatorDetail.title}</h2>
                        </div>
                      </div>
                    </div>
                    <div className="row lf-upc-mian-row">
                      <div className="col-lg-8 col-md-7 lf-upc-left-col">
                        <div className="lf-upc-ls-div">
                          <div className="lf-upc-ls-row">
                            <div className="video-view-div">
                              <div className="video-view-center-div">
                                <video
                                  className="video-full-div"
                                  id="live-video-stream-play"
                                  disablePictureInPicture
                                  controlsList="nodownload"
                                  ref={myInputVideo}
                                  controls
                                  muted={false}
                                  style={{ height: '433px' }}
                                  onPlay={() => handleVideoPlay()}
                                  onPause={handleVideoPause}
                                  onContextMenu={(e) => {
                                    e.preventDefault();
                                    return false;
                                  }}
                                  poster={creatorDetail.thumbnail_file}
                                >
                                  <source
                                    src={
                                      creatorDetail.transcoded_sneak_peak_file === null
                                        ? demoVideo
                                        : creatorDetail.transcoded_sneak_peak_file
                                    }
                                    type="video/mp4"
                                  />
                                  Your browser does not support the video tag.
                                </video>
                                <div className="btn-video-btn-center">
                                  <button
                                    className="btn-video-custom"
                                    id="video-btn"
                                    onClick={() => handleClickOnVideoPlay()}
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
                                <div className="btn-top-right-div">
                                  <div className="sp-label-div">
                                    <Link to="#" className="link link-black-sp">
                                      {' '}
                                      <i className="bg-custom-icon video-camera-new-icon"></i> Sneak
                                      Peek
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="single-category-row">
                              <div className="single-category-left">
                                <div className="category-inner">
                                  {creatorDetail.stream_keywords &&
                                    creatorDetail.stream_keywords.length > 0 && (
                                      <ul className="cate-list-ul">
                                        {creatorDetail.stream_keywords.map((data, index) => {
                                          return (
                                            <li key={index}>
                                              <Link to="#" className="category-link">
                                                {' '}
                                                <span className="span-text">
                                                  {' '}
                                                  {data.keyword}{' '}
                                                </span>{' '}
                                              </Link>
                                            </li>
                                          );
                                        })}
                                      </ul>
                                    )}
                                </div>
                              </div>
                              <div className="single-category-right">
                                <div className="link-div">
                                  <Link
                                    to="#"
                                    className="link link-custom-primary"
                                    onClick={(e) =>
                                      handleClickFavourite(
                                        e,
                                        creatorDetail.creator.id,
                                        creatorDetail.is_favourite,
                                      )
                                    }
                                  >{`${
                                    creatorDetail.is_favourite
                                      ? 'Remove from favorites'
                                      : '+ Add to favorites'
                                  }`}</Link>
                                </div>
                              </div>
                            </div>                            <div className="our-content-bottom-row">
                              <div className="our-content-bottom-left">
                                <div className="our-content-left">
                                  <div className="thumb-img">
                                    <Link
                                      to={`/user-creators-details/${creatorDetail.creator.id}`}
                                      className="link"
                                    >
                                      <img
                                        src={
                                          creatorDetail.creator.thumb_image_creator_small === null ||
                                          creatorDetail.creator.thumb_image_creator_small ===
                                            'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg'
                                            ? noDataImg
                                            : creatorDetail.creator.thumb_image_creator_small
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
                                      to={`/user-creators-details/${creatorDetail.creator.id}`}
                                      className="link"
                                    >
                                      {creatorDetail.creator.full_name === 'undefined'
                                        ? ' '
                                        : creatorDetail.creator.full_name}{' '}
                                      <span className="icon-rounded-span check-icon-rounded">
                                        <span className="material-icons">done</span>{' '}
                                      </span>
                                    </Link>
                                  </h3>
                                  <p>{creatorDetail.creator.key_skill}</p>
                                </div>
                              </div>
                              <div className="our-content-bottom-right">
                                <h4>
                                  <span className="material-icons">schedule</span>
                                  <span className="text">
                                    {'Posted '}
                                    <Moment fromNow ago>
                                      {convertUTCDateToLocalDate(
                                        new Date(creatorDetail.created_at),
                                      )}
                                    </Moment>
                                    {' ago'}
                                  </span>
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-5 lf-upc-left-col">
                        <div className="rg-upc-ls-div">
                          <div className="rg-upc-ls-row">
                            <div className="book-now-learn-card-div">
                              <div className="book-now-learn-card-row">
                                <div className="book-now-learn-card-top-div">
                                  {/* <Link to="#" className="filter-link"> <span className="icon-img-span"> <i className="bg-custom-icon calendar-time-icon-new"></i> </span> <span className="span-text"> Set Reminder </span> </Link> */}
                                </div>
                                <div className="book-now-learn-card-body-div">
                                  <div className="heading-title">
                                    <h3>What you will learn?</h3>
                                  </div>
                                  <div className="desc-box">
                                    {creatorDetail.stream_covers &&
                                    creatorDetail.stream_covers.length > 0 ? (
                                      <ul
                                        className="check-list-ul"
                                        style={{ flexDirection: 'column' }}
                                      >
                                        {creatorDetail.stream_covers.map((data, index) => {
                                          return <li key={index}>{data}</li>;
                                        })}
                                      </ul>
                                    ) : (
                                      <p style={{ color: 'gray', fontSize: '15px' }}>
                                        Key points are not added
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div className="book-now-learn-card-bottom-div">
                                  <div className="btn-div-group">
                                    <Link
                                      to={
                                        isAuthenticated()
                                          ? `/user-book-a-seat/${params.id}`
                                          : '/user/login'
                                      }
                                      className="btn btn-primary-outline-icon-text"
                                    >
                                      <span className="icon-span">
                                        <i className="bg-custom-icon invoice-icon-new"></i>
                                      </span>
                                      <span className="text">Book Now</span>
                                    </Link>
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
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreatorDetailsBannerComponent;

CreatorDetailsBannerComponent.propTypes = {
  handleBookNow: PropTypes.func,
  handleShowModal: PropTypes.func,
};
