import React, { useEffect, useState } from 'react';
import { getUrl } from '../../../network/url';
import { get, remove } from '../../../network/requests';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';
import Loader from '../../UI/Loader/Loader';
import { tokenExpire } from '../../../services/auth';
import { useHistory } from 'react-router-dom';
import convertUTCDateToLocalDate from '../../../hooks/TimeZoneConversion';
toast.configure();
const ClassesTabComponet = () => {
  const history = useHistory();
  const [listOfAllClasses, setListOfAllClasses] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const getAllCreatorClasses = () => {
    setIsLoading(true);
    const url = getUrl('get_all_creator_my_classes');
    get(`${url}`, true)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        setIsLoading(false);
        switch (code) {
          case 200:
            if (status === true) {
              setListOfAllClasses(data);
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
    getAllCreatorClasses();
  }, []);
  const handleDeleteClass = (id) => {
    setIsLoading(true);
    const url = getUrl('creator_class');
    remove(`${url}/${id}/`, true)
      .then((response) => {
        const {
          data: { code, status, message },
        } = response;
        setIsLoading(false);
        switch (code) {
          case 200:
            if (status === true) {
              getAllCreatorClasses();
              toast.success(message, {
                pauseOnHover: false,
                position: toast.POSITION.TOP_RIGHT,
              });
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
  return (
    <div className="tab-pane-inner">
      {isLoading && <Loader />}
      <div className="general-list-common-div">
        <div className="general-list-panel-div">
          <div className="row">
            {listOfAllClasses.length > 0 ? (
              listOfAllClasses.map((data) => {
                return (
                  <div className="col-lg-6 col-md-6" key={data.id}>
                    <div className="general-common-cre-box" >
                      <div className="general-common-cre-row">
                        <div className="general-video-img-cre-thumb">
                          <div className="img-thumb">
                            <img
                              src={data.thumbnail_file}
                              className="img-fluid img-responsive"
                              alt="image"
                            />
                          </div>
                          <div className="time-box-abs"></div>
                        </div>
                        <div className="general-content-cre-div">
                          <div className="general-cre-content-row">
                            <div className="general-cre-content-top-row">
                              <p>
                                <Link to="#" className="link">
                                  {data.title}
                                </Link>
                              </p>
                              <div className="time-row time-row-no-style">
                                <div className="time-box">
                                  <div className="time-box-rounded">
                                    <span className="icon-span">
                                      <i className="bg-custom-icon calendar-time-icon-new"></i>
                                    </span>
                                    <span className="text">                                    
                                      {moment(convertUTCDateToLocalDate(new Date(data.created_at))).format('DD/MM/YYYY')}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="general-btn-div">
                                <div className="general-btn-row">
                                  <Link
                                    to={`/creator-add-a-class/edit/${data.id}`}
                                    className="btn btn-primary-outline btn-primary-color-02 mh-btn55 btn-edit flex-center-aj"
                                  >
                                    Edit
                                  </Link>
                                  <Link
                                    onClick={() => handleDeleteClass(data.id)}
                                    to="#"
                                    className="btn btn-primary-outline btn-primary-color-02 mh-btn55 btn-delete flex-center-aj"
                                  >
                                    Delete
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
              <div className="uploads-common-row-box">
                <div className="uploads-common-row" style={{ color: '#fff', fontSize: '18px' }}>
                  No classes data available
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClassesTabComponet;
