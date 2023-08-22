import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/all.min.css';
import '../../assets/css/feather.min.css';
import '../../assets/css/user/user-classes-style.css';
import '../../assets/css/style.css';
// import { get } from "../../network/requests";
// import { getUrl } from "../../network/url";
import UserHomeHeaderComponent from '../../components/Users/UserHomeHeaderComponent/UserHomeHeaderComponent';
import UserClassesComponent from '../../components/Users/UserClassesComponent/UserClassesComponent';
import { useHistory } from 'react-router-dom';
import FooterComponent from "../../components/Footer/FooterComponent";
// import { toast } from 'react-toastify';
import ExclusiveCoursePopUpMpdalComponent from "../../components/ExclusiveCoursePopUpMpdalComponent/ExclusiveCoursePopUpMpdalComponent";




function UserClasses() {
  const sidebar = useSelector((state) => state.AddDetails.visible);
  const history = useHistory();
 
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
  //           // if (userCreatorData.flag_login) {
  //           setisModalActive(false);
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
  //   // setisModalActive(true);
  // };

  const [isModalActive, setisModalActive] = useState(false);

  const handleCoursePurchaseModalClose = () => {
    setisModalActive(false);
  }

  return (
    <div id="wrapper" className={sidebar ? "wrapper home-wrapper position-fixed-custom" : "wrapper home-wrapper"}>
      <UserHomeHeaderComponent activeTab="Classes" headerClass="header-div header-div2 clearfix" />
      <div className="main-middle-area user-main-middle-area pt-custom-0">
        <div className="pattern-inner-div">
          <UserClassesComponent />
        </div>
      </div>
      <FooterComponent />
      {isModalActive ? <ExclusiveCoursePopUpMpdalComponent handleModalClose={handleCoursePurchaseModalClose} /> : ""}
    </div>
  );
}

export default UserClasses;
