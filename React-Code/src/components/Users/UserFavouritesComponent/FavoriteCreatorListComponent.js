import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../../services/auth';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { get, remove } from '../../../network/requests';
import { getUrl } from '../../../network/url';
import userProfileImg from '../../../assets/images/profile.png';
import Loader from '../../UI/Loader/Loader';
import { tokenExpire } from '../../../services/auth';
toast.configure();
function FavoriteCreatorListComponent() {
  const history = useHistory();
  const [favClasses, setFavClassesData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  // const [isPurchase,setisPurchase]= useState(false);
  const [limit, setLimit] = useState(9);

  const handleRemoveCreator = (e, creatorId) => {
    e.preventDefault();
    setisLoading(true);
    isPlanPurchesesOrNot(e);
    // if(isPurchase){
    const url = getUrl('getFavCreatorList');
    return remove(`${url}/${creatorId}/`, true)
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
    const url = getUrl('getFavCreatorList');
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
    setLimit(limit + 3);
  };
  const isPlanPurchesesOrNot = (e, id) => {
    e.preventDefault();
    localStorage.removeItem('location');
    history.push(`/user-class-details/${id}`)
    handleLoadMore();
//     const url = getUrl('user-plan');
//     if (isAuthenticated()) {
//       get(url, true)
//         .then((response) => {
//           const {
//             data: { code, message },
//           } = response;
//           switch (code) {
//             case 200:
//               if(!id){
//                 setisPurchase(true);
//               }
//               if(id){
//                 localStorage.removeItem('location');
//                 history.push(`/user-class-details/${id}`)
//                 handleLoadMore();
//               }
//              
//               break;
//             case 400:
// 
//               if(id){
//                 isHandleOpenModal();
//               }
//               if(!id){
//                 setisPurchase(false);
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
//         // .catch((error) => {
//         //   history.push('/user/login');
//         //   tokenExpire(error.response, history);
//         // });
    // }
    // if (!isAuthenticated()) {
    //   localStorage.setItem('location', window.location.pathname);
    //   history.push('/user/login');
    // }
  };
  useEffect(() => {
    if (!isAuthenticated) {
      history.replace('/login');
    }
    getFavoriteClasses();
  }, []);

  return (
    <React.Fragment>
      {isLoading && <Loader />}
      <div className="common-card-class-feed-div common-card-creators-root">
        <div className="row">
          {favClasses.length > 0 ? (
            favClasses.slice(0, limit).map((data) => {
              return (
                <div className="col-lg-4 col-md-6" key={data.id}>
                  <div className="creators-img-mask-slider-bx-new">
                    <div className="creators-img-mask-thumb">
                      <div className="img-thumb">
                        <img
                          src={
                            data.creator.profile_image === null ||
                            data.creator.profile_image ===
                              'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg'
                              ? userProfileImg
                              : data.creator.profile_image
                          }
                          className="img-fluid img-responsive"
                          alt="image"
                        />
                      </div>
                      <div className="view-btn-div">
                        <div className="center-btn-div">
                          <Link
                            to={`/user-creators-details/${data.creator.id}`}
                            className="btn btn-view-outline"
                          >
                            <span className="text">View Profile</span>
                          </Link>
                        </div>
                      </div>
                      <div className="like-box-abs">
                        {' '}
                        <button
                          className="like-button active"
                          onClick={(e) => {
                            handleRemoveCreator(e, data.creator.id);
                          }}
                        >
                          <span className="like-icon "> </span>
                        </button>{' '}
                      </div>
                    </div>
                    <div className="creators-content-div">
                      <h3>
                        <Link
                          to={`/user-creators-details/${data.creator.id}`}
                          className="link"
                        >{`${data.creator.full_name}`}</Link>
                      </h3>
                      <h4>{data.creator.key_skill}</h4>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            // <img src={noImgData} className="img-fluid img-responsive" width={355} />
            <p style={{ color: 'white', fontSize: '25px', margin: '25px' }}>
              You haven’t added any favourite instructors yet.
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

export default FavoriteCreatorListComponent;

FavoriteCreatorListComponent.propTypes = {
  isHandleOpenModal: PropTypes.func
  };
