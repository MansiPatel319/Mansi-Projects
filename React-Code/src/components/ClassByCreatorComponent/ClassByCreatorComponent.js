import React, { useState, useEffect } from "react";
import {useDispatch} from 'react-redux';
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
// import Moment from 'react-moment';
import { get, post, remove } from "../../network/requests";
// import convertUTCDateToLocalDate from "../../hooks/TimeZoneConversion";
import { getUrl } from "../../network/url";
import {  tokenExpire } from "../../services/auth";
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import noDataImg from '../../assets/images/no-post-imge.png';
import { setCreatorClassId } from "../../actions/addDetails";
import moment from "moment";
toast.configure();
const ClassByCreatorComponent = ({ creatorId, searchKeyword }) => {
  const [classData, setclassesByCreator] = useState('');
  const params= useParams() 
  const dispatch = useDispatch()
  const [creatorName, setCreatorName] = useState('');
  // const [isPlanPurchased, setisPlanPurchased] = useState(false);
  const [flag, setflag] = useState(0);
  const history = useHistory();
  const getClassesbyCreator = () => {
    const url = getUrl("getUserSimilarClassFilters");
    const creatorsId = creatorId === undefined ? '' : creatorId;
    const classKeyword = searchKeyword === undefined ? '' : searchKeyword
    return get(`${url}?creator=${creatorsId}&class_keyword=${classKeyword}`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              setclassesByCreator(data);
              for (let i = 0; i < 1; i++) {
                setCreatorName(data[i].creator_name);
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
      .catch((error) => { toast.error(error); });
  }

  const handleFavButtonClick = (classId, isClassFav) => {
    // if (isPlanPurchased) {
      if (isClassFav) {
        const url = getUrl("removeFavClass");
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
      }
      else {
        const url = getUrl("postFavClass");
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
  }

  useEffect(() => {

    getClassesbyCreator();
  }, [searchKeyword, flag,params.id]);

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
  //           if (message === "You don't have any active plan!") {
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
    // getPurchasedPlanDetails();
  }, []);

  const isPlanPurchesesOrNot = (e, id) => {
    e.preventDefault();
    localStorage.removeItem('location');
    history.push(`/user-class-details/${id}`);
    redirectToCreatorClasses();
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
  //             history.push(`/user-class-details/${id}`);
  // 
  //             redirectToCreatorClasses();
  //             break;
  //           case 400:
  //    
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
  };
  const redirectToCreatorClasses = () =>{
    dispatch(setCreatorClassId(
      {
        id:creatorId,
        name: creatorName
      }
    ))
  
      history.push("/user-classes");
    
   
  }
 
  return (
    <React.Fragment>
      <div className="container container-1200">
        {classData && classData.length > 0 ? (
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="our-pop-classes-div bordertop1">
                <div className="common-heading-div">
                  <div className="common-heading-inner-div">
                    <div className="common-heading-title-row">
                      <div className="common-heading-title-left">
                        <h2>{`${creatorName}’s classes`}</h2>
                      </div>
                      <div className="common-heading-title-right">
                        <Link onClick={(e) => isPlanPurchesesOrNot(e, classData.id)} className="btn btn-primary-outline btn-primary-outline-n45">
                          <span className="text">View all</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="owl-slider-new-main-div">
                  <div className="owl-slider-new-main-slider">
                    {classData.length > 0 && (
                      <OwlCarousel
                        className="owl-carousel owl-theme our-pop-classes-owl"
                        id="our-pop-classes-owl"
                        loop={false}
                        items={3}
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
                        {classData.slice(0, 10).map((classData, index) => {
                          return (
                            <div className="item" key={index}>
                              <div className="our-video-common-slider-box">
                                <div className="our-video-img-thumb">
                                  <div className="img-thumb">
                                    <img
                                      src={classData.thumb_image}
                                      className="img-fluid img-responsive"
                                      alt="SliderImg1"
                                    />
                                  </div>
                                  <div className="like-box-abs">
                                    <button className={`like-button ${classData.is_favourite ? 'active' : ''}`} onClick={() => handleFavButtonClick(classData.id, classData.is_favourite)}>
                                      <span className="like-icon "> </span>
                                    </button>
                                  </div>
                                
                                </div>
                                <div className="our-content-div">
                                  <div className="our-content-row">
                                    <div className="our-content-full">
                                      <h4><Link to='#' className="link" onClick={(e) => isPlanPurchesesOrNot(e, classData.id)}>
                                        {classData.title}
                                      </Link> </h4>
                                    </div>

                                    <div className="our-content-left">
                                      <div className="thumb-img">
                                        <Link to="#" className="link">
                                          <img src={classData.thumb_image_creator_small === "https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg" || classData.thumb_image_creator_small === null || classData.thumb_image_creator_small === undefined ? noDataImg : classData.thumb_image_creator_small} className="img-fluid user" alt="user" />
                                        </Link>
                                      </div>
                                    </div>
                                    <div className="our-content-right">
                                      <h3><Link to="#" className="link">{classData.creator_name} <span className="icon-rounded-span check-icon-rounded"><span className="material-icons">done</span> </span></Link></h3>
                                      <p>{classData.creator_key_skill}</p>
                                    </div>
                                  </div>

                                  <div className="our-content-bottom-row">
                                    <div className="our-content-bottom-left">
                                      <div className="label-div">
                                        {/* <span className="txt-label">Popular</span> */}
                                      </div>
                                    </div>
                                    <div className="our-content-bottom-right">
                                      <h4><span className="material-icons">schedule</span>
                                        <span className="txt">
                                      
                                           <span>{moment(classData.created_at.replace('Z','')).format('HH:mm') } </span>
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
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) :
          <p style={{ color: 'white', fontSize: '18px', margin: '10px' }}>No data available </p>
        }
      </div>
    </React.Fragment>
  );
};

export default ClassByCreatorComponent;

ClassByCreatorComponent.propTypes = {
  creatorId: PropTypes.any,
  searchKeyword: PropTypes.any,
  isHandleOpenModal: PropTypes.func
}