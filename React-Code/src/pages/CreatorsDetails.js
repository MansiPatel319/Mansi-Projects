import React from "react";
import CreatorsDetailsComponent from "../components/CreatorsDetailsComponent/CreatorsDetailsComponent";
import Header from "../components/Header/HeaderComponent";
import Footer from "../components/Footer/FooterComponent";
const CreatorsDetails = () => {
  return (
    <React.Fragment>
      <div id="wrapper" className="wrapper home-wrapper position-fixed-custom">
        <Header headerLoginClass="nav-link login-in-btn" />
        <CreatorsDetailsComponent />
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default CreatorsDetails;
