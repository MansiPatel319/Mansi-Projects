import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import noDataImg from '../../../assets/images/no-post-imge.png';
import { get, post, remove } from '../../../network/requests';
import { getUrl } from '../../../network/url';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { isAuthenticated, tokenExpire } from '../../../services/auth';
import moment from 'moment';

toast.configure();

function UserSimilarClassComponent({ searchKeyword, handleLoader, searchInput, creatorId }) {
  const [similarClassData, setsimilarClassData] = useState([]);
  // const [isPurchase, setisPurchase] = useState(false);
  const history = useHistory();
  const getClasses = (Keyword, Input) => {
    handleLoader(true);
    const keywordsList = Keyword === undefined ? '' : Keyword;
    const inputData = Input === undefined ? '' : Input;
    const url = getUrl('getSearchClassesDetails');
    get(`${url}?search=${inputData}&class_keyword=${keywordsList}&exclude_class=${creatorId}`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        handleLoader(false);
        switch (code) {
          case 200:
            if (status === true) {
              setsimilarClassData(data);
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

  const handleClick = (e, id, isFav) => {
    e.preventDefault();
    // if (isPurchase) {
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
                  // getCreatorData()
                  getClasses(searchKeyword, searchInput);
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
                // getCreatorData()
                getClasses(searchKeyword, searchInput);
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
    // }
  };
//   const isPlanPurchesesOrNot = (e) => {
//     e.preventDefault();
//     const url = getUrl('user-plan');
//     if (isAuthenticated()) {
//       get(url, true)
//         .then((response) => {
//           const {
//             data: { code, message },
//           } = response;
//           switch (code) {
//             case 200:
//               setisPurchase(true);
// 
//               break;
//             case 400:
//               setisPurchase(false);
// 
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
//   };

  useEffect(() => {
    getClasses(searchKeyword, searchInput);
  }, [searchInput, searchKeyword, creatorId]);

  return (
    <div className="container container-1200">
      {similarClassData && similarClassData.length > 0 && (
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="single-course-similar-classes-div">
              <div className="common-heading-div">
                <div className="common-heading-inner-div">
                  <div className="common-heading-title-row">
                    <div className="common-heading-title-left">
                      <h2>More classes you might like</h2>
                    </div>
                  </div>
                </div>
              </div>

              <div className="owl-slider-new-main-div ">
                <div className="owl-slider-new-main-slider">
                  {similarClassData && similarClassData.length > 0 && (
                    <OwlCarousel
                      className="owl-carousel owl-theme our-pop-classes-owl hide-overflow-slider"
                      id="our-pop-classes-owl"
                      items={3}
                      margin={15}
                      loop={similarClassData.length >= 3 ? true : false}
                      nav={false}
                      dots={false}
                      stagePadding={0}
                      autoplay={true}
                      autoplayTimeout={4000}
                      autoplayHoverPause={true}
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
                      {similarClassData.map((data, i) => {
                        return (
                          <div className="item" key={i}>
                            <div className="our-video-common-slider-box">
                              <div className="our-video-img-thumb">
                                <div className="img-thumb">
                                  <img
                                    src={data.thumb_image}
                                    className="img-fluid img-responsive"
                                    alt="onlineClassimage"
                                  />
                                </div>
                                <div className="like-box-abs">
                                  <button
                                    className={
                                      data?.is_favourite ? 'like-button active' : 'like-button'
                                    }
                                    onClick={
                                      isAuthenticated()
                                        ? (e) => {
                                            handleClick(e, data.id, data.is_favourite);
                                          }
                                        : ''
                                    }
                                  >
                                    <span className="like-icon "> </span>
                                  </button>
                                </div>
                                {/* <div className="time-box-abs"> <button className="time-button"> 13:47 </button> </div> */}
                              </div>
                              <div className="our-content-div">
                                <div className="our-content-row">
                                  <div className="our-content-full">
                                    <h4>
                                      <Link to={`/user-class-details/${data.id}`}>
                                        {data.title}
                                      </Link>{' '}
                                    </h4>
                                  </div>
                                  <div className="our-content-left">
                                    <div className="thumb-img">
                                      <Link to="#" className="link">
                                        <img
                                          src={
                                            data.thumb_image_creator_small === null ||
                                            data.thumb_image_creator_small === undefined ||
                                            data.thumb_image_creator_small ===
                                              'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg'
                                              ? noDataImg
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
                                      <Link to={`/user-class-details/${data.id}`} className="link">
                                        {data.creator_name}{' '}
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
                                        <span>
                                          {moment(data.created_at.replace('Z', '')).format('HH:mm')}{' '}
                                        </span>
                                      </span>{' '}
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
      )}
    </div>
  );
}
export default UserSimilarClassComponent;

UserSimilarClassComponent.propTypes = {
  searchKeyword: PropTypes.any,
  handleLoader: PropTypes.func,
  searchInput: PropTypes.any,
  creatorId: PropTypes.any,
};
