import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { isAuthenticated } from '../../services/auth';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
// import { toast } from 'react-toastify';
// import { get } from '../../network/requests';
// import { getUrl } from '../../network/url';
import noImgData from "../../assets/images/no-post-imge.png";
import userProfileImg from "../../assets/images/profile.png";
import { useHistory } from 'react-router-dom';

const SimilarCreatorComponent = ({ creatorsListData, handleButtonClick }) => {
  // const [isPurchase,setisPurchase]= useState(false);
  const history = useHistory();
  const handleFavIconClick = (creatorId, isCreatorFav) => {
    isPlanPurchesesOrNot();
    // if(isPurchase){
    handleButtonClick(creatorId, isCreatorFav);
    // }
  }
  const isPlanPurchesesOrNot = (e) => {
    e.preventDefault();
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
    //             setisPurchase(true);
    //         
    //          
    //           break;
    //         case 400:
    //           // localStorage.setItem('location', window.location.pathname);
    //           // history.push('/flexible-plans');
    //         
    //             setisPurchase(false);
    //           
    //          
    //           break;
    //         default:
    //           toast.error(message, {
    //             pauseOnHover: false,
    //             position: toast.POSITION.TOP_RIGHT,
    //           });
    //       }
    //     })
    //     // .catch((error) => {
    //     //   history.push('/user/login');
    //     //   tokenExpire(error.response, history);
    //     // });
    // }
    // if (!isAuthenticated()) {
    //   localStorage.setItem('location', window.location.pathname);
    //   history.push('/user/login');
    // }
  };
  const handleRedirection = (e, creator_id) => {
    e.preventDefault();
    history.push(`/user-creators-details/${creator_id}`)
  }
  return (
    <React.Fragment>
      {creatorsListData !== "" ? (
        <div className="upc-streams-slider-new-main-div">
          <div className="upc-streams-slider-new-root">
            <div className="creators-owl-slider-main-slider-new-us">
              {creatorsListData.length > 0 && (
                <OwlCarousel
                  className="owl-carousel owl-theme the-creators-owl-div"
                  id="the-creators-owl"
                  loop={creatorsListData.length >= 4 ? true : false}
                  items={3}
                  margin={10}
                  autoWidth
                  nav={false}
                  dots={false}
                  stagePadding={0}
                  autoplay={true}
                  autoplayTimeout={5000}
                  autoplayHoverPause={true}
                  smartSpeed={2000}
                  responsiveClass={true}
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
                >
                  {creatorsListData.slice(0, 10).map((similarCreatorData, i) => {
                    return (
                      <div className="item" key={i}>
                        <div className="creators-img-mask-slider-bx-new">
                          <Link to="#" className="creators-img-link">
                            <div className="creators-img-mask-thumb w-100">
                              <div className="img-thumb w-100">
                                <img src={similarCreatorData.profile_image === "https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg" || similarCreatorData.profile_image === null ? userProfileImg : similarCreatorData.profile_image} className="img-fluid img-responsive" alt="image" style={{ width: '372px' }} onClick={(e) => handleRedirection(e, similarCreatorData.id)} />
                              </div>
                              <div className="like-box-abs"> <button className={`like-button ${similarCreatorData.is_fav ? 'active' : ''}`} onClick={() => handleFavIconClick(similarCreatorData.id, similarCreatorData.is_fav)}><span className="like-icon "> </span></button> </div>
                            </div>
                          </Link>
                          <div className="creators-content-div" style={{ height: '75px' }}>
                            <h3>
                              <Link to={`/user-creators-details/${similarCreatorData.id}`} className="link">
                                {(similarCreatorData.full_name === null || similarCreatorData.full_name === "") ? similarCreatorData.username : similarCreatorData.full_name}
                              </Link>
                            </h3>
                            <h4>{similarCreatorData.key_skill}</h4>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </OwlCarousel>
              )}
            </div>
          </div>
        </div>
      ) : <img src={noImgData} className="img-fluid img-responsive" width={355} />}
    </React.Fragment>
  );
};

export default SimilarCreatorComponent;

SimilarCreatorComponent.propTypes = {
  creatorsListData: PropTypes.any,
  handleButtonClick: PropTypes.func
};
