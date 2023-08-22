import React from 'react';
import { Link } from 'react-router-dom';
// Css and Image
import images from '../../../../Assets/AppImages';

const PageNotFound = () => (
  <main role="main" className="flex-shrink-0 middle-section">
    <div className="middle-inner">
      <section className="page-not-found-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="page-not-found-div">
                <div className="page-not-found-image">
                  <img
                    src={images.PageNotFoundImage}
                    className="img-fluid"
                    alt=""
                    loading="lazy"
                  />
                </div>
                <div className="page-not-found-text">
                  <h3>It looks like you're lost...</h3>
                </div>
                <div className="page-not-found-btn">
                  <Link
                    to="/login"
                    class="btn btn-primary btn-pad-60 btn-uppercase">
                    Go to login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
);

export default PageNotFound;
