import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import noImgData from "../../assets/images/no-post-imge.png";
import profileImg from '../../assets/images/profile.png';
import { isAuthenticated } from '../../services/auth';
// import { get } from "../../network/requests";
// import { getUrl } from "../../network/url";
// import { toast } from 'react-toastify';
// import { tokenExpire } from "../../services/auth";

function OneToOneSessionInstructorListingComponent({ creatorsListData,handleClickFav }) {
    const [limit, setLimit] = useState(9);
    const handleLoadMore = () => {
        setLimit(limit + 3);
    }
    const isPlanPurchesesOrNot = (e) => {
        e.preventDefault();
        handleLoadMore();
//         const url = getUrl('user-plan');
//         if (isAuthenticated()) {
//           get(url, true)
//             .then((response) => {
//               const {
//                 data: { code, message },
//               } = response;
//               switch (code) {
//                 case 200:
// 
//                   handleLoadMore();
//                   break;
//                 case 400:
// 
//                   isHandleOpenModal();
//                   break;
//                 default:
//                   toast.error(message, {
//                     pauseOnHover: false,
//                     position: toast.POSITION.TOP_RIGHT,
//                   });
//               }
//             })
//             .catch((error) => {
//               history.push('/user/login');
//               tokenExpire(error.response, history);
//             });
//         }
//         if (!isAuthenticated()) {
//           localStorage.setItem('location', window.location.pathname);
//           history.push('/user/login');
//         }
      };
    return (
        <div className="container container-1200">
            {creatorsListData.length !== 0 && creatorsListData !== undefined ? (
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="our-card-classes-div mb-custom-bottom bordertop1">
                            <div className="heading-div">
                                <div className="heading-title-row">
                                    <div className="heading-title-center">
                                        <h2>One-to-One Sessions</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="common-card-class-feed-div common-card-creators-root">
                                <div className="row">
                                    {creatorsListData.length > 0 && creatorsListData.slice(0, limit).map((similarCreatorData, i) => {
                                        return (
                                            <div className="col-lg-4 col-md-6" key={i}>
                                                <div className="creators-img-mask-slider-bx-new">
                                                    <div className="creators-img-mask-thumb">
                                                        <div className="img-thumb">
                                                            <img src={similarCreatorData.profile_image === "https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg" || similarCreatorData.profile_image === null ? profileImg : similarCreatorData.profile_image} className="img-fluid img-responsive" alt="image" style={{ width: '372px' }} />
                                                        </div>
                                                        <div className="view-btn-div">
                                                            <div className="center-btn-div">
                                                                <Link to={`/user-one-to-one-book/${similarCreatorData.id}`} className="btn btn-view-outline">
                                                                    <span className="text">Book Now</span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div className="like-box-abs"> <button className={`like-button ${similarCreatorData.is_fav ? 'active' : ''}`} onClick={(e)=>isAuthenticated()? handleClickFav(e, similarCreatorData.id, similarCreatorData.is_fav):history.push('/user/login')}><span className="like-icon "> </span></button> </div>
                                                    </div>
                                                    <div className="creators-content-div">
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
                                </div>
                            </div>

                            <div className="common-bottom-div">
                                <div className={`common-bottom-inner-div ${creatorsListData.length > limit ? '' : 'd-none'}`}>
                                    <div className="btn-group-div d-flex justify-content-center">
                                        <Link to="#" className="btn btn-primary-outline btn-primary-outline-big" onClick={(e) => isPlanPurchesesOrNot(e, creatorsListData.id)}>
                                            <span className="text">Load More</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : <img src={noImgData} className="img-fluid img-responsive" width={355} />}
        </div>
    )
}

export default OneToOneSessionInstructorListingComponent;


OneToOneSessionInstructorListingComponent.propTypes = {
    creatorsListData: PropTypes.any,
    handleClickFav: PropTypes.any,
    isHandleOpenModal: PropTypes.func
};
