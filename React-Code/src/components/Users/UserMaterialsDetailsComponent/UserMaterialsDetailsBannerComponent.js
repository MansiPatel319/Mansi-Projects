import React from 'react';
import PropTypes from "prop-types";
function UserMaterialsDetailsBannerComponent({ materialBanner }) {
  return (
    <React.Fragment>
      <section className="materials-banner-section" id="materials-banner-section">
        <div className="materials-banner-div">
          <div className="container container-1000">
            {materialBanner && (
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <div
                    className="materials-banner-root"
                    style={{ backgroundImage: `url(${materialBanner.category_image})` }}
                  >
                    <div className="banner-heading-div">
                      <h1>{materialBanner.category_title}</h1>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default UserMaterialsDetailsBannerComponent;

UserMaterialsDetailsBannerComponent.propTypes = {
  materialBanner: PropTypes.object
}