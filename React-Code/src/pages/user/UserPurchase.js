import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FooterComponent from "../../components/Footer/FooterComponent";
import UserHomeHeaderComponent from '../../components/Users/UserHomeHeaderComponent/UserHomeHeaderComponent';
import UserPurchaseComponent from "../../components/Users/UserPurchaseComponent/UserPurchaseComponent";
import '../../assets/css/creator/creator-home-style.css';
import "../../assets/css/creator/creator-popup-style.css";
import '../../assets/css/tab-style.css';
import '../../assets/css/style.css';
import '../../assets/fonts/gilroy/gilroy-style.css';
import '../../assets/fonts/moderat/moderat-style.css';
import '../../assets/css/all.min.css';
import '../../assets/css/feather.min.css';
import ExclusiveCoursePopUpMpdalComponent from '../../components/ExclusiveCoursePopUpMpdalComponent/ExclusiveCoursePopUpMpdalComponent';
import { toast } from 'react-toastify';
import { get } from '../../network/requests';
import { getUrl } from '../../network/url';

function UserPurchase() {
  const history = useHistory();
  const sidebar = useSelector((state) => state.AddDetails.visible);

  useEffect(() => {
    const checkCreator = localStorage.getItem('is_creator');
    if (checkCreator === 'true') {
      history.push('/creator-home');
    } else {
      getUserPlans();
    }
  }, []);

  const getUserPlans = () => {
    const url = getUrl('user-plan');
    get(url, true)
      .then((response) => {
        const {
          data: { code, status, message },
        } = response;
        switch (code) {
          case 200:
            if (status === true) {
              // setisPlanPurchased(true);
            }
            break;
          case 400:
       
            break;
          default:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
        }
      })
      .catch(() => {
        // toast.error('Something went wrong', {
        //   pauseOnHover: false,
        //   position: toast.POSITION.TOP_RIGHT,
        // });
      });
  };

  const [isModalActive, setisModalActive] = useState(false);

  const handleCoursePurchaseModalClose = () => {
    setisModalActive(false);
  }

  return (
    <React.Fragment>
      <div id="wrapper" className={sidebar ? "wrapper creator-home-wrapper position-fixed-custom" : "wrapper creator-home-wrapper"}>
        <UserHomeHeaderComponent headerClass="header-div header-div2 clearfix" activeTab="My Purchase" />
        <div className="main-middle-area creator-main-middle-area main-bg-color">
          <div className="header-footer-with-min-height02">
            <div className="pattern-inner-div pattern-upricing-inner-div">
              <div className="relative-index">
                <UserPurchaseComponent />
              </div>
            </div>
          </div>
        </div>
        <FooterComponent />
      </div>
      {isModalActive ? <ExclusiveCoursePopUpMpdalComponent handleModalClose={handleCoursePurchaseModalClose} /> : ""}
    </React.Fragment>
  )
}

export default UserPurchase;
