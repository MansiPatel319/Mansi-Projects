import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { get, remove } from '../../../network/requests';
import { getUrl } from '../../../network/url';
import noImgData from '../../../assets/images/no-post-imge.png';
import userProfileImg from '../../../assets/images/profile.png';
import Loader from '../../UI/Loader/Loader';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { tokenExpire } from '../../../services/auth';
// import { isAuthenticated } from '../../../services/auth';
import moment from 'moment';
toast.configure();
function FavouriteClassListComponent() {
  const [favClasses, setFavClassesData] = useState('');
  const [isLoading, setisLoading] = useState(false);
  // const [isPurchase,setisPurchase]= useState(false);
  const [limit, setLimit] = useState(12);
  const history = useHistory();
  const handleRemoveFavClass = (e, classId) => {
    e.preventDefault();
    setisLoading(true);
    isPlanPurchesesOrNot(e);
    // if(isPurchase){
    const url = getUrl('removeFavClass');
    return remove(`${url}${classId}/`, true)
      .then((response) => {
        const {
          data: { code, status, message },
        } = response;
        setisLoading(false);
        switch (code) {
          case 200:
            if (status === true) {
              toast.success(message);
              getFavoriteClasses();
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
        setisLoading(false);
        tokenExpire(error.response, history);
      });
    // }
  };
  const getFavoriteClasses = () => {
    setisLoading(true);
    const url = getUrl('getFavClassesList');
    return get(`${url}`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        setisLoading(false);
        switch (code) {
          case 200:
            if (status === true) {
              setFavClassesData(data);
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
        setisLoading(false);
        tokenExpire(error.response, history);
      });
  };

  const handleLoadMore = () => {
    setLimit(limit + 4);
  };
  const isPlanPurchesesOrNot = (e,id) => {
    e.preventDefault();
    localStorage.removeItem('location');
    history.push(`/user-class-details/${id}`);
  handleLoadMore();
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
    //           handleLoadMore();
    //           }
    //         if(!id){
    //           setisPurchase(true);
    //         }
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
  useEffect(() => {
    getFavoriteClasses();
  }, []);

  return (
    <React.Fragment>
      {isLoading && <Loader />}
      <div className="common-card-class-feed-div">
        <div className="row">
          {favClasses.length > 0 ? (
            favClasses.slice(0, limit).map((data) => {
              return (
                <div className="col-lg-3 col-md-6" key={data.id}>
                  <div className="common-feed-card-slider-bx">
                    <div className="our-video-img-thumb">
                      <div className="img-thumb">
                        <img
                          src={
                            data.creator_class.thumbnail_file === null ||
                            data.creator_class.thumbnail_file ===
                              'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg'
                              ? noImgData
                              : data.creator_class.thumbnail_file
                          }
                          className="img-fluid img-responsive"
                          alt="image"
                        />
                      </div>
                      <div className="like-box-abs">
                        {' '}
                        <button
                          className="like-button active"
                          onClick={(e) => {
                            handleRemoveFavClass(e, data.creator_class.id);
                          }}
                        >
                          <span className="like-icon "> </span>
                        </button>
                      </div>
                    </div>
                    <div className="our-content-div">
                      <div className="our-content-row">
                        <div className="our-content-full">
                          <h4>
                            <Link to={`/user-class-details/${data.creator_class.id}`}>
                              {data.creator_class.title}
                            </Link>
                          </h4>
                        </div>

                        <div className="our-content-left">
                          <div className="thumb-img">
                            <Link
                              to={`/user-class-details/${data.creator_class.id}`}
                              className="link"
                            >
                              <img
                                src={
                                  data.creator_class.creator.profile_image === null ||
                                  data.creator_class.creator.profile_image ===
                                    'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg'
                                    ? userProfileImg
                                    : data.creator_class.creator.profile_image
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
                              to={`/user-class-details/${data.creator_class.id}`}
                              className="link"
                            >
                              {`${data.creator_class.creator.first_name} ${data.creator_class.creator.last_name}`}
                              <span className="icon-rounded-span check-icon-rounded">
                                <span className="material-icons">done</span>
                              </span>
                            </Link>
                          </h3>
                          <p>{data.creator_class.creator.key_skill}</p>
                        </div>
                      </div>

                      <div className="our-content-bottom-row">
                        <div className="our-content-bottom-left"></div>
                        <div className="our-content-bottom-right">
                          <h4>
                            <span className="material-icons">schedule</span>
                            <span className="txt">
                   
                               <span>{moment(data.created_at.replace('Z','')).format('HH:mm') } </span>
                              
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
            <p style={{ color: 'white', fontSize: '25px', margin: '25px' }}>
              You haven’t added any favourite classes yet.
            </p>
          )}
        </div>
      </div>

      <div className={`common-bottom-div`}>
        <div className={`common-bottom-inner-div ${favClasses.length > limit ? '' : 'd-none'}`}>
          <div className={`btn-group-div d-flex justify-content-center`}>
            <Link
              to="#"
              className="btn btn-primary-outline btn-primary-outline-big"
              onClick={(e) => isPlanPurchesesOrNot(e, favClasses.id)}
            >
              <span className="text">Load More</span>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default FavouriteClassListComponent;
FavouriteClassListComponent.propTypes = {
  isHandleOpenModal: PropTypes.func,
};