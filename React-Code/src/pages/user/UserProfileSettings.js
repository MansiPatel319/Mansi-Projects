/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/all.min.css';
import '../../assets/css/feather.min.css';
import '../../assets/css/tab-style.css';
import '../../assets/css/custom-forms-style.css';
import '../../assets/css/user/user-profile-settings-style.css';
import '../../assets/css/style.css';
import "../../assets/css/user/general-card-style.css";
import UserHomeHeaderComponent from '../../components/Users/UserHomeHeaderComponent/UserHomeHeaderComponent';
import UserProfileSettingsComponent from '../../components/Users/UserProfileSettingsComponent/UserProfileSettingsComponent';
import { useHistory } from 'react-router-dom';
import FooterComponent from "../../components/Footer/FooterComponent";


function UserProfileSettings() {
  const history = useHistory();
  const [showBackDrop, setShowBackDrop] = useState(false)
  const sidebar = useSelector((state) => state.AddDetails.visible);
  useEffect(() => {
    const checkCreator = localStorage.getItem('is_creator');
    if (checkCreator === 'true') {
      history.push('/creator-home');
    } else {
      history.push('/user-profile-setting');
    }
  }, []);
  const handleBackDrop = (val) => {
    setShowBackDrop(val)
  }
  return (
    <React.Fragment>
      {/* {showBackDrop &&  <div className="modal-backdrop fade show"></div>} */}
      <div id="wrapper" className={sidebar ? "wrapper home-wrapper position-fixed-custom" : "wrapper home-wrapper "}>
        <UserHomeHeaderComponent headerClass="header-div header-div2 clearfix" />

        <UserProfileSettingsComponent handleBackDrop={handleBackDrop} />

        <FooterComponent />
      </div>
    </React.Fragment>
  );
}

export default UserProfileSettings;
