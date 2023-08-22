import React, { useState, useEffect, useCallback } from 'react';
import { Link ,useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import { get } from "../../../network/requests";
import { getUrl } from "../../../network/url";
import { toast } from 'react-toastify';
import Loader from "../../UI/Loader/Loader";
import noImgData from "../../../assets/images/no-post-imge.png";
// import { isAuthenticated, tokenExpire } from '../../../services/auth';
toast.configure();
function UserMaterialsComponent() {
  const history = useHistory();
  const [materialData, setmaterialData] = useState('');
  const [isLoading, setIsLoadning] = useState(false);

  const getDifferentCategoriesOfMaterial = useCallback(() => {
    setIsLoadning(true);
    const url = getUrl("userMaterials");
    return get(`${url}`)
      .then((response) => {
        const {
          data: { code, data, status, message },
        } = response;
        setIsLoadning(false);
        switch (code) {
          case 200:
            if (status === true) {
              setmaterialData(data);
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
        setIsLoadning(false);
        toast.error('Something went wrong', {
          pauseOnHover: false,
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  }, []);

  useEffect(() => {
    getDifferentCategoriesOfMaterial();
  }, []);

  const isPlanPurchesesOrNot = (e, id) => {
    e.preventDefault();
    localStorage.removeItem('location');
    history.push(`/user-materials-details/${id}`);
    // const url = getUrl('user-plan');
    // if (isAuthenticated()) {
    //   get(url, true)
    //     .then((response) => {
    //       const {
    //         data: { code, message },
    //       } = response;
    //       switch (code) {
    //         case 200:
    //           localStorage.removeItem('location');
    //           history.push(`/user-materials-details/${id}`);
    //           // handleDownload(fileUrl);
    //           break;
    //         case 400:
    //           // localStorage.setItem('location', window.location.pathname);
    //           // history.push('/flexible-plans');
    //           isHandleOpenModal();
    //           break;
    //         default:
    //           toast.error(message, {
    //             pauseOnHover: false,
    //             position: toast.POSITION.TOP_RIGHT,
    //           });
    //       }
    //     })
    //     .catch((error) => {
    //       history.push('/user/login');
    //       tokenExpire(error.response, history);
    //     });
    // }
    // if (!isAuthenticated()) {
    //   localStorage.setItem('location', window.location.pathname);
    //   history.push('/user/login');
    // }
  };

  return (
    <React.Fragment>
      {isLoading && <Loader />}
      <div className="materials-list-div">
        <div className="container container-1200">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="heading-div">
                <div className="heading-inner-div">
                  <h2>Materials</h2>
                </div>
              </div>
              <div className="materials-list-common-div">
                <div className="materials-list-root-div">
                  <div className="row">
                    {materialData.length > 0 &&
                      materialData.map((data) => {
                        return (
                          <div className="col-lg-4 col-md-4" key={data.id}>
                            <div className="materials-slider-box">
                              <Link
                                onClick={(e) => isPlanPurchesesOrNot(e, data.id)}
                                to="#"
                                // to={`/user-materials-details/${data.id}`}
                                className="creators-img-link">
                                <div className="creators-img-mask-thumb">
                                  <div className="img-thumb"> <img src={data.category_image === undefined || data.category_image === null || data.category_image === "https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg" ? noImgData : data.category_image} className="img-fluid img-responsive" alt="image" /> </div>
                                </div>
                              </Link>
                              <div className="creators-content-div">
                                <h3><Link  className="link">
                                  {data.category_title}
                                </Link></h3>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default UserMaterialsComponent;
UserMaterialsComponent.propTypes = {

  isHandleOpenModal: PropTypes.func,
};
