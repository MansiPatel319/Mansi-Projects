import React, { useEffect } from 'react';
import CreatorHeader from '../../components/Header/CreatorHeader';
import CreatorProfileSettingComponent from '../../components/Creator/CreatorProfileSettingComponent/CreatorProfileSettingComponent';
import { useHistory } from 'react-router-dom';
import FooterComponent from '../../components/Footer/FooterComponent';

function CreatorProfileSettings() {
  const history = useHistory();
  useEffect(() => {
    const checkCreator = localStorage.getItem('is_creator');
    if (checkCreator === 'true') {
      history.push('/creator-profile-setting');
    } else {
      history.push('/user-home');
    }
  }, []);
  return (
    <div id="wrapper" className="wrapper creator-home-wrapper position-fixed-custom">
      <CreatorHeader />
      <CreatorProfileSettingComponent />
      <FooterComponent auth />
    </div>
  );
}

export default CreatorProfileSettings;
