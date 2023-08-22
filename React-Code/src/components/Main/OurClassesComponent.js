import React, { useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import profileImg from '../../assets/images/profile.png';
import { toast } from 'react-toastify';
import { getUrl } from '../../network/url';
import { get, post, remove } from '../../network/requests';
import DropDownList from '../UI/DropDownList/DropDownList';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { tokenExpire, isAuthenticated } from '../../services/auth';
import { setPreviousPath } from '../../actions/HandlePreviousRoutes.js';
import { setClassFav } from '../../actions/favClassDetail.js';
import ExclusiveCoursePopUpMpdalComponent from '../ExclusiveCoursePopUpMpdalComponent/ExclusiveCoursePopUpMpdalComponent';
import moment from 'moment';
toast.configure();

const OurClassesComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // let logedinUSerCred = JSON.parse(localStorage.getItem('userCreatorData'));

  const [classData, setclassesByCreator] = useState('');
  const [flag, setflag] = useState(0);
  const [keywordsList, setkeywordsList] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  // const [isPlanPurchased, setisPlanPurchased] = useState(false);
  const [isFavOrNot, setisFavOrNot] = useState(false);
  const [isModalActive, setisModalActive] = useState(false);
  const FavClassId = useSelector((state) => state.FavClassDetail.favClassId);
  const handleSetKeywords = (keywordData) => {
    setSearchKeyword(keywordData);
  };

  const getClassesbyCreator = () => {
    setclassesByCreator('');

    const url = getUrl('getUserSimilarClassFilters');
    const creatorsId = '';
    const classKeyword = searchKeyword === '' ? '' : searchKeyword.value;

    return get(`${url}?creator=${creatorsId}&class_keyword=${classKeyword}`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;

        switch (code) {
          case 200:
            if (status === true) {
              setclassesByCreator(data);
              if (FavClassId) {
                for (let i = 0; i < data.length; i++) {
                  if (data[i].id === FavClassId) {
                    setisFavOrNot(data[i].is_favourite);
                  }
                }
              }
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
        toast.error(error);
      });
  };

  const handleLikeButton = (classId, classISFav) => {
    if (isAuthenticated()) {
      // if (isPlanPurchased) {
      if (classISFav) {
        const url = getUrl('removeFavClass');
        return remove(`${url}${classId}/`, true)
          .then((response) => {
            const {
              data: { code, status, message },
            } = response;
            switch (code) {
              case 200:
                if (status === true) {
                  getClassesbyCreator();
                  setflag(flag + 1);
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
            tokenExpire(error.response, history);
          });
      } else {
        const url = getUrl('postFavClass');
        return post(`${url}${classId}/`, {}, true)
          .then((response) => {
            const {
              data: { code, status, message },
            } = response;
            switch (code) {
              case 200:
                if (status === true) {
                  getClassesbyCreator();
                  setflag(flag + 1);
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
            tokenExpire(error.response, history);
          });
      }
      // }
      // else {
      //   history.push('/flexible-plans');
      // }
    } else {
      dispatch(setClassFav(classId));
      dispatch(setPreviousPath('/'));
      history.push('/user/login');
    }
  };

  const addClassToFavAfterAuth = (classId) => {
    if (!isFavOrNot) {
      const url = getUrl('postFavClass');
      return post(`${url}${classId}/`, {}, true)
        .then((response) => {
          const {
            data: { code, status, message },
          } = response;
          switch (code) {
            case 200:
              if (status === true) {
                getClassesbyCreator();
                dispatch(setClassFav(''));
                setflag(flag + 1);
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
      dispatch(setClassFav(''));
    }
  };

  const getKeywordsData = () => {
    // setIsLoadning(true);
    const url = getUrl('getKeywordsDetails');
    return get(`${url}`)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        // setIsLoadning(false);
        switch (code) {
          case 200:
            if (status === true) {
              const newData = data.map(({ keyword: label, id: value }) => ({
                value,
                label,
              }));
              setkeywordsList(newData);
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
        // setIsLoadning(false);
        toast.error(error);
      });
  };

  // const getPurchasedPlanDetails = () => {
  //   if (
  //     logedinUSerCred &&
  //     (logedinUSerCred.is_creator !== undefined || logedinUSerCred.is_creator !== null)
  //   ) {
  //     if (!logedinUSerCred.is_creator) {
  //       const url = getUrl('user-plan');
  //       get(url, true)
  //         .then((response) => {
  //           const {
  //             data: { code, status, message },
  //           } = response;
  //           switch (code) {
  //             case 200:
  //               if (status === true) {
  //                 setisPlanPurchased(true);
  //               }
  //               break;
  //             case 400:
  //               if (message === 'You dont have any active plan!') {
  //                 setisPlanPurchased(false);
  //               }
  //               break;
  //             default:
  //               toast.error(message, {
  //                 pauseOnHover: false,
  //                 position: toast.POSITION.TOP_RIGHT,
  //               });
  //           }
  //         })
  //         .catch(() => {
  //           // toast.error('Something went wrong', {
  //           //   pauseOnHover: false,
  //           //   position: toast.POSITION.TOP_RIGHT,
  //           // });
  //         });
  //     }
  //   }
  // };

  const isPlanPurchesesOrNot = (e, id) => {
    e.preventDefault();
    localStorage.removeItem('location');
    history.push(`/user-class-details/${id}`);
    // const url = getUrl('user-plan');
    //     if (isAuthenticated()) {
    //       get(url, true)
    //         .then((response) => {
    //           const {
    //             data: { code, message },
    //           } = response;
    //           switch (code) {
    //             case 200:
    //               localStorage.removeItem('location');
    //               history.push(`/user-class-details/${id}`);
    //
    //               break;
    //             case 400:
    //
    //               setisModalActive(false);
    //               break;
    //             default:
    //               toast.error(message, {
    //                 pauseOnHover: false,
    //                 position: toast.POSITION.TOP_RIGHT,
    //               });
    //           }
    //         })
    //         .catch((error) => {
    //           history.push('/user/login');
    //           tokenExpire(error.response, history);
    //         });
    //     }
    //     if (!isAuthenticated()) {
    //       localStorage.setItem('location', window.location.pathname);
    //       history.push('/user/login');
    //     }
  };

  const handleCoursePurchaseModalClose = () => {
    setisModalActive(false);
  };

  useEffect(() => {
    getClassesbyCreator();
  }, [searchKeyword, flag]);

  useEffect(() => {
    getKeywordsData();
    if (isAuthenticated()) {
      // getPurchasedPlanDetails();
      if (FavClassId) {
        addClassToFavAfterAuth(FavClassId);
      }
    }
  }, []);

  return (
    <div className="our-classes-div pb-0">
      <div className="heading-div">
        <div className="container container-1200">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="heading-inner-div">
                <div className="heading-title-row">
                  <div className="heading-title-left">
                    <h2>Our Classes</h2>
                  </div>
                  <div className="heading-title-right">
                    <div className="form-group select2-form-group select2-new-group">
                      <div className="select-box select-custom2 select-custom2-general round-12">
                        <DropDownList
                          value={searchKeyword}
                          onChange={handleSetKeywords}
                          options={keywordsList}
                          placeholder="All Categories..."
                          controlStyle={{
                            borderRadius: '12px',
                            border: '1px solid #282a33',
                            background: '#1e1e27',
                            '&:hover': {
                              border: 'none',
                            },
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="owl-slider-new-main-div">
        <div className="container container-1200">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="owl-slider-new-main-slider">
                {console.log('classData', classData)}
                {classData && classData.length > 0 ? (
                  <OwlCarousel
                    className="owl-carousel owl-theme our-classes-owl"
                    id="our-classes-owl"
                    loop={classData.length >= 3 ? true : false}
                    items={4}
                    margin={15}
                    nav={false}
                    dots={false}
                    stagePadding={0}
                    autoplay={true}
                    smartSpeed={2000}
                    responsiveClass={true}
                    responsive={{
                      0: {
                        items: 1.3,
                        autoplay: true,
                        dots: true,
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
                    }}
                  >
                    {classData.slice(0, 10).map((classData) => {
                      return (
                        <div className="item" key={classData.id}>
                          <div className="our-video-common-slider-box">
                            <div className="our-video-img-thumb w-100">
                              <div className="img-thumb w-100">
                                <img
                                  // src={classData.thumbnail_file}
                                  src={classData.thumb_image}
                                  className="img-fluid img-responsive"
                                  alt="image"
                                />
                              </div>
                              <div className="like-box-abs">
                                <button
                                  className={`like-button ${
                                    classData.is_favourite ? 'active' : ''
                                  }`}
                                  onClick={() =>
                                    handleLikeButton(classData.id, classData.is_favourite)
                                  }
                                >
                                  <span className={`like-icon`}> </span>
                                </button>
                              </div>
                            </div>
                            <div className="our-content-div">
                              <div className="our-content-row">
                                <div className="our-content-full">
                                  <h4>
                                    <Link
                                      to="#"
                                      className="link"
                                      onClick={(e) => isPlanPurchesesOrNot(e, classData.id)}
                                    >
                                      {classData.title}
                                    </Link>
                                  </h4>
                                </div>

                                <div className="our-content-left">
                                  <div className="thumb-img">
                                    <Link
                                      to="#"
                                      className="link"
                                      onClick={(e) => isPlanPurchesesOrNot(e, classData.id)}
                                    >
                                      <img
                                        src={
                                          classData.thumb_image_creator_small === null ||
                                          classData.thumb_image_creator_small ===
                                            'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg'
                                            ? profileImg
                                            : classData.thumb_image_creator_small
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
                                      to="#"
                                      className="link"
                                      onClick={(e) => isPlanPurchesesOrNot(e, classData.id)}
                                    >
                                      <span className="text-span">{classData.creator_name}</span>

                                      <span className="icon-rounded-span check-icon-rounded">
                                        <span className="material-icons">done</span>
                                      </span>
                                    </Link>
                                  </h3>
                                  <p>{classData.creator_key_skill}</p>
                                </div>
                              </div>

                              <div className="our-content-bottom-row">
                                <div className="our-content-bottom-left">
                                  {/* <div className="label-div">
                                    <span className="txt-label">Popular</span>
                                  </div> */}
                                </div>
                                <div className="our-content-bottom-right">
                                  <h4>
                                    <span className="material-icons">schedule</span>
                                    <span className="txt">
                                      <span>
                                        {moment(classData.created_at.replace('Z', '')).format(
                                          'HH:mm',
                                        )}{' '}
                                      </span>
                                    </span>
                                  </h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </OwlCarousel>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalActive ? (
        <ExclusiveCoursePopUpMpdalComponent handleModalClose={handleCoursePurchaseModalClose} />
      ) : (
        ''
      )}
    </div>
  );
};

export default OurClassesComponent;
