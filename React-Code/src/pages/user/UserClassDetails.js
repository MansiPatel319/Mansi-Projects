import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/user/user-class-details-style.css';
import '../../assets/css/style.css';
import '../../assets/css/feather.min.css';
import '../../assets/css/owl-slider-style.css';
import '../../assets/css/user/user-single-course-style.css';
import '../../assets/css/tab-style.css';
import '../../assets/css/footer.css';
import Header from '../../components/Header/HeaderComponent';
import { get } from '../../network/requests';
import { getUrl } from '../../network/url';
import { tokenExpire } from '../../services/auth';
import { isAuthenticated } from '../../services/auth';
import UserClassDetailsComponent from '../../components/Users/UserClassDetailsComponent/UserClassDetailsComponent';
import UserHomeHeaderComponent from '../../components/Users/UserHomeHeaderComponent/UserHomeHeaderComponent';
import { useHistory, useLocation } from 'react-router-dom';

function UserClassDetails() {
  const sidebar = useSelector((state) => state.AddDetails.visible);
  const history = useHistory();

  let location = useLocation();
  const userPixelPageviedata = () => {
    const url = getUrl('PageView');
    var geturl = `${url}?eventName=ViewContent&eventUrl=${location.pathname}`;
    return get(geturl, true)
      .then((response) => {
        const {
          data: { code },
        } = response;
        switch (code) {
          case 201:
            break;
          case 400:
            break;
          default:
        }
      })
      .catch((error) => {
        tokenExpire(error.response, history);
      });
  };
  useEffect(() => {
    userPixelPageviedata();
  }, [location.pathname]);

  useEffect(() => {
    const checkCreator = localStorage.getItem('is_creator');
    if (checkCreator === 'true') {
      history.push('/creator-home');
    }
    // else {
    //   if (isAuthenticated()) {
    //     history.push(`/user-class-details/${params.id}`);
    //   }
    //   else {
    //     history.push(`/user/login`);
    //   }
    // }
  }, []);
  return (
    <div
      id="wrapper"
      className={sidebar ? 'wrapper home-wrapper position-fixed-custom' : 'wrapper home-wrapper'}
    >
      {isAuthenticated() ? (
        <UserHomeHeaderComponent
          activeTab="Classes"
          headerClass="header-div header-div2 clearfix"
        />
      ) : (
        <Header headerLoginClass="nav-link login-in-btn login-color2" />
      )}
      <div className="main-middle-area user-main-middle-area main-bg-color">
        <div className="header-footer-with-min-height01">
          <UserClassDetailsComponent />
        </div>
      </div>
    </div>
  );
}

export default UserClassDetails;
