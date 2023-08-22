import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/all.min.css';
import '../../assets/css/feather.min.css';
import "../../assets/css/footer.css";
import '../../assets/css/style.css';
import '../../assets/css/user/user-materials-style.css';
import UserHomeHeaderComponent from '../../components/Users/UserHomeHeaderComponent/UserHomeHeaderComponent';
import { useHistory } from 'react-router-dom';
import UserMaterialsComponent from '../../components/Users/UserMaterialsComponent/UserMaterialsComponent';
import FooterComponent from "../../components/Footer/FooterComponent";
import ExclusiveCoursePopUpMpdalComponent from '../../components/ExclusiveCoursePopUpMpdalComponent/ExclusiveCoursePopUpMpdalComponent';
// import { getUrl } from '../../network/url';
// import { get } from '../../network/requests';
// import { toast } from 'react-toastify';


function UserMaterials() {
  const history = useHistory();
  const sidebar = useSelector((state) => state.AddDetails.visible);

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
              // setisPlanPurchased(true);
  //           }
  //           break;
  //         case 400:
  //           // if (userCreatorData.flag_login) {
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

  const [isModalActive, setisModalActive] = useState(false);

  const handleCoursePurchaseModalClose = () => {
    setisModalActive(false);
  }

  return (
    <React.Fragment>
      <div id="wrapper" className={sidebar ? "wrapper home-wrapper position-fixed-custom" : "wrapper home-wrapper"}>
        <UserHomeHeaderComponent
          activeTab="Materials"
          headerClass="header-div header-div2 clearfix"
        />
        <div className="main-middle-area user-main-middle-area main-bg-color">
          <div className="header-footer-with-min-height02">
            <div className="pattern-inner-div pattern-upricing-inner-div">
              <section className="materials-list-section" id="materials-list-section">
                <UserMaterialsComponent  
                // isHandleOpenModal={getUserPlans}
                />
              </section>
            </div>
          </div>
        </div>
        <FooterComponent />
      </div>
      {isModalActive ? <ExclusiveCoursePopUpMpdalComponent handleModalClose={handleCoursePurchaseModalClose} /> : ""}

    </React.Fragment>
  );
}

export default UserMaterials;
