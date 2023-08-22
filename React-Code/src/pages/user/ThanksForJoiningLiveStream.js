import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/all.min.css';
import '../../assets/css/feather.min.css';
import '../../assets/css/user/thanks-for-joining-live-stream.css';
import '../../assets/css/style.css';
import '../../assets/css/range-slider/rangeslider.min.css';
import '../../assets/css/range-slider/range-custom-style.css';
import UserHomeHeaderComponent from '../../components/Users/UserHomeHeaderComponent/UserHomeHeaderComponent';
import FooterComponent from '../../components/Footer/FooterComponent';
import ThanksForJoiningLiveStreamComponent from '../../components/Users/ThanksForJoiningLiveStreamComponent/ThanksForJoiningLiveStreamComponent';
import { useHistory, useParams } from 'react-router-dom';

function ThanksForJoiningLiveStream() {
  const history = useHistory();
  const sidebar = useSelector((state) => state.AddDetails.visible);
  const params = useParams();
  useEffect(() => {
    const checkCreator = localStorage.getItem('is_creator');
    if (checkCreator === 'true') {
      history.push('/creator-home');
    } else {
      history.push(`/thanks-for-joining-live-stream/${params.id}`);
    }
  }, []);
  return (
    <div
      id="wrapper"
      className={sidebar ? 'wrapper home-wrapper position-fixed-custom' : 'wrapper home-wrapper'}
    >
      <UserHomeHeaderComponent activeTab="Home" headerClass="header-div header-div2 clearfix" />
      <div className="main-middle-area user-main-middle-area main-bg-color">
        <div className="header-footer-with-min-height02">
          <div className="pattern-inner-div pattern-upricing-inner-div mxh-100">
            <section className="thanks-joining-ls-section" id="thanks-joining-ls-section">
              <ThanksForJoiningLiveStreamComponent />
            </section>
          </div>
        </div>
      </div>
      <FooterComponent auth />
    </div>
  );
}

export default ThanksForJoiningLiveStream;
