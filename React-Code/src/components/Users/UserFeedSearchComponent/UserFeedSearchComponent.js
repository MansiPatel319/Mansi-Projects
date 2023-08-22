/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import { Link, useHistory } from 'react-router-dom';
import { get, post, remove } from '../../../network/requests';
import { getUrl } from '../../../network/url';
// import { isAuthenticated, tokenExpire } from '../../../services/auth';
import userProfileImg from '../../../assets/images/profile.png';

toast.configure();

function UserFeedSearchComponent({ searchKey, filterKey }) {
  const params = useParams();
  const history = useHistory();
  const [classData, setclassData] = useState([]);
  // const [isPurchase,setisPurchase]= useState(false);
  const [limit, setLimit] = useState(12);

  const onLoadMore = () => {
    setLimit(limit + 4);
  };

  const getClasses = (filterId) => {
    const url = getUrl('getListOfClasses');
    let searchInput = searchKey === undefined ? '' : searchKey;
    let filterKeyId =
      filterKey === undefined || filterKey === null || filterKey === '' ? filterId : filterKey;
    get(`${url}?search=${searchInput}&class_keyword=${filterKeyId}`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
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
        tokenExpire(error.response, history);
      });
  };

  const handleClick = (e, classId, isFav) => {
    e.preventDefault();
    isPlanPurchesesOrNot(e);
    // if(isPurchase){
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

  const getKeywordsData = () => {
    const url = getUrl('getKeywordsDetails');
    return get(`${url}`)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              data.map((item) => {
                if (item.keyword === params.keyword) {
                  getClasses(item.id);
                }
              });
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

  useEffect(() => {
    getKeywordsData();
  }, [searchKey, filterKey]);

  // eslint-disable-next-line no-unused-vars
  
  const loadmore = (e) => {
    e.preventDefault();
    onLoadMore();
  };
  const isPlanPurchesesOrNot = (e, id) => {
    e.preventDefault();
    localStorage.removeItem('location');
    history.push(`/user-class-details/${id}`);
    onLoadMore();
    // const url = getUrl('user-plan');
    // if (isAuthenticated()) {
    //   get(url, true)
    //     .then((response) => {
    //       const {
    //         data: { code, message },
    //       } = response;
    //       switch (code) {
    //         case 200:
    //           if(id){
    //             localStorage.removeItem('location');
    //             history.push(`/user-class-details/${id}`);
    //             onLoadMore();
    //           }
    //           if(!id){
    //             setisPurchase(true);
    //           }
    //          
    //           break;
    //         case 400:
    //           if(id){
    //             isHandleOpenModal();
    //           }
    //           if(!id){
    //             setisPurchase(false);
    //           }
    //         
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
    <div className="container container-1200">
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="our-card-classes-div mb-custom-bottom bordertop1">
            <div className="common-heading-div">
              <div className="common-heading-inner-div">
                <div className="common-heading-title-row">
                  <div className="common-heading-title-left">
                    <h2>{params.keyword}</h2>
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
                            <div className="img-thumb">
                              {' '}
                              <img
                                src={classListData.thumb_image}
                                className="img-fluid img-responsive"
                                alt="image"
                              />{' '}
                            </div>
                            <div className="like-box-abs">
                              {' '}
                              <button
                                className={`like-button ${
                                  classListData.is_favourite ? 'active' : ''
                                }`}
                                onClick={(e) =>
                                  handleClick(e, classListData.id, classListData.is_favourite)
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
                                  <Link to="#" className="link">
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
                                          'http://3.139.122.63:8000/media/sample.jpg'
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
                                    {classListData.creator_name}{' '}
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
                                {/* <div className="label-div">
                                                                    <span className="txt-label">Popular</span>
                                                                </div> */}
                              </div>
                              <div className="our-content-bottom-right">
                                <h4>
                                  <span className="text">
                                    <span>{moment(classListData.created_at.replace('Z','')).format('HH:mm')} </span>
                                  </span>
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
                    onClick={(e) => loadmore(e, classData.id)}
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
  );
}

export default UserFeedSearchComponent;

UserFeedSearchComponent.propTypes = {
  searchKey: PropTypes.any,
  filterKey: PropTypes.any,
  isHandleOpenModal: PropTypes.func,
};
