import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUrl } from '../../../network/url';
import { get, remove } from '../../../network/requests';
import { toast } from 'react-toastify';
import Loader from '../../UI/Loader/Loader';
import { useHistory } from "react-router-dom";
import { tokenExpire } from "../../../services/auth";

toast.configure();
const MaterialsTabComponent = () => {
  const history = useHistory();
  const creatorData = useSelector((state) => state.authUser.creatoruser);
  const [listOfAllMaterial, setListOfAllMaterial] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const getAllCreatorMaterial = () => {
    setIsLoading(true);
    const url = getUrl('get_all_creator_material');
    get(`${url}/?creator=${creatorData.id}`)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        setIsLoading(false);
        switch (code) {
          case 200:
            if (status === true) {
              setListOfAllMaterial(data);
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
      .catch(() => {
        setIsLoading(false);
        toast.error('Something went wrong', {
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  useEffect(() => {
    getAllCreatorMaterial();
  }, []);
  const handleDeleteMaterial = (id) => {
    setIsLoading(true);
    const url = getUrl('creator_material');
    remove(`${url}/${id}/`, true)
      .then((response) => {
        const {
          data: { code, status, message },
        } = response;
        setIsLoading(false);
        switch (code) {
          case 200:
            if (status === true) {
              getAllCreatorMaterial();
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
          <div className="row mlr-8">
            {listOfAllMaterial.length > 0 ? (
              listOfAllMaterial.map((data) => {
                return (
                  <div className="col-lg-6 col-md-6" key={data.id}>
                    <div className="general-common-cre-box" key={data.id}>
                      <div className="general-common-cre-row">
                        <div className="general-video-img-cre-thumb w-100">
                          <div className="img-thumb w-100">
                            <img
                              src={data.thumbnail_file}
                              className="img-fluid img-responsive"
                              alt="image"
                            />
                          </div>
                        </div>
                        <div className="general-content-cre-div">
                          <div className="general-cre-content-row">
                            <div className="general-cre-content-top-row">
                              <p>
                                {data.title}
                              </p>

                              <div className="time-row time-row-no-style">
                                <div className="time-box">
                                  <div className="time-box-rounded">
                                    <h4>{data.material_category}</h4>
                                  </div>
                                </div>
                              </div>
                              <div className="general-btn-div">
                                <div className="general-btn-row">
                                  <Link
                                    to={`/creator-add-material/edit/${data.id}`}
                                    className="btn btn-primary-outline btn-primary-color-02 mh-btn55 btn-edit flex-center-aj"
                                  >
                                    Edit
                                </Link>
                                  <Link
                                    onClick={() => handleDeleteMaterial(data.id)}
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
                  No material data available
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialsTabComponent;
