/* eslint-disable react/jsx-fragments */
import React from 'react';
import CommunityComponent from '../components/Profile/Community/CommunityComponent';
import ProfileComponent from '../components/Profile/ProfileComponent';
import '../assets/css/profile-style.css';

function ProfileCommunity() {
  return (
    <React.Fragment>
      <div id="wrapper" className="wrapper shop-wrapper w-100">
        <ProfileComponent mainContentComponent={<CommunityComponent />} />
      </div>
    </React.Fragment>
  );
}

export default ProfileCommunity;
