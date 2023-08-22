import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { isAuthenticated } from "../../services/auth";
import Header from "../../components/Header/HeaderComponent";
import UserFeedSearchComponent from "../../components/Users/UserFeedSearchComponent/UserFeedSearchComponent";
import UserHomeBannerComponent from '../../components/Users/UserHomeComponent/UserHomeBannerComponent';
import UserHomeHeaderComponent from '../../components/Users/UserHomeHeaderComponent/UserHomeHeaderComponent';
import FooterComponent from "../../components/Footer/FooterComponent";
import { useHistory, useParams } from 'react-router-dom';
import ExclusiveCoursePopUpMpdalComponent from '../../components/ExclusiveCoursePopUpMpdalComponent/ExclusiveCoursePopUpMpdalComponent';

// import { get } from '../../network/requests';
// import { getUrl } from '../../network/url';
// import { toast } from 'react-toastify';
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/all.min.css";
import "../../assets/css/feather.min.css";
import "../../assets/css/footer.css";
import "../../assets/css/owl-slider-style.css";
import "../../assets/css/user/user-home-style.css";
import "../../assets/css/search-banner-style.css";
import "../../assets/css/style.css";

function FeedSearch() {
    const history = useHistory();
    const [isModalActive, setisModalActive] = useState(false);
    const sidebar = useSelector((state) => state.AddDetails.visible);
    const params = useParams();
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchInput, setsearchInput] = useState('');
 
    useEffect(() => {
        const checkCreator = localStorage.getItem('is_creator');
        if (checkCreator === 'true') {
            history.push('/creator-home');
        } else {
            history.push(`/user-feed-search/${params.keyword}`);
        }
    }, []);
    const handleSetKeywords = (keywordData) => {
        const searchKey = keywordData === "" ? "" : keywordData.toString();
        setSearchKeyword(searchKey);
    };
    const handleSearchInput = (searchResult) => {
        setsearchInput(searchResult);
    }
    const handleCoursePurchaseModalClose = () => {
        setisModalActive(false);
      };
    // const getUserPlans = () => {
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
    //     // setisModalActive(true);
    //   };
    return (
        <div id="wrapper" className={sidebar ? "wrapper home-wrapper position-fixed-custom" : "wrapper home-wrapper"}
        >
            {isAuthenticated() ? <UserHomeHeaderComponent activeTab="Home" headerClass="header-div header-div2 clearfix" /> : <Header headerLoginClass="nav-link login-in-btn" />}
            <div className="main-middle-area user-main-middle-area pt-custom-0">
                <div className="pattern-inner-div">
                    <UserHomeBannerComponent handleSetKeywords={handleSetKeywords} handleSearchInput={handleSearchInput} />
                    <section className="our-card-classes-section search-feed-card-classes-section">
                        <UserFeedSearchComponent    searchKey={searchInput} filterKey={searchKeyword} />
                    </section>
                    {isModalActive ? (
          <ExclusiveCoursePopUpMpdalComponent handleModalClose={handleCoursePurchaseModalClose} />
        ) : (
          ''
        )}
                    <FooterComponent auth />
                </div>
            </div>
        </div>
    )
}

export default FeedSearch;
