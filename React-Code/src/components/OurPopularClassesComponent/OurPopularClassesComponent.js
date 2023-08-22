import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { get, post, remove } from '../../network/requests';
import { getUrl } from '../../network/url';
import { useHistory } from 'react-router-dom';
import { isAuthenticated, tokenExpire } from '../../services/auth';
import { toast } from 'react-toastify';
import userProfileImg from '../../assets/images/profile.png';
import moment from 'moment';

toast.configure();
function OurPopularClassesComponent({
  searchKeyword,
  handleLoader,
  searchInput,
  // isHandleOpenModal,
}) {
  const [popularClassData, setclassData] = useState([]);
  // const [isPlanPurchased, setisPlanPurchased] = useState(false);
  const [flag, setFlag] = useState(0);
  const history = useHistory();
  const options = {
    nav: false,
    dots: false,
    stagePadding: 0,
    margin: 30,
    autoplay: true,
    smartSpeed: 2000,
    responsive: {
      0: {
        items: 1.2,
        autoplay: true,
        dots: true,
        margin: 15,
      },
      600: {
        items: 2.3,
      },
      1200: {
        items: 3.1,
      },
      1600: {
        items: 4,
      },
    },
  };
  const getClasses = () => {
    setclassData("");
    handleLoader(true);
    const keywordsList = searchKeyword === undefined ? '' : searchKeyword;
    const inputData = searchInput === undefined ? '' : searchInput;
    const url = getUrl('getSearchClassesDetails');
    get(`${url}?search=${inputData}&class_keyword=${keywordsList}`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        handleLoader(false);
        switch (code) {
          case 200:
            if (status === true) {
              setclassData(data);
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
        handleLoader(false);
        tokenExpire(error.response, history);
      });
  };

  const handleFavButtonClick = (e, classId, IsClassFav) => {
    e.preventDefault();

    // if (isPlanPurchased) {
      if (IsClassFav) {
        handleLoader(true);
        const url = getUrl('removeFavClass');
        return remove(`${url}${classId}/`, true)
          .then((response) => {
            const {
              data: { code, status, message },
            } = response;
            handleLoader(false);
            switch (code) {
              case 200:
                if (status === true) {
                  getClasses();
                  setFlag(flag + 1);
                  toast.success(message);
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
            handleLoader(false);
            tokenExpire(error.response, history);
          });
      } else {
        handleLoader(true);
        const url = getUrl('postFavClass');
        return post(`${url}${classId}/`, {}, true)
          .then((response) => {
            const {
              data: { code, status, message },
            } = response;
            handleLoader(false);
            switch (code) {
              case 200:
                if (status === true) {
                  getClasses();
                  setFlag(flag + 1);
                  toast.success(message);
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
            handleLoader(false);
            tokenExpire(error.response, history);
          });
      }
    // }
    //  else {
    //   history.push('/flexible-plans');
    // }
  };

  // const getPurchasedPlanDetails = () => {
  //   const url = getUrl('user-plan');
  //   get(url, true)
  //     .then((response) => {
  //       const {
  //         data: { code, status, message },
  //       } = response;
  //       switch (code) {
  //         case 200:
  //           if (status === true) {
  //             setisPlanPurchased(true);
  //           }
  //           break;
  //         case 400:
  //           if (message === 'You dont have any active plan!') {
  //             setisPlanPurchased(false);
  //           }
  //           break;
  //         default:
  //           toast.error(message, {
  //             pauseOnHover: false,
  //             position: toast.POSITION.TOP_RIGHT,
  //           });
  //       }
  //     })
  //     .catch(() => {
  //       // toast.error('Something went wrong', {
  //       //   pauseOnHover: false,
  //       //   position: toast.POSITION.TOP_RIGHT,
  //       // });
  //     });
  // };

  useEffect(() => {
    getClasses();
  }, [searchInput, searchKeyword, flag]);

  useEffect(() => {
    if (isAuthenticated()) {
      // getPurchasedPlanDetails();
    }
  }, []);

  const isPlanPurchesesOrNot = (e, id) => {
    e.preventDefault();
    localStorage.removeItem('location');
    history.push(`/user-class-details/${id}`);
    // const url = getUrl('user-plan');
    // if (isAuthenticated()) {
    //   get(url, true)
    //     .then((response) => {
    //       const {
    //         data: { code, message },
    //       } = response;
    //       switch (code) {
    //         case 200:
    //           localStorage.removeItem('location');
    //           history.push(`/user-class-details/${id}`);
    //           // handleDownload(fileUrl);
    //           break;
    //         case 400:
    //           // localStorage.setItem('location', window.location.pathname);
    //           // history.push('/flexible-plans');
    //           isHandleOpenModal();
    //           break;
    //         default:
    //           toast.error(message, {
    //             pauseOnHover: false,
    //             position: toast.POSITION.TOP_RIGHT,
    //           });
    //       }
    //     })
    //     .catch((error) => {
    //       history.push('/user/login');
    //       tokenExpire(error.response, history);
    //     });
    // }
    // if (!isAuthenticated()) {
    //   localStorage.setItem('location', window.location.pathname);
    //   history.push('/user/login');
    // }
  };

  return (
    <React.Fragment>
      <div className="container container-1200">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="our-pop-classes-div bordertop1">
              <div className="common-heading-div">
                <div className="common-heading-inner-div">
                  <div className="common-heading-title-row">
                    <div className="common-heading-title-left">
                      <h2>Popular Classes</h2>
                    </div>
                    <div className="common-heading-title-right">
                      <Link
                        to="/user-classes"
                        className="btn btn-primary-outline btn-primary-outline-n45"
                      >
                        <span className="text">View all</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="owl-slider-new-main-div">
                <div className="container container-1200">
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <div className="owl-slider-new-main-slider">
                        {popularClassData && popularClassData.length > 0 ? (
                          popularClassData.length > 0 && (
                            <OwlCarousel
                              className="our-pop-classes-owl"
                              id="our-pop-classes-owl"
                              loop={popularClassData.length >= 3 ? true : false}
                              key={Math.random()}
                              {...options}
                            >
                              {popularClassData.map((data, i) => {
                                return (
                                  <div className="item" key={i} style={{ cursor: 'pointer' }}>
                                    <div className="our-video-common-slider-box">
                                      <div className="our-video-img-thumb">
                                        <div className="img-thumb">
                                          <img
                                            src={data.thumb_image}
                                            className="img-fluid img-responsive"
                                            alt="onlineClassimage"
                                            onClick={(e) => isPlanPurchesesOrNot(e, data.id)}
                                          />
                                          <div className="like-box-abs">
                                            <button
                                              className={`like-button ${
                                                data.is_favourite ? 'active' : ''
                                              }`}
                                              onClick={(e) =>
                                                handleFavButtonClick(e, data.id, data.is_favourite)
                                              }
                                            >
                                              <span className="like-icon "> </span>
                                            </button>
                                          </div>
                                          <div className="time-box-abs">
                                            {/* <button className="time-button"> 13:47 </button> */}
                                          </div>
                                        </div>
                                        <div
                                          className="our-content-div"
                                          onClick={(e) => isPlanPurchesesOrNot(e, data.id)}
                                        >
                                          <div className="our-content-row">
                                            <div
                                              className="our-content-full"
                                              onClick={(e) => isPlanPurchesesOrNot(e, data.id)}
                                            >
                                              <h4>
                                                <Link to="#">{data.title}</Link>{' '}
                                              </h4>
                                            </div>

                                            <div className="our-content-left">
                                              <div className="thumb-img">
                                                <Link to={data.title} className="link">
                                                  <img
                                                    src={
                                                      data.thumb_image_creator_small === null ||
                                                      data.thumb_image_creator_small ===
                                                        'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg'
                                                        ? userProfileImg
                                                        : data.thumb_image_creator_small
                                                    }
                                                    className="img-fluid user"
                                                    alt="user"
                                                  />
                                                </Link>
                                              </div>
                                            </div>
                                            <div className="our-content-right">
                                              <h3>
                                                <Link to="#" className="link">
                                                  <span className="text-span">
                                                    {data.creator_name}
                                                  </span>
                                                  <span className="icon-rounded-span check-icon-rounded">
                                                    <span className="material-icons">done</span>
                                                  </span>{' '}
                                                </Link>
                                              </h3>
                                              <p>{data.creator_key_skill}</p>
                                            </div>
                                          </div>

                                          <div className="our-content-bottom-row">
                                            <div className="our-content-bottom-left">
                                              <div className="label-div">
                                                {/* <span className="txt-label">Popular</span> */}
                                              </div>
                                            </div>
                                            <div className="our-content-bottom-right">
                                              <h4>
                                                <span className="material-icons">schedule</span>
                                                <span className="txt">
                                                  {/* {'Posted '}
                                                  <Moment fromNow ago>
                                                    {convertUTCDateToLocalDate(
                                                      new Date(data.created_at),
                                                    )}
                                                  </Moment> */}
                                                  {/* {' ago'} */}
                                                  <span>{moment(data.created_at.replace("Z","")).format('HH:mm') } </span> 
                                              
                                                </span>
                                                {/* {' '} */}
                                              </h4>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </OwlCarousel>
                          )
                        ) : (
                          <p style={{ color: 'white', fontSize: '18px', margin: '10px' }}>
                            No data available{' '}
                          </p>
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
    </React.Fragment>
  );
}

export default OurPopularClassesComponent;

OurPopularClassesComponent.propTypes = {
  searchKeyword: PropTypes.any,
  handleLoader: PropTypes.func,
  searchInput: PropTypes.any,
  isHandleOpenModal: PropTypes.func,
};
