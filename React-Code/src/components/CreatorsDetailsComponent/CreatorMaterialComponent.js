import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import noImgData from '../../assets/images/no-post-imge.png';
// import { getUrl } from "../../network/url";
// import { isAuthenticated, tokenExpire } from "../../services/auth";
// import { toast } from 'react-toastify';
// import { get } from "../../network/requests";
const CreatorMaterialComponent = ({ getMaterialDetails, creatorName }) => {
  const history = useHistory();
  const options = {
    loop: false,
    nav: false,
    dots: false,
    stagePadding: 0,
    margin: 30,
    autoplay: true,
    smartSpeed: 2000,
    responsive: {
      0: {
        items: 1.2,
        autoplay: true,
        dots: true,
        margin: 15,
      },
      600: {
        items: 2,
      },
      1200: {
        items: 3,
      },
      1600: {
        items: 3,
      },
    },
  }

  const isPlanPurchesesOrNot = (e) => {
    e.preventDefault();
    history.push(`/user-material`);
    // const url = getUrl('user-plan');
    // if (isAuthenticated()) {
    //   get(url, true)
    //     .then((response) => {
    //       const {
    //         data: { code, message },
    //       } = response;
    //       switch (code) {
    //         case 200:
    //        
    //           history.push(`/user-material`);
    //         
    //           break;
    //         case 400:
    //        
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
      <div className="container container-1200">
        {getMaterialDetails.length > 0 && (
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="materials-slider-div-new bordertop1">
                <div className="common-heading-div">
                  <div className="common-heading-inner-div">
                    <div className="common-heading-title-row">
                      <div className="common-heading-title-left">
                        <h2>{`Materials by ${creatorName.first_name} ${creatorName.last_name}`}</h2>
                      </div>
                      <div className="common-heading-title-right">
                        <Link onClick={(e) => isPlanPurchesesOrNot(e, getMaterialDetails.id)}  className="btn btn-primary-outline btn-primary-outline-n45">
                          <span className="text">View all</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="materials-slider-new-main-div">
                  <div className="materials-creators-slider-div materials-creators-slider-div-new">
                    <div className="materials-creators-slider">
                      <OwlCarousel
                        className="owl-carousel owl-theme materials-creators-owl-div"
                        id="materials-creators-owl"
                        // items={3}
                        // loop={getMaterialDetails.length >= 2 ? true : false}
                        loop={false}
                        // margin={-150}
                        // nav={false}
                        // dots={false}
                        // stagePadding={0}
                        // autoplay={true}
                        // smartSpeed={2000}
                        // responsiveClass={true}
                        responsive={{
                          0: {
                            items: 1.3,
                            autoplay: true,
                            dots: true,
                          },
                          600: {
                            items: 2.3,
                          },
                          1200: {
                            items: 3.1,
                          },
                          1600: {
                            items: 4,
                          },
                        }}
                        {...options}
                      >
                        {getMaterialDetails.map((creatorMaterialData, index) => {
                          return (
                            <div className="item" key={index}>
                              <div className="materials-creators-slider-box">
                                <Link to="/user-material" className="creators-img-link">
                                  <div className="creators-img-mask-thumb w-100">
                                    <div className="img-thumb w-100">
                                      <img src={creatorMaterialData.thumbnail_file === undefined || creatorMaterialData.thumbnail_file === "https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg" || creatorMaterialData.thumbnail_file === null ? noImgData : creatorMaterialData.thumbnail_file} className="img-fluid img-responsive" alt="image" />
                                    </div>
                                  </div>
                                </Link>
                                <div className="creators-content-div">
                                  <h3>
                                    <Link onClick={(e) => isPlanPurchesesOrNot(e, getMaterialDetails.id)} className="link">
                                      {creatorMaterialData.title}
                                    </Link>
                                  </h3>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </OwlCarousel>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default CreatorMaterialComponent;

CreatorMaterialComponent.propTypes = {
  getMaterialDetails: PropTypes.any,
  creatorName: PropTypes.any,
  isHandleOpenModal: PropTypes.func 
};
