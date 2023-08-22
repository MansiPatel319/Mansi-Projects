import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from 'react-toastify';
import { post, remove } from "../../network/requests";
import { getUrl } from "../../network/url";
import noImgData from "../../assets/images/materials/background-materials-cover.jpg";
import { Link, useHistory } from 'react-router-dom';
import { isAuthenticated, tokenExpire } from "../../services/auth";

const CreatorClassBannerComponent = ({ creatorData, getCreatorDetail }) => {

  const history = useHistory();
  const [isPurchase,setisPurchase]= useState(false);
  const SocialmediaLinkData = [
    {
      id: 1,
      iconClassName: "fab fa-instagram",
      link: creatorData.instagram_url,
    },
    {
      id: 2,
      iconClassName: "fab fa-facebook-f",
      link: creatorData.facebook_url,
    },
    {
      id: 3,
      iconClassName: "fab fa-youtube",
      link: creatorData.youtube_url,
    },
    {
      id: 4,
      iconClassName: "fas fa-globe",
      link: creatorData.creator_website_url,
    }
  ];
  const isPlanPurchesesOrNot = (e) => {
    e.preventDefault();
    // const url = getUrl('user-plan');
    if (isAuthenticated()) {
         setisPurchase(true);
     
    }
    if (!isAuthenticated()) {
      localStorage.setItem('location', window.location.pathname);
      history.push('/user/login');
    }
  };
  
  const handleClick = (e, classID, isCreatorFav) => {
    e.preventDefault();
    isPlanPurchesesOrNot(e);
    if(isPurchase){
    if (isCreatorFav) {
      const url = getUrl("getFavCreatorList");
      return remove(`${url}/${classID}/`, true)
        .then((response) => {
          const {
            data: { code, status, message },
          } = response;
          switch (code) {
            case 200:
              if (status === true) {
                getCreatorDetail();
                toast.success("Remove creator from Favourites!");
              }
              break;
            case 400:
              toast.error(message);
              break;
            default:
              toast.error(message);
          }
        })
        .catch((error) => {
          tokenExpire(error.response, history);
        });
    }
    else {
      const url = getUrl("getFavCreatorList");
      return post(`${url}/${classID}/`, '', true)
        .then((response) => {
          const {
            data: { code, status, message },
          } = response;
          switch (code) {
            case 201:
              if (status === true) {
                getCreatorDetail();
                toast.success("Added creator to Favourites!");
              }
              break;
            case 400:
              toast.error(message);
              break;
            default:
              toast.error(message);
          }
        })
        .catch((error) => {
          tokenExpire(error.response, history);
        });
    }
  }
  }
  useEffect(() => {
    // getClasses();
  }, []);

  return (
    <React.Fragment>
      <div className="ins-pro-banner-div">
        <div className="content-banner-root">
          <div className="container container-1200">
            {creatorData && (
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div className="content-banner-left">
                    <div className="text-content">
                      <h4>Introducing</h4>
                      <h1><span className="block">{`${creatorData.first_name}  ${creatorData.last_name}`}</span></h1>
                      <div className="ins-pro-pd-left-div">
                        <div className="desc-div">
                          <p>{creatorData.description}</p>
                        </div>

                        <div className="skill-div">
                          <div className="title-line-div">
                            <h4>Skills</h4>
                          </div>
                          <div className="filter-category-root-div">
                            <div className="filter-category-inner">
                              <ul className="filter-list-ul">
                                {creatorData.other_skills.map((data) => {
                                  return (
                                    <li key={data.id}><Link to="#" className="filter-link"> <span className="icon-img-span">
                                      {/* <img src={data.image} alt="img" className="img-fluid" /> */}
                                    </span> <span className="span-text"> {data} </span> </Link></li>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="instructor-profile-bx-root">
                    <div className="instructor-profile-bx-new">
                      <Link to="#" className="creators-img-link">
                        <div className="ip-creators-img-mask-thumb w-100">
                          <div className="img-thumb w-100">
                            <img src={creatorData.profile_image === "https://myapp-user-uploads154822-dev.s3.amazonaws.com/sample.jpg" || creatorData.profile_image === null || creatorData.profile_image === undefined ? noImgData : creatorData.profile_image} className="img-fluid img-responsive" alt="image" />
                          </div>
                          <div className="like-box-abs"> <button className={`like-button ${creatorData.is_fav ? 'active' : ''}`} onClick={(e) => isAuthenticated() ? handleClick(e, creatorData.id, creatorData.is_fav) : history.push('/user/login')}><span className="like-icon "> </span></button> </div>
                        </div>
                      </Link>
                      <div className="ip-creators-content-div">
                        <div className="ip-creators-content-row">
                          <div className="ip-creators-content-lt">
                            {creatorData.country.country_flag !== null && creatorData.country.country_name !== "" && <h3>
                              <span className="img-span"> <img src={creatorData.country.country_flag} className="img-fluid" alt="poland" /> </span>
                            {' '}
                              <span className="txt-span" > {creatorData.country.country_name} </span>
                            </h3>}
                          </div>
                          <div className="ip-creators-content-rt">
                            <div className="social-icon-div-root">
                              <ul className="social-ul">
                                {SocialmediaLinkData.map((data) => {
                                  return (
                                    <>
                                      {data.link === null || data.link === '' || data.link === undefined ? null :
                                        <li key={data.id}>
                                          <a
                                            href={data.link}
                                            // className="social-link"
                                            className={`social-link`}
                                            target="blank"
                                          >
                                            <i className={data.iconClassName}></i>
                                          </a>
                                        </li>
                                      }
                                    </>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreatorClassBannerComponent;

CreatorClassBannerComponent.propTypes = {
  creatorData: PropTypes.any,
  getCreatorDetail: PropTypes.any
}
