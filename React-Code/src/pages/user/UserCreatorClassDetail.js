import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/all.min.css';
import '../../assets/css/feather.min.css';
import '../../assets/css/style.css';
import '../../assets/css/tab-style.css';
import '../../assets/css/owl-slider-style.css';
import "../../assets/css/user/user-upcomming-live-streams-style.css";
import "../../assets/css/search-banner-style.css";
import "../../assets/css/user/user-home-style.css";
import FooterComponent from "../../components/Footer/FooterComponent";
import UserHomeHeaderComponent from '../../components/Users/UserHomeHeaderComponent/UserHomeHeaderComponent';
import CreatorDetailsBannerComponent from '../../components/CreatorDetailComponent/CreatorDetailsBannerComponent';
import UserSimilarClassComponent from "../../components/Users/UserSimilarClassComponent/UserSimilarClassComponent";
import { useParams, useHistory } from 'react-router-dom';
import { get } from "../../network/requests";
import { getUrl } from "../../network/url";
import { toast } from 'react-toastify';
import Loader from '../../components/UI/Loader/Loader';
import Header from "../../components/Header/HeaderComponent";
import { isAuthenticated, tokenExpire } from "../../services/auth";
import BuyExclusivePopup from '../../components/CreatorDetailComponent/BuyExclusivePopup';
let creator_id;
toast.configure();
function UserCreatorClassDetail() {
  let params = useParams();
  const sidebar = useSelector((state) => state.AddDetails.visible);
  const history = useHistory();
  const [liveStreamDetail, setLiveStreamDetail] = useState()
  const [keywordsArray, setKeywords] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [isShowExclusiveModel, setIsShowExclusiveModel] = useState(false)

  let keywordIDs = [];
  const getLivestreamCreatorData = () => {
    setisLoading(true);
    const url = getUrl("getUpcomingStreamDetails");
    return get(`${url}${params.id}/`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        setisLoading(false);
        switch (code) {
          case 200:
            if (status === true) {
              setLiveStreamDetail(data)
              creator_id = data.creator.id;
              for (let i = 0; i < data.stream_keywords.length; i++) {
                keywordIDs.push(data.stream_keywords[i].id);
              }
              setKeywords(keywordIDs.toString());
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
        setisLoading(false);
        tokenExpire(error.response, history);
      });
  }
  const handleShowExclusiveModel = (flag) => {
    setIsShowExclusiveModel(flag)
  }
  const closeExlusiveModel = (flag) => {

    setIsShowExclusiveModel(flag)
  }


  const handleLoader = (isDataLoading) => {
    setisLoading(isDataLoading);
  }

  useEffect(() => {
    const checkCreator = localStorage.getItem('is_creator');
    if (checkCreator === 'true') {
      history.push('/creator-home');
    } else {
      history.push(`/user-creator-class-detail/${params.id}`);
    }
  }, []);


  useEffect(() => {
    getLivestreamCreatorData();
    window.scrollTo(0, 0);
  }, [params.id]);

  return (
    <React.Fragment>
      {isShowExclusiveModel && <BuyExclusivePopup liveStreamDetail={liveStreamDetail} closeExlusiveModel={closeExlusiveModel} />}
      <div id="wrapper" className={sidebar ? "wrapper home-wrapper position-fixed-custom" : "wrapper home-wrapper"}>
        {isLoading && <Loader />}
        {isAuthenticated() ? <UserHomeHeaderComponent
          activeTab="Live Streams"
          headerClass="header-div header-div2 clearfix"
        /> : <Header headerLoginClass="nav-link login-in-btn" />}

        <div className="main-middle-area user-main-middle-area main-bg-color">
          <div className="header-footer-with-min-height01">
            <section className="uplstr-section">
              <CreatorDetailsBannerComponent handleShowModal={handleShowExclusiveModel} />
            </section>
            <section className="single-course-similar-classes-section pb-100px" id="single-course-similar-classes-section">
              {keywordsArray && keywordsArray.length > 0 && <UserSimilarClassComponent searchKeyword={keywordsArray} handleLoader={handleLoader} creatorId={creator_id} />}
            </section>
          </div>
        </div>
        {isAuthenticated() ? <FooterComponent auth /> : <FooterComponent />}
      </div>
    </React.Fragment>
  );
}

export default UserCreatorClassDetail;
