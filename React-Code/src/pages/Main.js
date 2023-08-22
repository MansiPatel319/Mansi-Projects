import React, { useEffect } from 'react';
import MainComponent from '../components/Main/MainComponent';
import "../assets/css/feather.min.css";
import '../assets/css/footer.css';
import '../assets/css/home-style.css';
import '../assets/css/bootstrap.min.css';
import "../assets/css/header.css";
import '../assets/css/custom.css';
import '../assets/css/style.css';
import '../assets/css/all.min.css';
import "../assets/css/modal-style.css";
import "../assets/css/user/user-upcomming-live-streams-style.css";
import HeaderComponent from '../components/Header/HeaderComponent';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';
import UserHomeHeaderComponent from '../components/Users/UserHomeHeaderComponent/UserHomeHeaderComponent';
import FooterComponent from '../components/Footer/FooterComponent';
import OurNewPricingPlanComponent from '../components/Main/OurNewPricingPlanComponent';
import CreatorCarrerSection from '../components/Main/CreatorCarrerSection';
const Main = () => {
  const history = useHistory();
  const sidebar = useSelector((state) => state.AddDetails.visible);
  useEffect(() => {
    const checkCreator = localStorage.getItem('is_creator');
    if (checkCreator === 'true') {
      history.push('/creator-home');
    }
  }, []);

  return (
    <div
    id="wrapper"
    className={
      sidebar
      ? 'wrapper home-wrapper main-bg-color position-fixed-custom'
      : 'wrapper home-wrapper main-bg-color'
    }
    >
      {isAuthenticated() ? (
        <UserHomeHeaderComponent headerClass="header-div header-div2 clearfix" />
      ) : (
        <HeaderComponent headerLoginClass="nav-link login-in-btn" />
      )}
      <MainComponent />
      <OurNewPricingPlanComponent />
      <CreatorCarrerSection />
      <FooterComponent />
    </div>
  );
};

export default Main;
