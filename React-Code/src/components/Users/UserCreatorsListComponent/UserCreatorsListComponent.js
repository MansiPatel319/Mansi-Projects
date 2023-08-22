import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileImg from '../../../assets/images/profile.png';
import { get, post, remove } from "../../../network/requests";
import { getUrl } from "../../../network/url";
import { toast } from 'react-toastify';
import Loader from "../../UI/Loader/Loader";
import { isAuthenticated, tokenExpire } from '../../../services/auth';

toast.configure();
function UserCreatorsListComponent() {
  const [creatorList, setCreatorsList] = useState('');
  const [isLoading, setIsLoadning] = useState(false);
  // const [isPurchase,setisPurchase]= useState(false);
  const [limit, setLimit] = useState(9);
  const history = useHistory();

  const handleLoadMore = () => {
    setLimit(limit + 6);
  }
  const isPlanPurchesesOrNot = (e) => {
    e.preventDefault();
    handleLoadMore();
    // setisPurchase(true);
       
//     const url = getUrl('user-plan');
//     if (isAuthenticated()) {
//       get(url, true)
//         .then((response) => {
//           const {
//             data: { code, message },
//           } = response;
//           switch (code) {
//             case 200:
//               handleLoadMore();
//          setisPurchase(true);
//             
//               break;
//             case 400:
//               handleLoadMore();
// 
//                 setisPurchase(false);
//           
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
 
  const handleClick = (e, classId, isFav) => {
    e.preventDefault();
    isPlanPurchesesOrNot(e);
    // if(isPurchase){
    if (isFav) {
      const url = getUrl("getFavCreatorList");
      return remove(`${url}/${classId}/`, true)
        .then((response) => {
          const {
            data: { code, status, message },
          } = response;
          switch (code) {
            case 200:
              if (status === true) {
                getCreatorList();
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
      const url = getUrl("getFavCreatorList");
      return post(`${url}/${classId}/`, {}, true)
        .then((response) => {
          const {
            data: { code, status, message },
          } = response;
          switch (code) {
            case 200:
              if (status === true) {
                getCreatorList();
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
  };
  const getCreatorList = () => {
    setIsLoadning(true);
    const url = getUrl("creatorList");
    return get(`${url}`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        setIsLoadning(false);
        switch (code) {
          case 200:
            if (status === true) {
              setCreatorsList(data);
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
      .catch(() => {
        setIsLoadning(false);
        toast.error('Something went wrong', {
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  }

  const handleRedirection = (creatorId) => {
    history.push(`/user-creators-details/${creatorId}`)
  }

  useEffect(() => {
    getCreatorList();
  }, []);

  return (
    <React.Fragment>
      {isLoading && <Loader />}
      <div className="container container-1200">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="our-card-classes-div mb-custom-bottom">
              <div className="heading-div">
                <div className="heading-title-row">
                  <div className="heading-title-center">
                    <h2>Our Instructors</h2>
                  </div>
                </div>
              </div>

              <div className="common-card-class-feed-div common-card-creators-root">
                <div className="row">
                  {creatorList && creatorList.slice(0, limit).map((creatorListData) => {
                    return (
                      <div className="col-lg-4 col-md-6" key={creatorListData.id}>
                        <div className="creators-img-mask-slider-bx-new">
                          <div className="creators-img-mask-thumb">
                            <div className="img-thumb">
                              <img src={creatorListData.profile_image === null || creatorListData.profile_image === "https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg" ? profileImg : creatorListData.profile_image} className="img-fluid img-responsive" alt="image" />
                            </div>
                            <div className="view-btn-div">
                              <div className="center-btn-div">
                                <Link to={`/user-creators-details/${creatorListData.id}`} className="btn btn-view-outline">
                                  <span className="text">View Profile</span>
                                </Link>
                              </div>
                            </div>
                            <div className="like-box-abs">
                              <button className={`like-button ${creatorListData.is_fav ? 'active' : ''}`} onClick={(e) => isAuthenticated() ? handleClick(e, creatorListData.id, creatorListData.is_fav) : history.push('/user/login')}><span className="like-icon "> </span>
                              </button>
                            </div>
                          </div>
                          <div className="creators-content-div" onClick={() => handleRedirection(creatorListData.id)}>
                            <h3> <Link to={`/user-creators-details/${creatorListData.id}`} className="link">
                              {creatorListData.full_name}
                            </Link></h3>
                            <h4 onClick={() => handleRedirection(creatorListData.id)}>{creatorListData.key_skill}</h4>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  )}
                </div>
              </div>
              <div className="common-bottom-div">
                <div className={`common-bottom-inner-div ${limit > creatorList.length ? 'd-none' : ''}`}>
                  <div className="btn-group-div d-flex justify-content-center" onClick={handleLoadMore}>
                    <Link to="#" className="btn btn-primary-outline btn-primary-outline-big">
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

export default UserCreatorsListComponent;

UserCreatorsListComponent.propTypes = {
isHandleOpenModal: PropTypes.func
};