import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/all.min.css';
import '../../assets/css/feather.min.css';
import '../../assets/css/user/user-live-streams-style.css';
import '../../assets/css/style.css';
import UserHomeHeaderComponent from '../../components/Users/UserHomeHeaderComponent/UserHomeHeaderComponent';
import UserHomeBannerComponent from '../../components/Users/UserHomeComponent/UserHomeBannerComponent';
import UpComingLiveStreamComponent from '../../components/UpComingLiveStreamComponent/UpComingLiveStreamComponent';
import OneToOneSessionInstructorListingComponent from '../../components/UpComingLiveStreamComponent/OneToOneSessionInstructorListingComponent';
import { get, post, remove } from '../../network/requests';
import FooterComponent from '../../components/Footer/FooterComponent';
import { getUrl } from '../../network/url';
import { toast } from 'react-toastify';
import Loader from '../../components/UI/Loader/Loader';
import { useHistory } from 'react-router-dom';
import { tokenExpire } from '../../services/auth';
import { isAuthenticated } from '../../services/auth';
import ExclusiveCoursePopUpMpdalComponent from '../../components/ExclusiveCoursePopUpMpdalComponent/ExclusiveCoursePopUpMpdalComponent';


toast.configure();

function UserLiveStream() {
  const history = useHistory();
  const sidebar = useSelector((state) => state.AddDetails.visible);

  const [creatorList, setcreatorList] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchInput, setsearchInput] = useState('');
  // const [isPurchase, setisPurchase] = useState(false);
  const handleSetKeywords = (keywordData) => {
    const searchKey = keywordData === '' ? '' : keywordData.toString();
    setSearchKeyword(searchKey);
  };

  const handleLoader = (isDataLoading) => {
    setisLoading(isDataLoading);
  };

  const handleSearchInput = (searchResult) => {
    setsearchInput(searchResult);
  };

  useEffect(() => {
    const checkCreator = localStorage.getItem('is_creator');
    if (checkCreator === 'true') {
      history.push('/creator-home');
    } else {
      // getUserPlans();
    }
  }, []);

  // const getUserPlans = () => {
  //   const url = getUrl('user-plan');
  //   get(url, true)
  //     .then((response) => {
  //       const {
  //         data: { code, status, message },
  //       } = response;
  //       switch (code) {
  //         case 200:
  //           if (status === true) {
  //             setisPurchase(true);
  //           }
  //           break;
  //         case 400:
  //           setisPurchase(false);
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
  // 
  // };

  const [isModalActive, setisModalActive] = useState(false);

  const handleCoursePurchaseModalClose = () => {
    setisModalActive(false);
  };

  const getFeaturedCreatorDetails = () => {
    const url = getUrl('getCreatorListForUpcomingStream');
    return get(`${url}`)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              setcreatorList(data);
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
        toast.error('Something went wrong', {
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  const handleClickFav = (e, classID, isCreatorFav) => {
    e.preventDefault();
    // getUserPlans();
    // if(isPurchase){
      if (isCreatorFav) {
        const url = getUrl('getFavCreatorList');
        return remove(`${url}/${classID}/`, true)
          .then((response) => {
            const {
              data: { code, status, message },
            } = response;
            switch (code) {
              case 200:
                if (status === true) {
                  getFeaturedCreatorDetails();
                  toast.success('Remove creator from Favourites!');
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
        return post(`${url}/${classID}/`, '', true)
          .then((response) => {
            const {
              data: { code, status, message },
            } = response;
            switch (code) {
              case 200:
                if (status === true) {
                  getFeaturedCreatorDetails();
                  toast.success('Added creator to Favourites!');
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

  useEffect(() => {
    getFeaturedCreatorDetails();
  }, []);

  return (
    <div
      id="wrapper"
      className={sidebar ? 'wrapper home-wrapper position-fixed-custom' : 'wrapper home-wrapper'}
    >
      <UserHomeHeaderComponent
        activeTab="Live Streams"
        headerClass="header-div header-div2 clearfix"
      />
      <div className="main-middle-area user-main-middle-area main-bg-color pt-custom-0">
        <div className="header-footer-with-min-height03">
          <div className="pattern-inner-div ">
            {isLoading && <Loader />}
            <UserHomeBannerComponent
              isClassSearch={false}
              handleSearchInput={handleSearchInput}
              handleSetKeywords={handleSetKeywords}
            />
            <section
              className="upcoming-live-str-section-new upcoming-live-str-sec-new2"
              id="upcoming-live-str-section-new"
            >
              <UpComingLiveStreamComponent
                viewall={false}
                header="Upcoming Live Classes"
                searchKeyword={searchKeyword}
                searchInput={searchInput}
                handleLoader={handleLoader}
                // isHandleOpenModal={getUserPlans}
              />
            </section>
            <section
              className="our-card-classes-section search-feed-card-classes-section oto-sessions-section"
              id="live-session-section"
            >
              <OneToOneSessionInstructorListingComponent
                creatorsListData={creatorList}
                handleClickFav={handleClickFav}
                // isHandleOpenModal={getUserPlans}
              />
            </section>
          </div>
        </div>
      </div>
      {isAuthenticated() ? <FooterComponent auth /> : <FooterComponent />}
      {isModalActive ? (
        <ExclusiveCoursePopUpMpdalComponent handleModalClose={handleCoursePurchaseModalClose} />
      ) : (
        ''
      )}
    </div>
  );
}

export default UserLiveStream;
