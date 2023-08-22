import React, { useEffect } from 'react';
import '../assets/css/bootstrap.min.css';
import '../assets/css/home-style.css';
import MainComponent from '../components/Main/MainComponent';
import Header from '../components/Header/HeaderComponent';
import Footer from '../components/Footer/FooterComponent';
import UserHomeHeaderComponent from '../components/Users/UserHomeHeaderComponent/UserHomeHeaderComponent';
import { isAuthenticated } from '../services/auth';
import { useHistory } from 'react-router-dom';

function Main() {
  const history = useHistory();
  useEffect(() => {
    const checkCreator = localStorage.getItem('is_creator');
    if (checkCreator === 'true') {
      history.push('/creator-home');
    } else {
      history.push('/');
    }
  }, []);
  return (
    <React.Fragment>
      <div id="wrapper" className="wrapper home-wrapper">
        {isAuthenticated() ? (
          <UserHomeHeaderComponent headerClass="header-div header-div2 clearfix" />
        ) : (
          <Header headerLoginClass="nav-link login-in-btn" />
        )}
        <MainComponent />
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default Main;
