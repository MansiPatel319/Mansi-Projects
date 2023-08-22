import React from 'react';
import '../../../assets/css/home-style.css';
import '../../../assets/css/style.css';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../../services/auth';
function MainPageBannerComponent() {
  return (
    <React.Fragment>
      <section className="main-banner-section" id="main-banner-section">
        <div className="banner-div">
          <div className="banner-image-div">
            <div className="banner-image-group">
              <div className="video-div">
                <Link to="/" className="video-button">
                  <i className="bg-custom-icon play-icon"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="content-banner-root">
            <div className="container container-1000">
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <div className="content-banner">
                    <div className="text-content">
                      <h1>
                        <span className="block">Exclusive</span>
                        <span className="block">Tutorials</span>
                      </h1>
                      <h2>
                        <span className="block">From your</span>
                        <span className="block">Favourite Creators</span>
                      </h2>
                      <div className="button-group-div">
                        {isAuthenticated() ? null : (
                          <Link
                            to="/user/signup"
                            className="btn btn-common btn-get-started min-width-280"
                          >
                            <span className="text">Buy Now</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default MainPageBannerComponent;
