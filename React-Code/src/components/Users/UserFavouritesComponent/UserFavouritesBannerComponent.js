import React from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function UserFavouritesBannerComponent({ hedingText }) {
  const history = useHistory();
  return (
    <React.Fragment>
      <section className="back-with-title-section">
        <div className="back-with-title-div">
          <div className="container container-1000">
            <div className="back-with-title-root-div">
              <div className="back-div-row">
                <div className="back-div-box">
                  <Link to="#" className="back-link" onClick={() => { history.goBack(); }}>
                    {`< Back`}
                  </Link>
                </div>
                <div className="title-div-box">
                  <h1>{hedingText}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default UserFavouritesBannerComponent;

UserFavouritesBannerComponent.propTypes = {
  hedingText: PropTypes.string
}
