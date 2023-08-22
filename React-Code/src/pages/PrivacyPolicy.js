import React from 'react';
import { useSelector } from 'react-redux';
import FooterComponent from "../components/Footer/FooterComponent";
import '../assets/css/general-content-style.css';
import "../assets/css/creator/creator-popup-style.css";
import '../assets/css/style.css';
import '../assets/fonts/gilroy/gilroy-style.css';
import '../assets/fonts/moderat/moderat-style.css';
import '../assets/css/all.min.css';
import '../assets/css/feather.min.css';
import Header from "../components/Header/HeaderComponent";
import PrivacyPolicyComponent from '../components/PrivacyPolicy/PrivacyPolicyComponent';


function PrivacyPolicy() {
    const sidebar = useSelector((state) => state.AddDetails.visible);
    
    return (
        <React.Fragment>
            <div id="wrapper" className={sidebar ? "wrapper creator-home-wrapper position-fixed-custom" : "wrapper creator-home-wrapper"}>
            <Header headerLoginClass="nav-link login-in-btn" />
                {/* <UserHomeHeaderComponent headerClass="header-div header-div2 clearfix" activeTab="My Purchase" /> */}
                <div className="main-middle-area creator-main-middle-area main-bg-color">
                    <div className="header-footer-with-min-height01">
                      <PrivacyPolicyComponent />
                           
                    </div>
                </div>
                <FooterComponent />
            </div>
        </React.Fragment>
    )
}

export default PrivacyPolicy;
