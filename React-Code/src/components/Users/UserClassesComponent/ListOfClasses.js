import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SortingDropdownComponent from '../../SortingDropdownComponent/SortingDropdownComponent';
import { toast } from 'react-toastify';
import userProfileImg from '../../../assets/images/profile.png';
import { get, post, remove } from '../../../network/requests';
import { getUrl } from '../../../network/url';
import Loader from '../../UI/Loader/Loader';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { tokenExpire, isAuthenticated } from '../../../services/auth';
import moment from 'moment';
toast.configure();
function ListOfClasses({ searchKeyword, searchInput }) {
  const [classData, setclassData] = useState([]);
  const [filterSearchKey, setFilterSearchKey] = useState('');
  const [isLoading, setIsLoadning] = useState(false);
  // const [isPurchase, setisPurchase] = useState(false);
  const [limit, setLimit] = useState(12);
  const creatorClassId = useSelector((state) => state.AddDetails.creatorClassId);

  const history = useHistory();
  const handleClick = (e, classId, isFav) => {
    isPlanPurchesesOrNot(e);
    e.preventDefault();
    // if (isPurchase) {
      if (isFav) {
        const url = getUrl('removeFavClass');
        return remove(`${url}${classId}/`, true)
          .then((response) => {
            const {
              data: { code, status, message },
            } = response;
            switch (code) {
              case 200:
                if (status === true) {
                  getClasses();
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
      const url = getUrl('postFavClass');
      return post(`${url}${classId}/`, {}, true)
        .then((response) => {
          const {
            data: { code, status, message },
          } = response;
          switch (code) {
            case 200:
              if (status === true) {
                getClasses();
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
    // }
  };

  const getClasses = () => {
    setIsLoadning(true);
    const url = getUrl('getListOfClasses');
    const listUrl =
      creatorClassId === null
        ? `${url}?search=${searchInput}&class_keyword=${searchKeyword}&filter_by=${filterSearchKey}`
        : `${url}?search=${searchInput}&class_keyword=${searchKeyword}&filter_by=${filterSearchKey}&creator=${creatorClassId.id}`;
    get(listUrl, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        setIsLoadning(false);
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
        setIsLoadning(false);
        tokenExpire(error.response, history);
      });
  };

  const handleSetFilterSearchValue = (searchValue) => {
    setFilterSearchKey(searchValue);
  };

  const onLoadMore = () => {
    setLimit(limit + 4);
  };

  useEffect(() => {
    getClasses();
  }, [searchInput, searchKeyword, filterSearchKey]);

  const isPlanPurchesesOrNotOnload = (e) => {
    e.preventDefault();
    onLoadMore();
//     const url = getUrl('user-plan');
//     if (isAuthenticated()) {
//       get(url, true)
//         .then((response) => {
//           const {
//             data: { code, message },
//           } = response;
//           switch (code) {
//             case 200:
//               onLoadMore();
// 
//               break;
//             case 400:
//               isHandleOpenModal();
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
  const isPlanPurchesesOrNot = (e, id) => {
    e.preventDefault();
    localStorage.removeItem('location');
    history.push(`/user-class-details/${id}`);
//     const url = getUrl('user-plan');
//     if (isAuthenticated()) {
//       get(url, true)
//         .then((response) => {
//           const {
//             data: { code, message },
//           } = response;
//           switch (code) {
//             case 200:
//               if (id) {
//                 localStorage.removeItem('location');
//                 history.push(`/user-class-details/${id}`);
//               }
//               if (!id) {
//                 setisPurchase(true);
//               }
//               // handleDownload(fileUrl);
// 
//               break;
//             case 400:
//               // localStorage.setItem('location', window.location.pathname);
//               // history.push('/flexible-plans');
//               if (!id) {
//                 setisPurchase(false);
//               }
//               if (id) {
//                 isHandleOpenModal();
//               }
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
  };

  return (
    <React.Fragment>
      {isLoading && <Loader />}

      <div className="container container-1200">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="our-card-classes-div mb-custom-bottom bordertop1">
              <div className="common-heading-div">
                <div className="common-heading-inner-div">
                  <div className="common-heading-title-row">
                    <div className="common-heading-title-left">
                      <h2>
                        {creatorClassId === null
                          ? `Our Classes`
                          : `${creatorClassId.name}'s Classes`}
                      </h2>
                    </div>
                    <div className="heading-title-right">
                      <SortingDropdownComponent
                        handleSetFilterSearchValue={handleSetFilterSearchValue}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="common-card-class-feed-div">
                <div className="row">
                  {classData && classData.length > 0 ? (
                    classData.slice(0, limit).map((classListData, i) => {
                      return (
                        <div className="col-lg-3 col-md-6" key={i}>
                          <div className="common-feed-card-slider-bx">
                            <div className="our-video-img-thumb">
                              <div className="img-thumb"> <img src={classListData.thumb_image} className="img-fluid img-responsive" alt="image" /> </div>
                              <div className="like-box-abs"> <button 
                                className={`like-button ${classListData.is_favourite ? 'active' : ''
                                  }`}
                                  onClick={
                                    isAuthenticated()
                                      ? (e) =>
                                          handleClick(
                                            e,
                                            classListData.id,
                                            classListData.is_favourite,
                                          )
                                      : null
                                  }
                                >
                                  <span className="like-icon "> </span>
                                </button>{' '}
                              </div>
                              {/* <div className="time-box-abs"> <button className="time-button"> 13:47 </button> </div> */}
                            </div>
                            <div
                              className="our-content-div"
                              onClick={(e) => isPlanPurchesesOrNot(e, classListData.id)}
                            >
                              <div className="our-content-row">
                                <div className="our-content-full">
                                  <h4>
                                    <Link
                                      to="#"
                                      className="link"
                                      onClick={(e) => isPlanPurchesesOrNot(e, classListData.id)}
                                    >
                                      {classListData.title}
                                    </Link>{' '}
                                  </h4>
                                </div>

                                <div className="our-content-left">
                                  <div className="thumb-img">
                                    <Link to="#" className="link">
                                      <img
                                        src={
                                          classListData.thumb_image_creator_small === null ||
                                          classListData.thumb_image_creator_small ===
                                            'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg'
                                            ? userProfileImg
                                            : classListData.thumb_image_creator_small
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
                                        {classListData.creator_name}
                                      </span>

                                      <span className="icon-rounded-span check-icon-rounded">
                                        <span className="material-icons">done</span>{' '}
                                      </span>
                                    </Link>
                                  </h3>
                                  <p>{classListData.creator_key_skill}</p>
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
                                    <span className="material-icons">schedule</span>{' '}
                                    <span className="text">
                                      <span>
                                        {moment(classListData.created_at.replace('Z', '')).format(
                                          'HH:mm',
                                        )}{' '}
                                      </span>
                                    </span>{' '}
                                  </h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p style={{ color: 'white', fontSize: '18px', margin: '10px' }}>
                      No data available{' '}
                    </p>
                  )}
                </div>
              </div>
              <div className="common-bottom-div">
                <div
                  className={`common-bottom-inner-div ${classData.length > limit ? '' : 'd-none'}`}
                >
                  <div className="btn-group-div d-flex justify-content-center">
                    <Link
                      to="#"
                      className="btn btn-primary-outline btn-primary-outline-big"
                      onClick={(e) => isPlanPurchesesOrNotOnload(e, classData.id)}
                    >
                      <span className="text">Load More</span>
                    </Link>
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

export default ListOfClasses;

ListOfClasses.propTypes = {
  searchKeyword: PropTypes.any,
  searchInput: PropTypes.any,
  isHandleOpenModal: PropTypes.func,
};
