import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/style.css';
import '../../assets/css/user/user-home-style.css';
import '../../assets/css/feather.min.css';
import '../../assets/css/owl-slider-style.css';
import '../../assets/css/all.min.css';

// import { get } from '../../network/requests';
// import { getUrl } from '../../network/url';
import '../../assets/css/search-banner-style.css';
import UserHomeHeaderComponent from '../../components/Users/UserHomeHeaderComponent/UserHomeHeaderComponent';
import UserHomeBannerComponent from '../../components/Users/UserHomeComponent/UserHomeBannerComponent';
import UpComingLiveStreamComponent from '../../components/UpComingLiveStreamComponent/UpComingLiveStreamComponent';
import OurPopularClassesComponent from '../../components/OurPopularClassesComponent/OurPopularClassesComponent';
import ClassByDifferentCategoriesComponent from '../../components/Users/UserHomeComponent/ClassByDifferentCategoriesComponent';
import FooterComponent from '../../components/Footer/FooterComponent';
import ExclusiveCoursePopUpMpdalComponent from '../../components/ExclusiveCoursePopUpMpdalComponent/ExclusiveCoursePopUpMpdalComponent';
import Loader from '../../components/UI/Loader/Loader';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { isAuthenticated } from '../../services/auth';
toast.configure();
function UserHome() {
  const history = useHistory();
  const sidebar = useSelector((state) => state.AddDetails.visible);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchInput, setsearchInput] = useState('');
  const [updateSearchKeyword, setupdateSearchKeyword] = useState('');
  const [isKeyword, setIsKeyword] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const checkCreator = localStorage.getItem('is_creator');
    if (checkCreator === 'true') {
      history.push('/creator-home');
    } else {
      if (isAuthenticated()) {
        // getUserPlans();
      }
    }
  }, []);

//   const getUserPlans = () => {
//     const url = getUrl('user-plan');
//     get(url, true)
//       .then((response) => {
//         const {
//           data: { code, status, message },
//         } = response;
//         switch (code) {
//           case 200:
//             if (status === true) {
//               // setisPlanPurchased(true);
//             }
//             break;
//           case 400:
//             // if (userCreatorData.flag_login) {
//             setisModalActive(true);
//             // }
//             break;
//           default:
//             toast.error(message, {
//               pauseOnHover: false,
//               position: toast.POSITION.TOP_RIGHT,
//             });
//         }
//       })
//       .catch(() => {
//         // toast.error('Something went wrong', {
//         //   pauseOnHover: false,
//         //   position: toast.POSITION.TOP_RIGHT,
//         // });
//       });
// 
//   };

  const [isModalActive, setisModalActive] = useState(false);

  const handleCoursePurchaseModalClose = () => {
    setisModalActive(false);
  };

  const handleSetKeywords = (keywordData) => {
    if (keywordData !== '' || keywordData !== undefined || keywordData !== null) {
      setupdateSearchKeyword(keywordData);
    }
    setIsKeyword(true);
    const searchKey = keywordData === '' ? '' : keywordData.toString();
    setSearchKeyword(searchKey);
  };

  const handleISUpdateKeyword = () => {
    setIsKeyword(false);
  };

  const handleSearchInput = (searchResult) => {
    setsearchInput(searchResult);
  };

  const handleLoader = (isDataLoading) => {
    setisLoading(isDataLoading);
  };

  return (
    <React.Fragment>
      <div
        id="wrapper"
        className={sidebar ? 'wrapper home-wrapper position-fixed-custom' : 'wrapper home-wrapper'}
      >
        <UserHomeHeaderComponent activeTab="Home" headerClass="header-div header-div2 clearfix" />
        <div className="main-middle-area user-main-middle-area pt-custom-0">
          <div className="pattern-inner-div">
            <UserHomeBannerComponent
              handleSetKeywords={handleSetKeywords}
              handleSearchInput={handleSearchInput}
            />
            {isLoading && <Loader />}
            <section className="our-pop-classes-section" id="our-pop-classes-section">
              <OurPopularClassesComponent
                searchKeyword={searchKeyword}
                handleLoader={handleLoader}
                searchInput={searchInput}
                // isHandleOpenModal={getUserPlans}
              />
            </section>
            <section className="our-card-classes-section">
              <ClassByDifferentCategoriesComponent
                searchKeyword={updateSearchKeyword}
                searchInput={searchInput}
                isKeyword={isKeyword}
                handleISUpdateKeyword={handleISUpdateKeyword}
                handleLoader={handleLoader}
                // isHandleOpenModal={getUserPlans}
              />
            </section>
            <section className="upcoming-live-str-section-new" id="upcoming-live-str-section-new">
              <UpComingLiveStreamComponent
                header="Upcoming Live Classes"
                searchKeyword={searchKeyword}
                handleLoader={handleLoader}
                searchInput={searchInput}
                viewall={true}
              />
            </section>
            <FooterComponent auth />
          </div>
        </div>
        {isModalActive ? (
          <ExclusiveCoursePopUpMpdalComponent handleModalClose={handleCoursePurchaseModalClose} />
        ) : (
          ''
        )}
      </div>
    </React.Fragment>
  );
}

export default UserHome;
