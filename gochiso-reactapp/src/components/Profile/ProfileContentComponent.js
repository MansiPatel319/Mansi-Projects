/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable operator-linebreak */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-else-return */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { get, post } from '../../network/requests';
import { getUrl } from '../../network/urls';
import getLangValue from '../../resources/language';
import strings from '../../resources/strings';
import ProfileAboutComponent from './ProfileAboutComponent';
import ProfileInfoComponent from './ProfileInfoComponent';
import ProfileShopTabsComponent from './ProfileShopTabsComponent';
import Loader from '../../UI/Loader/Loader';
import { tokenExpire } from '../../services/Auth';
import setUserProfile from '../../actions/setUserData';

toast.configure();

function ProfileStatistics(props) {
  return (
    <div className="col-lg-4 col-md-6 plr-8">
      <div className="pro-color-card-bx-div">
        <div className="pro-color-card-bx-inner">
          <p>{props.dataTitle}</p>
          <h3>{props.dataValue}</h3>
        </div>
      </div>
    </div>
  );
}

function ProfileContentComponent() {
  const token = localStorage.getItem('token');
  const history = useHistory();
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.defaultLanguage.lang);
  const profileData = useSelector((state) => state.user.profileData);
  const [profileStatisticsData, setprofileStatisticsData] = useState(undefined);
  const [visitedRestaurantsData, setvisitedRestaurantsData] =
    useState(undefined);
  const [recommendedShopsData, setrecommendedShopsData] = useState(undefined);
  const [isLoading, setisLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  const getProfilePageData = () => {
    setisLoading(true);
    const url = getUrl('profile-my-page');
    return get(`${url}?lang=${lang}&api_token=${token}`, false)
      .then((response) => {
        const {
          data: { messages, data, status, code },
        } = response;
        setisLoading(false);
        switch (code) {
          case 200:
            if (status === 'true') {
              dispatch(setUserProfile(data));
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

  const getProfilePageStatisticsData = (flag) => {
    setisLoading(true);
    const url = getUrl('profile-my-page-statistics');
    return get(`${url}?lang=${lang}&api_token=${token}&page=${pageNum}`, false)
      .then((response) => {
        const {
          data: { messages, data, status, code },
        } = response;
        setisLoading(false);
        switch (code) {
          case 200:
            if (status === 'true') {
              setprofileStatisticsData(data);
              // setrecommendedShopsData(data.reviews.data);
              if (recommendedShopsData !== undefined && flag) {
                const arr = [...recommendedShopsData];
                data.reviews.data.map((obj) => arr.push(obj));
                setrecommendedShopsData(arr);
              } else {
                setrecommendedShopsData(data.reviews.data);
              }
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

  const getVisitedRestaurantsData = () => {
    setisLoading(true);

    const url = getUrl('profile-visited-restaurants');
    return get(`${url}?lang=${lang}&api_token=${token}`, false)
      .then((response) => {
        const {
          data: { messages, data, status, code },
        } = response;
        setisLoading(false);

        switch (code) {
          case 200:
            if (status === 'true') {
              setvisitedRestaurantsData(data.restaurants.data);
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
  const updateProfilePicture = (profileImage) => {
    const ProfileData = {
      base64_image: profileImage,
    };
    setisLoading(true);
    const url = getUrl('update-profile');
    post(`${url}?api_token=${token}`, ProfileData, false)
      .then((response) => {
        const {
          data: { messages, status, code },
        } = response;
        setisLoading(false);
        switch (code) {
          case 200:
            if (status === 'true') {
              toast.success(messages, {
                pauseOnHover: false,
                position: toast.POSITION.TOP_RIGHT,
              });
              getProfilePageData();
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
        tokenExpire(error.response, history);
        setisLoading(false);
      });
  };

  const onLoadMore = () => {
    setPageNum(pageNum + 1);
  };

  useEffect(() => {
    getProfilePageData();
    getVisitedRestaurantsData();
  }, [lang]);

  useEffect(() => {
    getProfilePageStatisticsData(1);
  }, [lang, pageNum]);

  return (
    <>
      {isLoading && <Loader />}
      <div className="profile-right-div col-lg-9 col-md-8 plr-10">
        {profileData && (
          <div className="profile-card-root">
            <ProfileInfoComponent
              profileData={profileData}
              updateProfilePicture={updateProfilePicture}
            />
            {profileStatisticsData && (
              <div className="pro-color-card-root">
                <div className="row mlr-8">
                  <ProfileStatistics
                    dataTitle={getLangValue(
                      strings.ACTIONS_FOR_SUSTAINABILITY,
                      lang,
                    )}
                    dataValue={profileStatisticsData.actions_for_sustainability}
                  />

                  <ProfileStatistics
                    dataTitle={getLangValue(strings.VISITED, lang)}
                    dataValue={profileStatisticsData.user.visited_restaurant}
                  />

                  <ProfileStatistics
                    dataTitle={getLangValue(strings.RECOMMENDATIONS, lang)}
                    dataValue={profileStatisticsData.user.total_reviews}
                  />
                </div>
              </div>
            )}
            <ProfileAboutComponent profileData={profileData} />
            <ProfileShopTabsComponent
              visitedRestaurantsData={visitedRestaurantsData}
              recommendedShopsData={recommendedShopsData}
              nextRecommendedShopData={onLoadMore}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileContentComponent;
