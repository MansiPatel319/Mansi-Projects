import React, { useEffect } from 'react';
import CreatorHeader from '../../components/Header/CreatorHeader';
import CreatorScheduleStreamComponent from '../../components/Creator/CreatorScheduleStreamComponent/CreatorScheduleStreamComponent';
import { useHistory, useParams } from 'react-router-dom';

const CreatorScheduleStream = () => {
  const params = useParams();
  const history = useHistory();
  useEffect(() => {
    const checkCreator = localStorage.getItem('is_creator');
    if (checkCreator === 'true') {
      if (params.id !== " " && params.id !== undefined) {
        history.push(`/creator-schedule-stream/edit/${params.id}`);
      }
      else {
        history.push('/creator-schedule-stream');
      }
    } else {
      history.push('/user-home');
    }
  }, []);
  return (
    <div className="wrapper creator-home-wrapper position-fixed-custom">
      <CreatorHeader activeTab="Home" />
      <CreatorScheduleStreamComponent />
    </div>
  );
};

export default CreatorScheduleStream;
