import React, { useEffect } from 'react';
import CreatorHeader from '../../components/Header/CreatorHeader';
import CreatorAddClassesComponent from '../../components/Creator/CreatorAddClassesComponent/CreatorAddClassesComponent';
import { useHistory, useParams } from 'react-router-dom';

function CreatorAddAClass() {
  const params = useParams();
  const history = useHistory();
  useEffect(() => {
    const checkCreator = localStorage.getItem('is_creator');
    if (checkCreator === 'true') {
      if (params.id !== " " && params.id !== undefined) {
        history.push(`/creator-add-a-class/edit/${params.id}`);
      }
      else {
        history.push('/creator-add-a-class');
      }
    } else {
      history.push('/user-home');
    }
  }, []);
  return (
    <div className="wrapper creator-home-wrapper position-fixed-custom">
      <CreatorHeader activeTab="Home" />
      <CreatorAddClassesComponent />
    </div>
  );
}

export default CreatorAddAClass;
