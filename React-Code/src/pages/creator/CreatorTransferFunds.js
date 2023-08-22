import React, { useEffect } from 'react';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/all.min.css';
import '../../assets/css/feather.min.css';
import '../../assets/css/creator/creator-transfer-funds-style.css';
import '../../assets/css/creator/creator-popup-style.css';
import '../../assets/css/style.css';
import '../../assets/css/creator/affiliate.css';
import '../../assets/css/select2-custom.css';
import '../../assets/css/select-custom.css';
import '../../assets/css/select2.min.css';
import '../../assets/css/tab-style.css';
import '../../assets/css/creator/creator-popup-style.css';
import CreatorHeader from '../../components/Header/CreatorHeader';
import TransferFundComponent from '../../components/Creator/TransferFundComponent/TransferFundComponent';
import { useHistory } from 'react-router-dom';
import FooterComponent from '../../components/Footer/FooterComponent';

function CreatorTransferFunds() {
  const history = useHistory();
  useEffect(() => {
    const checkCreator = localStorage.getItem('is_creator');
    if (checkCreator === 'true') {
      history.push('/creator-transfer-funds');
    } else {
      history.push('/user-home');
    }
  }, []);
  return (
    <React.Fragment>
      <div id="wrapper" className="wrapper creator-home-wrapper position-fixed-custom">
        <CreatorHeader activeTab="Transfer funds" />
        <div className="main-middle-area creator-main-middle-area main-bg-color">
          <div className="header-footer-with-min-height02">
            <div className="pattern-inner-div pattern-upricing-inner-div">
              <div className="relative-index">
                <TransferFundComponent />
              </div>
            </div>
          </div>
        </div>
        <FooterComponent auth/>
      </div>
    </React.Fragment>
  );
}

export default CreatorTransferFunds;
