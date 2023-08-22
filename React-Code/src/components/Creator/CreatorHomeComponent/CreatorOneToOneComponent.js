/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUrl } from '../../../network/url';
import { get } from '../../../network/requests';
import Loader from '../../UI/Loader/Loader';
import { tokenExpire } from '../../../services/auth';
import { useHistory } from 'react-router-dom';
import noImgData from '../../../assets/images/no-post-imge.png';
import sessionImg from '../../../assets/images/latest/oto-image.png';

toast.configure();
function CreatorOneToOneComponent({ handleOpenSeatholderDetailsModal }) {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [listOfAllBookSessions, setListOfAllBookSessions] = useState('');
  const [creatorProfileDetails, setCreatorProfileDetails] = useState('');

  const getAllCreatorStream = () => {
    setIsLoading(true);
    const url = getUrl('get_all_creator_session-seat-holder');
    get(`${url}`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        setIsLoading(false);
        switch (code) {
          case 200:
            if (status === true) {
              setListOfAllBookSessions(data);
            }
            break;
          case 400:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
            break;
          default:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        tokenExpire(error.response, history);
      });
  };
  const getProfileDetails = () => {
    setIsLoading(true);
    const url = getUrl('creator_profile');
    get(url, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        setIsLoading(false);
        switch (code) {
          case 200:
            if (status === true) {
              setCreatorProfileDetails(data);
            }
            break;
          case 400:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
            break;
          default:
            toast.error(message, {
              pauseOnHover: false,
              position: toast.POSITION.TOP_RIGHT,
            });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        tokenExpire(error.response, history);
      });
  };
  useEffect(() => {
    getAllCreatorStream();
    getProfileDetails();
  }, []);

  const handleShareLiveStream = (address) => {
    navigator.clipboard.writeText(`https://ccmike.creatorclasses.co${address}`);
    toast.success('Successfully copied share link to the clipboard', {
      pauseOnHover: false,
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <React.Fragment>
      {isLoading && <Loader />}

      <div className="tab-pane-inner">
        <div className="general-list-common-div">
          <div className="general-list-panel-div">
            <div className="row mlr-8">
              {listOfAllBookSessions.length > 0 ? (
                creatorProfileDetails &&
                listOfAllBookSessions.map((data) => {
                  const date = data?.booked_time_slot.replace('Z', '');
                  return (
                    <div className="col-lg-6 col-md-6" key={data.id}>
                      <div className="general-common-cre-box">
                        <div className="general-common-cre-row">
                          <div className="general-video-img-cre-thumb w-100">
                            <div className="img-thumb w-100">
                              {' '}
                              <img
                                src={sessionImg}
                                className="img-fluid img-responsive"
                                alt="image"
                              />{' '}
                            </div>
                          </div>

                          <div className="general-content-cre-div">
                            <div className="general-cre-content-row">
                              <div className="general-cre-content-top-row">
                                <div className="time-row">
                                  <div className="time-box">
                                    <div className="time-box-rounded">
                                      <span className="icon-span">
                                        <i className="bg-custom-icon calendar-time-icon-new"></i>
                                      </span>
                                      <span className="text">
                                        {' '}
                                        {moment(date).format('MMM DD, hh:mm A')}
                                        {` ${data.tz_value !== null ? data.tz_value : ''}`}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <p>{data.description}</p>

                                <div className="link-div">
                                  <div className="link-img-div">
                                    <div className="img-div">
                                      <img
                                        src={
                                          data.user.profile_image === undefined ||
                                          data.user.profile_image ===
                                            'https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg'
                                            ? noImgData
                                            : data.user.profile_image
                                        }
                                        className="img-fluid "
                                        alt="image"
                                      />
                                    </div>
                                    <div className="text-div">
                                      <Link
                                        to="#"
                                        className="link link-color"
                                        style={{ cursor: 'auto', textDecoration: 'none' }}
                                      >
                                        {data.user.username}
                                      </Link>
                                    </div>
                                  </div>
                                </div>

                                <div className="general-btn-div">
                                  <div className="general-btn-row">
                                    <Link
                                      to={`/creator-profile-setting`}
                                      className="btn btn-primary-outline btn-primary-color-02 mh-btn55 btn-edit flex-center-aj"
                                    >
                                      Edit
                                    </Link>
                                    <Link
                                      to="#"
                                      className="btn btn-primary-outline btn-primary-color-02 mh-btn55 btn-view flex-center-aj"
                                      onClick={(e) => handleOpenSeatholderDetailsModal(e, data)}
                                    >
                                      View
                                    </Link>
                                    <Link
                                      to={`/creator-chat/${data.time_slot_id}`}
                                      className="btn btn-common-primary btn-edit mt-4"
                                    >
                                      Join live session
                                    </Link>
                                    <Link
                                      to="#"
                                      className="btn btn-common-primary btn-edit mt-4"
                                      onClick={() =>
                                        handleShareLiveStream(`/creator-chat/${data.time_slot_id}`)
                                      }
                                    >
                                      Share live session
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="general-common-cre-box">
                  <div style={{ color: '#fff', fontSize: '18px' }}>
                    No one-to-one sessions booked
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CreatorOneToOneComponent;
