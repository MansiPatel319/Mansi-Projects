import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getUrl } from '../../../network/url';
import { get } from '../../../network/requests';
import moment from 'moment';
import Loader from '../../UI/Loader/Loader';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { tokenExpire } from '../../../services/auth';

toast.configure();

import '../../../assets/css/creator/creator-home-style.css';
import '../../../assets/css/tab-style.css';
import '../../../assets/css/style.css';
import { Setjoiningtype } from '../../../../src/actions/JoiningTypeActio';
import '../../../assets/css/feather.min.css';

function BookedLiveStreamListComponent() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [listOfAllStream, setListOfAllStream] = useState('');

  const dispatch = useDispatch();

  const getAllCreatorStream = () => {
    setIsLoading(true);
    const url = getUrl('user_stream_listing');
    get(`${url}`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        setIsLoading(false);
        switch (code) {
          case 200:
            if (status === true) {
              setListOfAllStream(data.data);
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

  return (
    <React.Fragment>
      <div className="tab-pane-inner">
        {isLoading && <Loader />}
        <div className="general-list-common-div">
          <div className="general-list-panel-div">
            <div className="row mlr-8">
              {listOfAllStream.length > 0 ? (
                listOfAllStream.map((data) => {
                  // const date=data?.stream_datetime.replace('Z','');
                  return (
                    <div className="col-lg-6 col-md-6 plr-8" key={data.id}>
                      <div className="general-common-cre-box">
                        <div className="general-common-cre-row">
                          <div className="general-video-img-cre-thumb">
                            <div className="img-thumb">
                              <img
                                src={data.stream.thumbnail_file}
                                className="img-fluid img-responsive"
                                alt="image"
                              />
                            </div>
                            <div className="action-box-abs"></div>
                          </div>
                          <div className="general-content-cre-div">
                            <div className="general-cre-content-row">
                              <div className="general-cre-content-top-row time-my-div">
                                <div className="time-row">
                                  <div className="time-box-rounded">
                                    <span className="icon-span">
                                      <i className="bg-custom-icon calendar-time-icon-new"></i>
                                    </span>
                                    <span className="text">
                                      {moment(
                                        data.stream.stream_datetime.substr(
                                          0,
                                          data.stream.stream_datetime.length - 1,
                                        ),
                                      ).format('MMM DD hh:mm A')}
                                      {` ${
                                        data.stream.tz_value !== null ? data.stream.tz_value : ''
                                      }`}
                                    </span>
                                  </div>
                                </div>
                                <div className="desc-div">
                                  <p>{data.stream.title}</p>
                                </div>

                                <span>
                                  {!data.stream.completed && (
                                    <Link
                                      to={`/user-livestream-chat/${data.stream.id}`}
                                      className="btn btn-common-primary btn-edit"
                                      onClick={() =>
                                        dispatch(Setjoiningtype({ type: 'BookLiveStream' }))
                                      }
                                      style={{
                                        fontSize: '18px',
                                        marginTop: '20px',
                                        width: '230px',
                                      }}
                                    >
                                      Join live classes
                                    </Link>
                                  )}
                                </span>
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
                    You have no upcoming live classes booked.
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

export default BookedLiveStreamListComponent;
