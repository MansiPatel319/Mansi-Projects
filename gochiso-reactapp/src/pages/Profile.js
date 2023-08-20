/* eslint-disable react/jsx-fragments */
import React from 'react';
import ProfileComponent from '../components/Profile/ProfileComponent';
import ProfileContentComponent from '../components/Profile/ProfileContentComponent';
import '../assets/css/profile-style.css';

function Profile() {
  return (
    <React.Fragment>
      <div id="wrapper" className="wrapper shop-wrapper w-100">
        <ProfileComponent mainContentComponent={<ProfileContentComponent />} />
      </div>
    </React.Fragment>
  );
}

export default Profile;
