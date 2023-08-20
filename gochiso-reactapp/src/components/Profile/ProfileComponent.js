/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import HeaderComponent from '../Header/HeaderComponent';
import ProfileMiddleComponent from './ProfileMiddleComponent';

function ProfileComponent(props) {
  return (
    <>
      <HeaderComponent withSearch />
      <ProfileMiddleComponent {...props} />
    </>
  );
}

export default ProfileComponent;
