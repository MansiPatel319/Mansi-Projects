import React, { useEffect } from 'react';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/all.min.css';
import '../../assets/css/feather.min.css';
import '../../assets/css/tab-style.css';
import '../../assets/css/creator/creator-my-earnings-style.css';
import '../../assets/css/creator/creator-popup-style.css';
import '../../assets/css/creator/affiliate.css';
import '../../assets/css/style.css';
import CreatorHeader from '../../components/Header/CreatorHeader';
import CreatorLiveStreamEarningComponent from '../../components/Creator/MyEarningComponent/CreatorLiveStreamEarningComponent';
import { useHistory } from 'react-router-dom';
import FooterComponent from '../../components/Footer/FooterComponent';

function CreatorLiveStreamEarnings() {
  const history = useHistory();
  useEffect(() => {
    const checkCreator = localStorage.getItem('is_creator');
    if (checkCreator === 'true') {
      history.push('/creator-live-stream-earnings');
    } else {
      history.push('/user-home');
    }
  }, []);
  return (
    <React.Fragment>
      <div id="wrapper" className="wrapper creator-home-wrapper position-fixed-custom">
        <CreatorHeader activeTab="My Earnings" />
        <div className="main-middle-area creator-main-middle-area">
          <div className="header-footer-with-min-height02">
            <div className="pattern-inner-div pattern-upricing-inner-div">
              <div className="relative-index">
                <CreatorLiveStreamEarningComponent />
              </div>
            </div>
          </div>
        </div>
        <FooterComponent auth />
      </div>
    </React.Fragment>
  );
}

export default CreatorLiveStreamEarnings;
