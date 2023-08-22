import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../assets/css/feather.min.css';
import '../../assets/css/footer.css';
import '../../assets/css/booking-modal-style.css';
import '../../assets/css/tab-style.css';
import '../../assets/css/custom-forms-style.css';
import '../../assets/css/owl-slider-style.css';
import '../../assets/css/creators-details-style.css';
import '../../assets/css/user/user-instructor-profile-style.css';
import '../../assets/css/style.css';
import '../../assets/css/user/user-home-style.css';
import { Link } from 'react-router-dom';
import CreatorClassBannerComponent from './CreatorClassBannerComponent';
import AboutCreatorComponent from './AboutCreatorComponent';
import ClassByCreatorComponent from '../ClassByCreatorComponent/ClassByCreatorComponent';
import UpComingLiveStreamComponent from '../UpComingLiveStreamComponent/UpComingLiveStreamComponent';
import CreatorMaterialComponent from './CreatorMaterialComponent';
import SimilarCreatorComponent from './SimilarCreatorComponent';
import { useParams } from 'react-router-dom';
import { getUrl } from '../../network/url';
import { get, remove, post } from '../../network/requests';
import { toast } from 'react-toastify';
import { tokenExpire } from '../../services/auth';
import ExclusiveCoursePopUpMpdalComponent from '../ExclusiveCoursePopUpMpdalComponent/ExclusiveCoursePopUpMpdalComponent';
toast.configure();
const CreatorsDetailsComponent = ({ handleLoader }) => {
  let params = useParams();
  const [cretorsListData, setcretorsListData] = useState('');
  const [upcomingStreams, setupcomingStreams] = useState('');
  const [similatMaterial, setsimilatMaterial] = useState('');
  const [isPurchase, setisPurchase] = useState(false);
  const [similarCreators, setsimilarCreators] = useState('');
  const [isModalActive, setisModalActive] = useState(false);

  const creatorListDetails = () => {
    handleLoader(true);
    const url = getUrl('creatorDetails');
    return get(`${url}/${params.id}/`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        handleLoader(false);
        switch (code) {
          case 200:
            if (status === true) {
              setcretorsListData(data);
              getCreatorUpcomingStreams(data.key_skill);
              getCreatorSimilarMaterials(data.id);
              getSimilarCreators(data.key_skill);
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
        toast.error(error);
      });
  };

  const getCreatorUpcomingStreams = (stream) => {
    handleLoader(true);
    const url = getUrl('getUpcomingStreamList');
    return get(`${url}search=${stream}`)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        handleLoader(false);
        switch (code) {
          case 200:
            if (status === true) {
              setupcomingStreams(data);
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
        toast.error(error);
      });
  };

  const getCreatorSimilarMaterials = (creatorId) => {
    handleLoader(true);
    const url = getUrl('getCreatorSimilarMaterial');
    return get(`${url}?creator=${creatorId}`)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        handleLoader(false);
        switch (code) {
          case 200:
            if (status === true) {
              setsimilatMaterial(data);
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
        toast.error(error);
      });
  };

  const getSimilarCreators = (creatorKeySkill) => {
    handleLoader(true);
    const url = getUrl('getCreatorListForUpcomingStream');
    return get(`${url}?key_skill=${creatorKeySkill}&exclude_creator=${params.id}`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        handleLoader(false);
        switch (code) {
          case 200:
            if (status === true) {
              setsimilarCreators(data);
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
        toast.error(error);
      });
  };
  // function isAuthenticated() {
  //   const permissions = localStorage.getItem('token');
  //   if (permissions) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  const handleOnLikeButtonClick = (creatorId, IsCreatorFav) => {
    isPlanPurchesesOrNot();
    if (isPurchase) {
      if (IsCreatorFav) {
        const url = getUrl('getFavCreatorList');
        return remove(`${url}/${creatorId}/`, true)
          .then((response) => {
            const {
              data: { code, status, message },
            } = response;
            switch (code) {
              case 200:
                if (status === true) {
                  creatorListDetails();
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
        const url = getUrl('getFavCreatorList');
        return post(`${url}/${creatorId}/`, {}, true)
          .then((response) => {
            const {
              data: { code, status, message },
            } = response;
            switch (code) {
              case 200:
                if (status === true) {
                  creatorListDetails();
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
    }
  };
  const isPlanPurchesesOrNot = (e) => {
    e.preventDefault();
    setisPurchase(true);
//     const url = getUrl('user-plan');
//     if (isAuthenticated()) {
//       get(url, true).then((response) => {
//         const {
//           data: { code, message },
//         } = response;
//         switch (code) {
//           case 200:
//             setisPurchase(true);
// 
//             break;
//           case 400:
//             setisPurchase(false);
// 
//             break;
//           default:
//             toast.error(message, {
//               pauseOnHover: false,
//               position: toast.POSITION.TOP_RIGHT,
//             });
//         }
//       });
//       // .catch((error) => {
//       //   history.push('/user/login');
//       //   tokenExpire(error.response, history);
//       // });
//     }
//     if (!isAuthenticated()) {
//       localStorage.setItem('location', window.location.pathname);
//       history.push('/user/login');
//     }
  };
  useEffect(() => {
    if (params.id) {
      creatorListDetails();
    }
    window.scrollTo(0, 0);
  }, [params.id]);

  const getUserPlans = () => {
    setisModalActive(false);
  };

  const handleCoursePurchaseModalClose = () => {
    setisModalActive(false);
  };

  return (
    <>
      <section className="ins-pro-banner-section">
        <CreatorClassBannerComponent
          creatorData={cretorsListData}
          getCreatorDetail={() => creatorListDetails()}
        />
      </section>
      <section className="block-banner-ins-new-classes-section block-banner-ins-classes-01">
        <AboutCreatorComponent aboutCreatorDetail={cretorsListData} />
      </section>
      <section
        className="our-pop-classes-section classes-by-instructor-section"
        id="classes-by-instructor-section"
      >
        <ClassByCreatorComponent creatorId={params.id} isHandleOpenModal={getUserPlans} />
      </section>
      <section className="materials-slider-section-new" id="materials-section-new">
        <CreatorMaterialComponent
          getMaterialDetails={similatMaterial}
          creatorName={cretorsListData}
          isHandleOpenModal={getUserPlans}
        />
      </section>
      <section className="upcoming-live-streams-section" id="upcoming-live-streams-section">
        <UpComingLiveStreamComponent
          header="Upcoming Live Classes"
          upcomingStreamData={upcomingStreams}
          handleLoader={handleLoader}
          isHandleOpenModal={getUserPlans}
        />
      </section>
      {similarCreators && similarCreators.length > 0 && (
        <section className="creators-section-new" id="creators-section-new">
          <div className="container container-1200">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="creators-div-new">
                  <div className="common-heading-div">
                    <div className="common-heading-inner-div">
                      <div className="common-heading-title-row">
                        <div className="common-heading-title-left">
                          <h2>More Creators you Might Like</h2>
                        </div>
                        <div className="common-heading-title-right">
                          <Link
                            to="/user-creators"
                            className="btn btn-primary-outline btn-primary-outline-n45"
                          >
                            <span className="text">View all</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <SimilarCreatorComponent
                    creatorsListData={similarCreators}
                    handleButtonClick={handleOnLikeButtonClick}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {isModalActive ? (
        <ExclusiveCoursePopUpMpdalComponent handleModalClose={handleCoursePurchaseModalClose} />
      ) : (
        ''
      )}
    </>
  );
};

export default CreatorsDetailsComponent;

CreatorsDetailsComponent.propTypes = {
  handleLoader: PropTypes.func,
};
