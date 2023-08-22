import React, { useEffect } from 'react';
import CreatorHomeComponent from '../../components/Creator/CreatorHomeComponent/CreatorHomeComponent';
import CreatorHeader from '../../components/Header/CreatorHeader';
import { useHistory } from 'react-router-dom';
import FooterComponent from '../../components/Footer/FooterComponent';
function CreatorHome() {
  const history = useHistory();
  useEffect(() => {
    const checkCreator = localStorage.getItem('is_creator');
    if (checkCreator === 'true') {
      history.push('/creator-home');
    } else {
      history.push('/user-home');
    }
  }, []);
  return (
    <React.Fragment>
      <div id="wrapper" className="wrapper creator-home-wrapper position-fixed-custom">
        <CreatorHeader activeTab="Home" />

        <CreatorHomeComponent />

        <FooterComponent auth />
      </div>
    </React.Fragment>
  );
}

export default CreatorHome;
