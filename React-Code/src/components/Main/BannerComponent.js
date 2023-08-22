import React from 'react';
import BannerImage from '../../assets/images/banner-new-update2x.png';
import { Link } from 'react-router-dom';
import { isAuthenticated } from "../../services/auth";
const BannerComponent = () => {
  return (
    <div className="banner-div">
      <div className="content-banner-root">
        <div className="container container-1200">
          <div className="row">
            <div className="col-lg-6 col-md-6 mt-3">
              <div className="content-banner">
                <div className="text-content">
                  <h1>
                    <span className="block">Level Up Your Learning</span>
                  </h1>
                  <p>
                    With over one hundred and fifty tutorials and live classes from the best creators in the game.
                  </p>
                  <div className="button-group-div">
                    {/* <!-- <a href="signup.html" className="btn btn-common btn-get-started min-width-280"> <span className="text">Get Started Now</span> </a> --> */}
                    <Link to={isAuthenticated() ? "/user-home" : "/user/signup"} className="btn btn-primary-all">
                      <span className="text">Get Started Now</span>
                      <span className="span-rounded">
                        <span className="material-icons"> keyboard_arrow_right </span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 mt-3">
              <div className="banner-right-image-div">
                <img src={BannerImage} className="img-fluid" alt="image" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-arrow-root">
        <div className="container container-1200">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="center-bottom-arrow-div">
                <a href="#our-classes-section" className="rounded-arrow-icon-btn">
                  <span className="material-icons"> keyboard_arrow_down </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerComponent;
