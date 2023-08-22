import React from "react";
import Header from "../components/Header/HeaderComponent";
import Footer from "../components/Footer/FooterComponent";
import CreatorDetailComponent from "../components/CreatorDetailComponent/CreatorDetailComponent";
const CreatorDetail = () => {
  return (
    <React.Fragment>
      <div id="wrapper" className="wrapper home-wrapper position-fixed-custom">
        <Header headerLoginClass="nav-link login-in-btn" />
        <CreatorDetailComponent />
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default CreatorDetail;
