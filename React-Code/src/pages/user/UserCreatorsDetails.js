import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/all.min.css';
import '../../assets/css/feather.min.css';
import '../../assets/css/custom-forms-style.css';
import '../../assets/css/creators-details-style.css';
import '../../assets/css/user/user-instructor-profile-style.css';
import '../../assets/css/style.css';
// import '../../assets/fonts/gilroy/gilroy-style.css';
import "../../assets/css/user/user-home-style.css";
// import '../../assets/fonts/moderat/moderat-style.css';
import UserHomeHeaderComponent from '../../components/Users/UserHomeHeaderComponent/UserHomeHeaderComponent';
import CreatorsDetailsComponent from '../../components/CreatorsDetailsComponent/CreatorsDetailsComponent';
import Loader from "../../components/UI/Loader/Loader";
import Header from "../../components/Header/HeaderComponent";
import { isAuthenticated } from "../../services/auth";
import { useHistory } from 'react-router-dom';
import FooterComponent from '../../components/Footer/FooterComponent';

function UserCreatorsDetails() {
  const history = useHistory();

  const sidebar = useSelector((state) => state.AddDetails.visible);

  useEffect(() => {
    const checkCreator = localStorage.getItem('is_creator');
    if (checkCreator === 'true') {
      history.push('/creator-home');    }
  
  }, []);
  const [isLoading, setisLoading] = useState(false);

  const handleLoader = (isDataLoading) => {
    setisLoading(isDataLoading);
  }
  return (
    <div id="wrapper" className={sidebar ? "wrapper home-wrapper position-fixed-custom" : "wrapper home-wrapper"}>
      {isAuthenticated() ? <UserHomeHeaderComponent activeTab="Instructors" headerClass="header-div header-div2 clearfix" /> : <Header headerLoginClass="nav-link login-in-btn" />}
      <div className="main-middle-area user-main-middle-area main-bg-color">
        {isLoading && <Loader />}
        <div className="pattern-inner-div instroctor-patter-root-cc">
          <CreatorsDetailsComponent handleLoader={handleLoader} />
        </div>
      </div>
      { isAuthenticated() ? <FooterComponent auth /> : <FooterComponent />}
    </div>
  );
}

export default UserCreatorsDetails;
