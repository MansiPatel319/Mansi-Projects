import React, { useEffect } from 'react';
import CreatorHeader from '../../components/Header/CreatorHeader';
import CreatorMyUploadsComponent from '../../components/Creator/CreatorMyUploadsComponent/CreatorMyUploadsComponent';
import { useHistory } from 'react-router-dom';
import FooterComponent from '../../components/Footer/FooterComponent';

function CreatorMyUploads() {
  const history = useHistory();
  useEffect(() => {
    const checkCreator = localStorage.getItem('is_creator');
    if (checkCreator === 'true') {
      history.push('/creator-my-uploads/classes');
    } else {
      history.push('/user-home');
    }
  }, []);
  return (
    <div id="wrapper" className="wrapper creator-home-wrapper position-fixed-custom">
      <CreatorHeader activeTab="My Uploads" />
      <CreatorMyUploadsComponent />
      <FooterComponent auth/>
    </div>
  );
}

export default CreatorMyUploads;
