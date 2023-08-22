import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/all.min.css';
import '../../assets/css/feather.min.css';
import '../../assets/css/user/user-creators-style.css';
import '../../assets/css/style.css';
import UserHomeHeaderComponent from '../../components/Users/UserHomeHeaderComponent/UserHomeHeaderComponent';
import UserCreatorsListComponent from '../../components/Users/UserCreatorsListComponent/UserCreatorsListComponent';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer/FooterComponent';
import ExclusiveCoursePopUpMpdalComponent from '../../components/ExclusiveCoursePopUpMpdalComponent/ExclusiveCoursePopUpMpdalComponent';
// import { getUrl } from '../../network/url';
// import { get } from '../../network/requests';
// import { toast } from 'react-toastify';

function UserCreators() {
  const history = useHistory();
  const sidebar = useSelector((state) => state.AddDetails.visible);
  const [isModalActive, setisModalActive] = useState(false);


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
  //             // setisPlanPurchased(true);
  //           }
  //           break;
  //         case 400:
  //           setisModalActive(true);
  //           // }
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
  // };

 

  const handleCoursePurchaseModalClose = () => {
    setisModalActive(false);
  }

  return (
    <div id="wrapper" className={sidebar ? "wrapper home-wrapper position-fixed-custom" : "wrapper home-wrapper"}>
      <UserHomeHeaderComponent activeTab="Instructors" headerClass="header-div header-div2 clearfix" />
      <div className="main-middle-area user-main-middle-area main-bg-color">
        <div className="header-footer-with-min-height02">
          <div className="pattern-inner-div ">
            <section className="our-card-classes-section search-feed-card-classes-section user-all-instructors-section">
              <UserCreatorsListComponent  />
            </section>
          </div>
        </div>
      </div>
      <Footer auth />
      {isModalActive ? <ExclusiveCoursePopUpMpdalComponent handleModalClose={handleCoursePurchaseModalClose} /> : ""}

    </div>
  );
}

export default UserCreators;
