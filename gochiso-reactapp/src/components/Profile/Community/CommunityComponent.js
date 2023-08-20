/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { get } from '../../../network/requests';
import { getUrl } from '../../../network/urls';
import Loader from '../../../UI/Loader/Loader';
import CommunityActionsComponent from './CommunityActionsComponent';
import CommunityContentComponent from './CommunityContentComponent';

toast.configure();

function CommunityComponent() {
  const lang = useSelector((state) => state.defaultLanguage.lang);
  const [communityData, setcommunityData] = useState(undefined);
  const [isLoading, setisLoading] = useState(false);

  const getProfileCommunityData = () => {
    setisLoading(true);
    const url = getUrl('profile-community');
    return get(`${url}?lang=${lang}`, false)
      .then((response) => {
        const {
          data: { messages, data, status, code },
        } = response;
        setisLoading(false);
        switch (code) {
          case 200:
            if (status === 'true') {
              setcommunityData(data);
            }
            break;
          case 400:
            toast.error(messages, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
            break;
          default:
            toast.error(
              lang === 'en'
                ? process.env.REACT_APP_DEFAULT_ERROR_MESSAGE_EN
                : process.env.REACT_APP_DEFAULT_ERROR_MESSAGE_JP,
              {
                pauseOnHover: false,
                position: toast.POSITION.TOP_RIGHT,
              },
            );
        }
      })
      .catch((error) => {
        setisLoading(false);
        const { message } = error;
        toast.error(message, {
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  useEffect(() => {
    getProfileCommunityData();
  }, [lang]);

  return (
    <>
      {isLoading && <Loader />}
      {communityData && (
        <div className="profile-right-div col-lg-9 col-md-8 plr-10">
          <div className="profile-card-root">
            <CommunityContentComponent communityData={communityData} />
            <CommunityActionsComponent />
          </div>
        </div>
      )}
    </>
  );
}

export default CommunityComponent;
