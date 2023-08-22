/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUrl } from '../../../network/url';
import { get } from '../../../network/requests';
import moment from 'moment';

import Loader from '../../UI/Loader/Loader';
import { useHistory } from 'react-router-dom';
import { tokenExpire } from '../../../services/auth';
import { propTypes } from 'react-bootstrap/esm/Image';
toast.configure();
function CreatorGeneralComponent({ handleOpenSeatHolderModal, handleModal }) {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [listOfAllStream, setListOfAllStream] = useState('');
  const getAllCreatorStream = () => {
    setIsLoading(true);
    const url = getUrl('get_all_creator_my-streams');
    get(`${url}`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        setIsLoading(false);
        switch (code) {
          case 200:
            if (status === true) {
              setListOfAllStream(data);
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
            <div className="row">
              {listOfAllStream.length > 0 ? (
                listOfAllStream.map((data) => {
                  const date = data?.stream_datetime.replace('Z', '');

                  return (
                    <div className="col-lg-6 col-md-6" key={data.id}>
                      <div className="general-common-cre-box">
                        <div className="general-common-cre-row">
                          <div className="general-video-img-cre-thumb w-100">
                            <div className="img-thumb w-100">
                              {' '}
                              <img
                                src={data.thumbnail_file}
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
                                        {moment(date).format('MMM DD hh:mm A')}
                                        {` ${data.tz_value !== null ? data.tz_value : ''}`}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <p>{data.title}</p>
                                <div className="link-div">
                                  <Link
                                    to="#"
                                    className="link link-color"
                                    onClick={(e) => handleOpenSeatHolderModal(e, data.id)}
                                  >
                                    View seat holders list
                                  </Link>
                                </div>
                                <div className="general-btn-div">
                                  <div className="general-btn-row">
                                    <Link
                                      to={`/creator-schedule-stream/edit/${data.id}`}
                                      className="btn btn-primary-outline btn-primary-color-02 mh-btn55 btn-edit flex-center-aj"
                                    >
                                      Edit
                                    </Link>
                                    <Link
                                      to="#"
                                      className="btn btn-primary-outline btn-primary-color-02 mh-btn55 btn-view flex-center-aj"
                                      onClick={() => handleModal(data)}
                                    >
                                      View
                                    </Link>
                                    <Link
                                      to={`/creator-livestream-chat/${data.id}`}
                                      className="btn btn-common-black btn-view mt-5 btn-primary-color-02"
                                    >
                                      Join live class
                                    </Link>
                                    <Link
                                      to="#"
                                      className="btn btn-common-black btn-view mt-5 btn-primary-color-02"
                                      onClick={() =>
                                        handleShareLiveStream(
                                          `/user-creator-class-detail/${data.id}`,
                                        )
                                      }
                                    >
                                      Share live class
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
                  <div style={{ color: '#fff', fontSize: '18px' }}>No stream data available</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CreatorGeneralComponent;
CreatorGeneralComponent.propTypes = {
  handleOpenSeatHolderModal: propTypes.func,
  handleModal: propTypes.func,
};
